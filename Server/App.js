const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Model/Employee');
const config = require('./DBConfig/Config');
const app = express();

const port = 4000;

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
console.log("username : ",username," action : ",action," timestamp : ",timestamp );

  try {
    // Validate action
    if (!['Sign In', 'Sign Out'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action. Use "Sign In" or "Sign Out".' });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Get the last action and check if it's already the same as the new action
    const lastAction = user.worktimestamp[user.worktimestamp.length - 1];
    if (lastAction && lastAction.action === action) {
      return res.status(400).json({ error: 'Action is already the same' });
    }

    // Add action to user's login history (worktimestamp)
    user.worktimestamp.push({ action, timestamp: new Date(timestamp) });
    await user.save();

    res.status(200).json({ message: 'Action logged successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// app.patch('/api/break',async (req,res)=>{
//   const { username, breaktimestamp } = req.body;
//   console.log("username : ",username," breaktimestamp : ",breaktimestamp);
  
//   try{
// if(!["Sign In","Sign Out"].includes(status)){
//   return res.json({success:false,message:"Invalid Actions"});
// }

// const user=await User.findOne({username});

// if(!user){
//   return res.status(400).json({error:'User not found'});
// }
// //get the last action and check if it's already the same as the new action

//   }catch(error){
//     res.status(500).json({success:false,message:"Server error :",error});
//   }
// })


// Get login history for a user
app.get('/api/login-history', async (req, res) => {
  const { username } = req.query;

  try {
    // Find the user by username
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

// GET route to fetch the current login status of a user
app.get('/api/current-login-status', async (req, res) => {
  const { username } = req.query;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Get the last action from the worktimestamp (login history)
    const lastAction = user.worktimestamp[user.worktimestamp.length - 1];
    const status = lastAction ? lastAction.action : 'Sign Out'; // Default to 'Sign Out' if no history

    res.status(200).json({ status });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
