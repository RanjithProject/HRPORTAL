'use client'
import { useAppContext } from '@/app/Context'
import React, { useState } from 'react'

const LeaveApplyPage = () => {
    const {userName}=useAppContext();
  // State to manage form input values
  const [leaveType, setLeaveType] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState('')
  const [daysDifference, setDaysDifference] = useState(null)

  // Function to calculate the difference between dates
  const calculateDateDifference = (start, end) => {
    if (start && end) {
      const startDate = new Date(start)
      const endDate = new Date(end)
      const timeDiff = Math.abs(endDate - startDate) 
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) 
      setDaysDifference(diffDays+1);
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if all fields are filled
    if (!leaveType || !fromDate || !endDate || !reason) {
      alert('Please fill in all fields.')
      return
    }

    // Log form values to console
    console.log({
      leaveType,
      fromDate,
      endDate,
      reason,
      daysDifference,
      userName
    })
  }

  // Watch for changes in date fields to update the date difference
  const handleDateChange = (e) => {
    const { name, value } = e.target
    if (name === 'fromDate') {
      setFromDate(value)
      calculateDateDifference(value, endDate)
    } else if (name === 'endDate') {
      setEndDate(value)
      calculateDateDifference(fromDate, value)
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Apply for Leave</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Leave Type */}
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

        {/* From Date */}
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

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block font-medium text-gray-700">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={endDate}
            onChange={handleDateChange}
            required
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Reason */}
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

        {/* Display Date Difference */}
        {daysDifference !== null && (
          <div className="mt-4 text-sm text-gray-600">
            <strong>Leave Duration:</strong> {daysDifference} day{daysDifference > 1 ? 's' : ''}.
          </div>
        )}

        {/* Submit Button */}
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
  )
}

export default LeaveApplyPage
