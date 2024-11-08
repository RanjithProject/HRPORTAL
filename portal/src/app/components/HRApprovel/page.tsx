// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// // Component to handle and display each employee's leave request with dropdown for approval/rejection
// const LeaveRequestCard = ({ leave, employeeId, onStatusChange }) => (
//   <div key={leave._id} className="leave-card">
//     <p>Leave Type: {leave.leaveType}</p>
//     <p>From: {new Date(leave.fromDate).toLocaleString()}</p>
//     <p>To: {new Date(leave.toDate).toLocaleString()}</p>
//     <p>Reason: {leave.reason}</p>
//     <p>Status: {leave.leaveStatus}</p>

//     {/* Dropdown for admin/manager to change the leave status */}
//     {leave.leaveStatus === 'pending' && (
//       <div>
//         <select
//           onChange={(e) => onStatusChange(leave._id, e.target.value, employeeId)}
//           value={leave.leaveStatus}
//         >
//           <option value="pending" disabled>
//             Select Status
//           </option>
//           <option value="approved">Approve</option>
//           <option value="rejected">Reject</option>
//         </select>
//       </div>
//     )}
//   </div>
// );

// export default function HRApprovel() {
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch the leave requests for today
//   const fetchLeaveRequests = useCallback(async () => {
//     try {
//       const response = await axios.get('/api/todayLeaveApplications');
//       if (response.data.success) {
//         setLeaveRequests(response.data.data);
//       } else {
//         setError('No leave requests found for today');
//       }
//     } catch (err) {
//       setError('Error fetching leave requests');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Handle status change for leave request
//   const handleStatusChange = useCallback(async (leaveRequestId, status, employeeId) => {
//     try {
//       const response = await axios.put(`/api/leave/approve/${leaveRequestId}`, {
//         status,
//         adminComments: `${status.charAt(0).toUpperCase() + status.slice(1)} by admin`, // Optional comments
//         approvedBy: 'admin123', // Replace with actual admin ID
//       });

//       if (response.data.success) {
//         // Update the local state to reflect the new leave status
//         setLeaveRequests((prevRequests) =>
//           prevRequests.map((employee) =>
//             employee.employeeId === employeeId
//               ? {
//                   ...employee,
//                   leave: employee.leave.map((leave) =>
//                     leave._id === leaveRequestId ? { ...leave, leaveStatus: status } : leave
//                   ),
//                 }
//               : employee
//           )
//         );
//       }
//     } catch (err) {
//       setError('Error processing the leave request');
//     }
//   }, []);

//   useEffect(() => {
//     fetchLeaveRequests();
//   }, [fetchLeaveRequests]);

//   if (loading) {
//     return <div>Loading leave requests...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h1>Today's Leave Requests</h1>
//       <div>
//         {leaveRequests.length === 0 ? (
//           <p>No leave applications for today.</p>
//         ) : (
//           leaveRequests.map((employee) => (
//             <div key={employee.employeeId} className="leave-request-card">
//               <h3>{employee.username} ({employee.email})</h3>
//               {employee.leave.map((leave) => (
//                 <LeaveRequestCard
//                   key={leave._id}
//                   leave={leave}
//                   employeeId={employee.employeeId}
//                   onStatusChange={handleStatusChange}
//                 />
//               ))}
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const TodayLeaveApplications = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch today's leave applications
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/todayLeaveApplications');
        
        if (response.data.success) {
          setLeaveData(response.data.data);  // Store the data in state
        } else {
          setLeaveData([]);  // If no leave applications for today
        }
      } catch (err) {
        setError('Error fetching leave applications');
      } finally {
        setLoading(false);  // Set loading to false once the API call is done
      }
    };

    fetchLeaveData();
  }, []);  // Empty dependency array, so it only runs once when the component mounts

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;  // Display loading message while data is being fetched
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;  // If there was an error fetching the data
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Today's Leave Applications</h1>
      {leaveData.length === 0 ? (
        <p className="text-center text-gray-500">No leave applications for today.</p>
      ) : (
        leaveData.map((employee) => (
          <div key={employee.employeeId} className="leave-card bg-white shadow-md rounded-lg p-4 mb-6">
            <h2 className="text-2xl font-semibold mb-2">{employee.username} (ID: {employee.employeeId})</h2>
            <p className="text-gray-700 mb-4">Email: {employee.email}</p>
            <h3 className="text-xl font-semibold mb-2">Leave Applications:</h3>
            <ul className="space-y-4">
              {employee.todaysLeaves.map((leave) => (
                <li key={leave._id} className={`p-4 rounded-lg`}>
                  <div>
                    <strong className="font-semibold">Leave Type:</strong> {leave.leaveType}
                  </div>
                  <div>
                    <strong className="font-semibold">From:</strong> {new Date(leave.fromDate).toLocaleDateString()}
                  </div>
                  <div>
                    <strong className="font-semibold">To:</strong> {new Date(leave.toDate).toLocaleDateString()}
                  </div>
                  <div>
                    <strong className="font-semibold">Reason:</strong> {leave.reason}
                  </div>
                  <div className={`mt-2 p-2 rounded-md text-white ${leave.leaveStatus === 'pending' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                    <strong>Status:</strong> {leave.leaveStatus}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default TodayLeaveApplications;
