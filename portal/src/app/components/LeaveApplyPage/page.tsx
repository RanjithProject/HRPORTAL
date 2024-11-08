'use client'
import React, { useState } from 'react';
import { useAppContext } from '@/app/Context';
import axios from 'axios';

const LeaveApplyPage = () => {
  const { userName, employeeId } = useAppContext(); 

  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [daysDifference, setDaysDifference] = useState(null);

  const calculateDateDifference = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const timeDiff = Math.abs(endDate - startDate); 
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      setDaysDifference(diffDays + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!leaveType || !fromDate || !toDate || !reason) {
      alert('Please fill in all fields.');
      return;
    }
    console.log(userName, 
      employeeId, 
      leaveType, 
      fromDate, 
      toDate, 
      reason);
    

    try {
      const response = await axios.post('http://localhost:4000/api/leave/request', {
        name: userName, 
        employeeId, 
        leaveType, 
        fromDate, 
        toDate, 
        reason
      });

      if (response.status === 200) {
        alert('Leave request submitted successfully!');
        setLeaveType('');
        setFromDate('');
        setToDate('');
        setReason('');
        setDaysDifference(null);
      } else {
        alert('There was an issue submitting your request. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting your leave request. Please try again.');
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fromDate') {
      setFromDate(value);
      calculateDateDifference(value, toDate);
    } else if (name === 'toDate') {
      setToDate(value);
      calculateDateDifference(fromDate, value);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Apply for Leave</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="leaveType" className="block font-medium text-gray-700">Leave Type</label>
          <select
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Select Leave Type</option>
            <option value="Personal Reason">Personal Reason</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Other Leave">Other Leave</option>
          </select>
        </div>

        <div>
          <label htmlFor="fromDate" className="block font-medium text-gray-700">From Date</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            value={fromDate}
            onChange={handleDateChange}
            required
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="toDate" className="block font-medium text-gray-700">To Date</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            value={toDate}
            onChange={handleDateChange}
            required
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="reason" className="block font-medium text-gray-700">Reason</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter a reason"
            rows={3}
            required
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          ></textarea>
        </div>

        {daysDifference !== null && (
          <div className="mt-4 text-sm text-gray-600">
            <strong>Leave Duration:</strong> {daysDifference} day{daysDifference > 1 ? 's' : ''}.
          </div>
        )}

        <div>
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeaveApplyPage;
