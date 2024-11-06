

'use client';
import { useAppContext } from '@/app/Context';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Attendance = () => {
  const { userName } = useAppContext(); // Assuming userName comes from context or similar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loginOut, setLoginOut] = useState('Sign In');
  const [loginHistory, setLoginHistory] = useState([]);

  // Toggle between Sign In and Sign Out
  const toggleLoginState = async () => {
    const newState = loginOut === 'Sign In' ? 'Sign Out' : 'Sign In';
    setLoginOut(newState);

    // Send the action to the backend (Sign In or Sign Out)
    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        action: newState,
        username: userName, // Ensure you pass the correct user information
        timestamp: new Date().toISOString(),
      });
      console.log('Action successfully logged:', response.data);
    } catch (error) {
      console.error('Error logging action:', error);
    }
  };

  useEffect(() => {
    // Update the date and time every 100ms
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 100);

    // Fetch login history (cart actions) on component mount
    const fetchLoginHistory = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/login-history', {
          params: { username: userName }, 
        });
        setLoginHistory(response.data.history); 
      } catch (error) {
        console.error('Error fetching login history:', error);
      }
    };

    fetchLoginHistory();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [userName]);

  // Extract individual date and time values
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // months are zero-indexed
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const milliseconds = currentDate.getMilliseconds();

  // Function to format time (adds leading zero if single digit)
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  // Format milliseconds to always show 3 digits
  const formatMilliseconds = (ms) => ms.toString().padStart(3, '0');

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Current Date and Time</h1>

      {/* Display Current Year, Month, Day */}
      <div className="mb-2">
        <p><strong>Year:</strong> {year}</p>
        <p><strong>Month:</strong> {month}</p>
        <p><strong>Day:</strong> {day}</p>
      </div>

      {/* Display Current Time: Hours, Minutes, Seconds, and Milliseconds */}
      <div className="mb-4">
        <p>
          <strong>Time:</strong>
          {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}.{formatMilliseconds(milliseconds)}
        </p>
      </div>

      {/* Display Average Working Hours */}
      <div className="mb-4">
        <h2>Average working hours is: 8:00</h2>
      </div>

      {/* Sign In/Sign Out Button */}
      <div>
        <button
          onClick={toggleLoginState}
          className={`text-white px-4 py-2 rounded-lg 
            ${loginOut === 'Sign In' ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'}`}
        >
          {loginOut}
        </button>
      </div>

      {/* Display Login History (Cart Actions) */}
      <div className="mt-4">
        <h3>Login History:</h3>
        <ul>
          {loginHistory.map((entry, index) => (
            <li key={index}>
              {entry.action} - {new Date(entry.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Attendance;
