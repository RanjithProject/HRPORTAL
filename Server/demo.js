analys this code 
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

// Login route (Sign In / Sign Out)
app.post('/api/login', async (req, res) => {
  const { action, username, timestamp } = req.body;
console.log("action : ",action," username : ", username," timestamp : ", timestamp );

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Add action to user's cart (login/logout history)
    user.cart.push({ action, timestamp: new Date(timestamp) });
    await user.save();

    res.status(200).json({ message: 'Action logged successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get login history for a user
app.get('/api/login-history', async (req, res) => {
  const { username } = req.query;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Return the user's cart (login/logout history)
    res.status(200).json({ history: user.cart });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

and this code also 
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  
  // Add cart array to store login and sign-out history
  cart: [
    {
      action: {
        type: String,
        enum: ['Sign In', 'Sign Out'],
        required: true,
        default:"Sign Out"
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Create and export the User model, checking if it already exists
let User;
if (mongoose.modelNames().includes("User")) {
  User = mongoose.model("User");
} else {
  User = mongoose.model("User", userSchema);
}

module.exports = User;

and this attentance page also rewrite it 

'use client';
import { useAppContext } from '@/app/Context';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Attendance = () => {
  const { userName } = useAppContext();
 
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loginOut, setLoginOut] = useState('Sign Out');
  const [loginHistory, setLoginHistory] = useState([]);

  // Toggle between Sign In and Sign Out
  const toggleLoginState = async () => {
    const newState = loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out';
    // const val=newState!="Sign In"?"Sign In":"Sign Out";
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
            ${loginOut === 'Sign In' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
        >
          {loginOut=='Sign In'?"Sign Out":"Sign In"}
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

the action is connect to frontend to backend rewrite action is dynamically working frontend update to backend
refresh to not change it 