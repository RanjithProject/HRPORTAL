const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Model/Employee');
const config = require('./DBConfig/Config');
const app = express();
const port = 4000;
const moment=require('moment');
app.use(cors());
app.use(express.json());

// Database connection
config();

// Home route
app.get('/', async (req, res) => {
  try {
    res.json({ success: true, message: 'API is working' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.get('/api/todayLeaveApplications', async (req, res) => {
  try {
    // Get today's date
    const getCurrentDate = () => moment().format('YYYY-MM-DD'); 
    const currentDate = getCurrentDate();  // 2024-11-08, for example

    // Query to find all employees who have leave applied today (matching appliedAt date)
    const employeesWithTodaysLeave = await User.find({
      'leave.appliedAt': {
        $gte: new Date(`${currentDate}T00:00:00.000Z`),  // Start of today
        $lt: new Date(`${currentDate}T23:59:59.999Z`)   // End of today
      }
    });

    // If no employees have applied leave today, return a message
    if (employeesWithTodaysLeave.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No leave applications for today.',
        data: []
      });
    }

    // Filter employees who have leave applied today and return their details
    const todaysLeaveApplications = employeesWithTodaysLeave.map(employee => {
      // Filter the employee's leave records to only include those applied today
      const todaysLeaves = employee.leave.filter(leave => {
        const appliedAtDate = moment(leave.appliedAt).format('YYYY-MM-DD');
        return appliedAtDate === currentDate;
      });

      // Return employee details along with their leave records for today
      return {
        employeeId: employee.employeeId,
        username: employee.username,
        email: employee.email,
        todaysLeaves
      };
    });

    // Send the filtered leave applications as a response
    res.status(200).json({
      success: true,
      message: 'Successfully fetched today\'s leave applications.',
      data: todaysLeaveApplications
    });
  } catch (error) {
    console.error('Error fetching today\'s leave applications:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error.message
    });
  }
});





app.get('/api/getAllEmployees',async(req,res)=>{
  try{
    const allEmployee=await User.find({});
    if(!allEmployee){
      res.json({message:"not found"});
    }
    res.json({success:true,message:"get all values",data:allEmployee});
  }catch(error){
    res.json({success:false,message:"server error",error});
  }
})

// Middleware to check if the user exists
const checkUserExists = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    req.user = user; // Attach the user object to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Update the leave status (approved/rejected)
app.patch('/api/updateLeaveStatus/:employeeId/:leaveId', async (req, res) => {
  const { employeeId, leaveId } = req.params;
  const { leaveStatus } = req.body; // The new leave status (approved, rejected)

  // Validate leaveStatus
  if (!['approved', 'rejected'].includes(leaveStatus)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid leave status. It must be "approved" or "rejected".'
    });
  }

  try {
    // Find the employee by employeeId
    const employee = await User.findOne({ employeeId });
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found.'
      });
    }

    // Find the leave application in the employee's leave array
    const leaveIndex = employee.leave.findIndex(leave => leave._id.toString() === leaveId);

    if (leaveIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Leave application not found.'
      });
    }

    // Update the leave status
    employee.leave[leaveIndex].leaveStatus = leaveStatus;
    await employee.save();

    res.status(200).json({
      success: true,
      message: `Leave status updated to ${leaveStatus}`,
      data: employee.leave[leaveIndex]
    });
  } catch (error) {
    console.error('Error updating leave status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error, unable to update leave status.',
      error: error.message
    });
  }
});



// Get the current login status of a user
app.get('/api/login-status', async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const lastLogin = user.worktimestamp[user.worktimestamp.length - 1];
    const status = lastLogin ? lastLogin.action : 'Sign Out';

    res.status(200).json({ success: true, status });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching login status' });
  }
});

// PATCH route to update login action (Sign In / Sign Out)
app.patch('/api/login', async (req, res) => {
  const { username, action, timestamp } = req.body;

  try {
    // Validate action
    if (!['Sign In', 'Sign Out'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action. Use "Sign In" or "Sign Out".' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Get the last action and check if it's already the same as the new action
    const lastAction = user.worktimestamp[user.worktimestamp.length - 1];
    if (lastAction && lastAction.action === action) {
      return res.status(400).json({ error: 'Action is already the same' });
    }

    // Add the new action to the user's worktimestamp
    user.worktimestamp.push({ action, timestamp: new Date(timestamp), breaktimestamp: [] });
    await user.save();

    res.status(200).json({ message: 'Action logged successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add action to user's break (Break In / Break Out)

app.patch('/api/break', async (req, res) => {
  const { username, status, timestamp } = req.body;

  // Validate the break status (either 'Break In' or 'Break Out')
  if (!['Break In', 'Break Out'].includes(status)) {
    return res.status(400).json({ error: 'Invalid break status. Must be "Break In" or "Break Out".' });
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Get the last login action
    const lastAction = user.worktimestamp[user.worktimestamp.length - 1];

    // Ensure the user is signed in before taking a break (the last action must be "Sign In")
    if (!lastAction || lastAction.action !== 'Sign In') {
      return res.status(400).json({ error: 'User must be signed in to take a break.' });
    }

    // Handle Break In (if user is not already on break)
    if (status === 'Break In') {
      // Check if the user is already on a break
      const lastBreakAction = lastAction.breaktimestamp[lastAction.breaktimestamp.length - 1];
      if (lastBreakAction && lastBreakAction.status === 'Break In') {
        return res.status(400).json({ error: 'User is already on a break.' });
      }

      // Add a new "Break In" action with the current timestamp
      lastAction.breaktimestamp.push({
        status: 'Break In',
        timestamp: new Date(timestamp), // Use the provided timestamp
      });
    }

    // Handle Break Out (if user is currently on a break)
    if (status === 'Break Out') {
      // Ensure the user is on a break before they can "Break Out"
      const lastBreakAction = lastAction.breaktimestamp[lastAction.breaktimestamp.length - 1];
      if (!lastBreakAction || lastBreakAction.status !== 'Break In') {
        return res.status(400).json({ error: 'User must be on a break to "Break Out".' });
      }

      // Add a new "Break Out" action with the current timestamp
      lastAction.breaktimestamp.push({
        status: 'Break Out',
        timestamp: new Date(timestamp), // Use the provided timestamp
      });
    }

    // Save the updated user document
    await user.save();
    res.status(200).json({ message: `${status} action recorded successfully.` });

  } catch (error) {
    res.status(500).json({ error: 'Server error occurred while logging break action.', message: error.message });
  }
});



// Get the login history of a user
app.get('/api/login-history', async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Return the user's worktimestamp (login/logout history)
    res.status(200).json({ history: user.worktimestamp });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/api/leave/request', async (req, res) => {
  try {
    // Extract leave request data from the request body
    const {name, employeeId, leaveType, fromDate, toDate, reason } = req.body;

    // Validate input fields
    if (!name||!employeeId || !leaveType || !fromDate || !toDate || !reason) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new leave request object
    const leaveRequest = {
      employeeId,
      name,
      leaveType,
      fromDate,
      toDate,
      reason,
      leaveStatus: 'pending', 
    };

    // Find the employee by their employeeId
    const user = await User.findOne({ employeeId });
    if (!user) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Add leave request to the employee's leave array
    user.leave.push(leaveRequest);
    await user.save();  // Save the updated user document with the new leave request

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Leave request submitted successfully',
      leaveRequest: leaveRequest,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.put('/leave/approve/:leaveRequestId', async (req, res) => {
  try {
    // const { leaveRequestId } = req.params;
    const { status, adminComments, approvedBy ,leaveRequestId} = req.body;  // Expected status: 'approved' or 'rejected'

    // Validate input fields
    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. It should be either approved or rejected' });
    }

    // Find the leave request by its ID
    const leaveApproval = await LeaveApproval.findById(leaveRequestId);
    if (!leaveApproval) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    // Check if leave is already approved or rejected
    if (leaveApproval.status !== 'pending') {
      return res.status(400).json({ error: 'Leave request has already been processed' });
    }

    // Update the leave status
    leaveApproval.status = status;  // 'approved' or 'rejected'
    leaveApproval.adminComments = adminComments || '';  // Optional comments
    leaveApproval.approvedBy = approvedBy;  // HR/Manager ID
    leaveApproval.approvalDate = new Date();  // Set the approval date

    // Save the updated leave approval document
    await leaveApproval.save();

    // Also update the employee's leave status
    const user = await User.findById(leaveApproval.user);
    const leaveIndex = user.leave.findIndex((leave) => leave._id.toString() === leaveRequestId);
    if (leaveIndex !== -1) {
      user.leave[leaveIndex].leaveStatus = status; // Update the employee's leave status
      await user.save();  // Save the updated user document
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: `Leave request ${status}`,
      leaveRequest: leaveApproval,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
