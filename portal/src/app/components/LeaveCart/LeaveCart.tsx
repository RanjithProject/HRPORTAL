'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Component to handle and display each employee's leave request with dropdown for approval/rejection
const LeaveRequestCard = ({ leave, employeeId, onStatusChange }) => (
  <div key={leave._id} className="leave-card">
    <p>Leave Type: {leave.leaveType}</p>
    <p>From: {new Date(leave.fromDate).toLocaleString()}</p>
    <p>To: {new Date(leave.toDate).toLocaleString()}</p>
    <p>Reason: {leave.reason}</p>
    <p>Status: {leave.leaveStatus}</p>

    {/* Dropdown for admin/manager to change the leave status */}
    {leave.leaveStatus === 'pending' && (
      <div>
        <select
          onChange={(e) => onStatusChange(leave._id, e.target.value, employeeId)}
          value={leave.leaveStatus}
        >
          <option value="pending" disabled>
            Select Status
          </option>
          <option value="approved">Approve</option>
          <option value="rejected">Reject</option>
        </select>
      </div>
    )}
  </div>
);

export default function LeaveRequestsPage() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the leave requests for today
  const fetchLeaveRequests = useCallback(async () => {
    try {
      const response = await axios.get('/api/todayLeaveApplications');
      if (response.data.success) {
        setLeaveRequests(response.data.data);
      } else {
        setError('No leave requests found for today');
      }
    } catch (err) {
      setError('Error fetching leave requests');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle status change for leave request
  const handleStatusChange = useCallback(async (leaveRequestId, status, employeeId) => {
    try {
      const response = await axios.put(`/api/leave/approve/${leaveRequestId}`, {
        status,
        adminComments: `${status.charAt(0).toUpperCase() + status.slice(1)} by admin`, // Optional comments
        approvedBy: 'admin123', // Replace with actual admin ID
      });

      if (response.data.success) {
        // Update the local state to reflect the new leave status
        setLeaveRequests((prevRequests) =>
          prevRequests.map((employee) =>
            employee.employeeId === employeeId
              ? {
                  ...employee,
                  leave: employee.leave.map((leave) =>
                    leave._id === leaveRequestId ? { ...leave, leaveStatus: status } : leave
                  ),
                }
              : employee
          )
        );
      }
    } catch (err) {
      setError('Error processing the leave request');
    }
  }, []);

  useEffect(() => {
    fetchLeaveRequests();
  }, [fetchLeaveRequests]);

  if (loading) {
    return <div>Loading leave requests...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Today's Leave Requests</h1>
      <div>
        {leaveRequests.length === 0 ? (
          <p>No leave applications for today.</p>
        ) : (
          leaveRequests.map((employee) => (
            <div key={employee.employeeId} className="leave-request-card">
              <h3>{employee.username} ({employee.email})</h3>
              {employee.leave.map((leave) => (
                <LeaveRequestCard
                  key={leave._id}
                  leave={leave}
                  employeeId={employee.employeeId}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
