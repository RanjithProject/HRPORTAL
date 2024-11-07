'use client';
import { useAppContext } from '@/app/Context';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Attendance = () => {
  const { userName } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loginOut, setLoginOut] = useState('Sign Out');
  // const [BreakinOut,setBreakinOut]=useState("Break Out");
  const [loginHistory, setLoginHistory] = useState([]);

  // Fetch the current login status from the backend
  const fetchLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/login-status', {
        params: { username: userName },
      });
      if (response.data.success) {
        setLoginOut(response.data.status);
      }
    } catch (error) {
      console.error('Error fetching login status:', error.response?.data || error.message);
    }
  };

  // Toggle login state (Sign In / Sign Out)
  const toggleLoginState = async () => {
    const newState = loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out';

    // Optimistically update the UI
    setLoginOut(newState);

    try {
      const response = await axios.patch('http://localhost:4000/api/login', {
        action: newState,
        username: userName,
        timestamp: new Date().toISOString(),
      });

      console.log('Action successfully logged:', response.data);

      // Fetch updated login status and history after logging action
      fetchLoginStatus();
      fetchLoginHistory();
    } catch (error) {
      console.error('Error logging action:', error.response?.data || error.message);
      // Roll back the UI state change on failure
      setLoginOut(loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out');
    }
  };


// const toggleBreakInOut=async()=>{
//   const newState=BreakinOut=='Break Out'?'Break In':'Break Out';

//   //auto update
//   setBreakinOut(newState);

//   try{
//     const response=await axios.patch('http://localhost:4000/api/break',{
//       act
//     })
//   }catch(error){
//     console.log(error);
    
//   }

// }

  // Fetch login history from the backend
  
  const fetchLoginHistory = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/login-history', {
        params: { username: userName },
      });
      setLoginHistory(response.data.history);
    } catch (error) {
      console.error('Error fetching login history:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    // Update the date and time every 1000ms (1 second)
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    // Fetch initial login status and login history on component mount
    fetchLoginStatus();
    fetchLoginHistory();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [userName]);

  // Calculate time difference between each "Sign In" and "Sign Out" pair
  const calculateTimeDifferences = (history) => {
    const differences = [];
    for (let i = 0; i < history.length; i += 2) {
      const signIn = history[i];
      const signOut = history[i + 1];
      if (signIn && signOut && signIn.action === "Sign In" && signOut.action === "Sign Out") {
        const time1 = new Date(signIn.timestamp);
        const time2 = new Date(signOut.timestamp);

        // Calculate the difference in milliseconds
        const differenceInMilliseconds = time2 - time1;



        // Convert milliseconds to hours, minutes, seconds, and milliseconds
        const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);
        const milliseconds = differenceInMilliseconds % 1000;

        differences.push({ hours, minutes, seconds, milliseconds });
      }
    }
    return differences;
  };

  const timeDifferences = calculateTimeDifferences(loginHistory);



  // Format time with leading zeros for display
  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  const formatMilliseconds = (ms) => ms.toString().padStart(3, '0');

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Current Date and Time</h1>

      {/* Display Current Date */}
      <div className="mb-2">
        <p><strong>Year:</strong> {currentDate.getFullYear()}</p>
        <p><strong>Month:</strong> {currentDate.getMonth() + 1}</p>
        <p><strong>Day:</strong> {currentDate.getDate()}</p>
      </div>

      {/* Display Current Time */}
      <div className="mb-4">
        <p>
          <strong>Time:</strong> {formatTime(currentDate.getHours())}:
          {formatTime(currentDate.getMinutes())}:{formatTime(currentDate.getSeconds())}.
          {formatMilliseconds(currentDate.getMilliseconds())}
        </p>
      </div>

      {/* Display Average Working Hours */}
      <div className="mb-4">
        <h2>Average working hours: 8:00</h2>
      </div>

      {/* Toggle Sign In/Sign Out Button */}
      <div>
        <button
          onClick={toggleLoginState}
          className={`text-white px-4 py-2 rounded-lg 
            ${loginOut === 'Sign In' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
        >
          {loginOut === 'Sign In' ? 'Sign Out' : 'Sign In'}
        </button>
      </div>


            {/* Toggle Break In/Break Out Button
            <div>
        <button
          onClick={toggleBreakInOut}
          className={`text-white px-4 py-2 rounded-lg 
            ${loginOut === 'Break In' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
        >
          {loginOut === 'Break In' ? 'Break Out' : 'Break In'}
        </button>
      </div> */}

      {/* Display Login History */}
      <div className="mt-4">
        <h3>Login History:</h3>
        <ul>
          {loginHistory.map((entry, index) => (
            <li key={entry._id}>
              {entry.action} - {new Date(entry.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>



      {/* Display Time Differences for Each Session */}
      <div className="mt-4">
        <h3>Time Differences:</h3>
        <ul>
          {timeDifferences.map((diff, index) => (
            <li key={index}>
              {diff.hours} hours, {diff.minutes} minutes, {diff.seconds} seconds, {diff.milliseconds} milliseconds
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Attendance;


