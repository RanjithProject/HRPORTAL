// // // 'use client';
// // // import { useAppContext } from '@/app/Context';
// // // import axios from 'axios';
// // // import React, { useState, useEffect } from 'react';

// // // const Attendance = () => {
// // //   const { userName } = useAppContext();
 
  
// // //   const [currentDate, setCurrentDate] = useState(new Date());
// // //   const [loginOut, setLoginOut] = useState('Sign Out');
// // //   const [loginHistory, setLoginHistory] = useState([]);

// // //   // Toggle between Sign In and Sign Out
// // //   const toggleLoginState = async () => {
// // //     const newState = loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out';
// // //     // const val=newState!="Sign In"?"Sign In":"Sign Out";
// // //     setLoginOut(newState);

// // //     // Send the action to the backend (Sign In or Sign Out)
// // //     try {
// // //       const response = await axios.post('http://localhost:4000/api/login', {
// // //         action: newState,
// // //         username: userName, // Ensure you pass the correct user information
// // //         timestamp: new Date().toISOString(),
// // //       });
// // //       console.log('Action successfully logged:', response.data);
// // //     } catch (error) {
// // //       console.error('Error logging action:', error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     // Update the date and time every 100ms
// // //     const intervalId = setInterval(() => {
// // //       setCurrentDate(new Date());
// // //     }, 100);

// // //     // Fetch login history (cart actions) on component mount
// // //     const fetchLoginHistory = async () => {
// // //       try {
// // //         const response = await axios.get('http://localhost:4000/api/login-history', {
// // //           params: { username: userName }, 
// // //         });
// // //         setLoginHistory(response.data.history); 
// // //       } catch (error) {
// // //         console.error('Error fetching login history:', error);
// // //       }
// // //     };

// // //     fetchLoginHistory();

// // //     // Cleanup interval on component unmount
// // //     return () => clearInterval(intervalId);
// // //   }, [userName]);

// // //   // Extract individual date and time values
// // //   const year = currentDate.getFullYear();
// // //   const month = currentDate.getMonth() + 1; // months are zero-indexed
// // //   const day = currentDate.getDate();
// // //   const hours = currentDate.getHours();
// // //   const minutes = currentDate.getMinutes();
// // //   const seconds = currentDate.getSeconds();
// // //   const milliseconds = currentDate.getMilliseconds();

// // //   // Function to format time (adds leading zero if single digit)
// // //   const formatTime = (time) => (time < 10 ? `0${time}` : time);

// // //   // Format milliseconds to always show 3 digits
// // //   const formatMilliseconds = (ms) => ms.toString().padStart(3, '0');

// // //   return (
// // //     <div className="p-4">
// // //       <h1 className="text-xl font-bold mb-4">Current Date and Time</h1>

// // //       {/* Display Current Year, Month, Day */}
// // //       <div className="mb-2">
// // //         <p><strong>Year:</strong> {year}</p>
// // //         <p><strong>Month:</strong> {month}</p>
// // //         <p><strong>Day:</strong> {day}</p>
// // //       </div>

// // //       {/* Display Current Time: Hours, Minutes, Seconds, and Milliseconds */}
// // //       <div className="mb-4">
// // //         <p>
// // //           <strong>Time:</strong>
// // //           {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}.{formatMilliseconds(milliseconds)}
// // //         </p>
// // //       </div>

// // //       {/* Display Average Working Hours */}
// // //       <div className="mb-4">
// // //         <h2>Average working hours is: 8:00</h2>
// // //       </div>

// // //       {/* Sign In/Sign Out Button */}
// // //       <div>
// // //         <button
// // //           onClick={toggleLoginState}
// // //           className={`text-white px-4 py-2 rounded-lg 
// // //             ${loginOut === 'Sign In' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
// // //         >
// // //           {loginOut=='Sign In'?"Sign Out":"Sign In"}
// // //         </button>
// // //       </div>

// // //       {/* Display Login History (Cart Actions) */}
// // //       <div className="mt-4">
// // //         <h3>Login History:</h3>
// // //         <ul>
// // //           {loginHistory.map((entry, index) => (
// // //             <li key={index}>
// // //               {entry.action} - {new Date(entry.timestamp).toLocaleString()}
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Attendance;



// // 'use client';
// // import { useAppContext } from '@/app/Context';
// // import axios from 'axios';
// // import React, { useState, useEffect } from 'react';

// // const Attendance = () => {
// //   const { userName } = useAppContext();
// //   const [currentDate, setCurrentDate] = useState(new Date());
// //   const [loginOut, setLoginOut] = useState('Sign Out');
// //   const [loginHistory, setLoginHistory] = useState([]);

// //   // Toggle between Sign In and Sign Out
// //   const toggleLoginState = async () => {
// //     const newState = loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out';
// //     setLoginOut(newState);

// //     // Send the action to the backend (Sign In or Sign Out)
// //     try {
// //       const response = await axios.post('http://localhost:4000/api/login', {
// //         action: newState,
// //         username: userName, // Ensure you pass the correct user information
// //         timestamp: new Date().toISOString(),
// //       });
// //       console.log('Action successfully logged:', response.data);
// //       fetchLoginHistory(); // Re-fetch login history after successful action
// //     } catch (error) {
// //       console.error('Error logging action:', error);
// //     }
// //   };

// //   // Fetch login history
// //   const fetchLoginHistory = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:4000/api/login-history', {
// //         params: { username: userName }, 
// //       });
// //       setLoginHistory(response.data.history); 
// //     } catch (error) {
// //       console.error('Error fetching login history:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     // Update the date and time every 1000ms (1 second)
// //     const intervalId = setInterval(() => {
// //       setCurrentDate(new Date());
// //     }, 1000);

// //     // Fetch login history on component mount
// //     fetchLoginHistory();

// //     // Cleanup interval on component unmount
// //     return () => clearInterval(intervalId);
// //   }, [userName]);

// //   // Extract individual date and time values
// //   const year = currentDate.getFullYear();
// //   const month = currentDate.getMonth() + 1; // months are zero-indexed
// //   const day = currentDate.getDate();
// //   const hours = currentDate.getHours();
// //   const minutes = currentDate.getMinutes();
// //   const seconds = currentDate.getSeconds();
// //   const milliseconds = currentDate.getMilliseconds();

// //   // Function to format time (adds leading zero if single digit)
// //   const formatTime = (time) => (time < 10 ? `0${time}` : time);

// //   // Format milliseconds to always show 3 digits
// //   const formatMilliseconds = (ms) => ms.toString().padStart(3, '0');

// //   return (
// //     <div className="p-4">
// //       <h1 className="text-xl font-bold mb-4">Current Date and Time</h1>

// //       {/* Display Current Year, Month, Day */}
// //       <div className="mb-2">
// //         <p><strong>Year:</strong> {year}</p>
// //         <p><strong>Month:</strong> {month}</p>
// //         <p><strong>Day:</strong> {day}</p>
// //       </div>

// //       {/* Display Current Time: Hours, Minutes, Seconds, and Milliseconds */}
// //       <div className="mb-4">
// //         <p>
// //           <strong>Time:</strong>
// //           {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}.{formatMilliseconds(milliseconds)}
// //         </p>
// //       </div>

// //       {/* Display Average Working Hours */}
// //       <div className="mb-4">
// //         <h2>Average working hours is: 8:00</h2>
// //       </div>

// //       {/* Sign In/Sign Out Button */}
// //       <div>
// //         <button
// //           onClick={toggleLoginState}
// //           className={`text-white px-4 py-2 rounded-lg 
// //             ${loginOut === 'Sign In' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
// //         >
// //           {loginOut === 'Sign In' ? 'Sign Out' : 'Sign In'}
// //         </button>
// //       </div>

// //       {/* Display Login History */}
// //       <div className="mt-4">
// //         <h3>Login History:</h3>
// //         <ul>
// //           {loginHistory.map((entry, index) => (
// //             <li key={index}>
// //               {entry.action} - {new Date(entry.timestamp).toLocaleString()}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Attendance;




// 'use client';
// import { useAppContext } from '@/app/Context';
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// const Attendance = () => {
//   const { userName } = useAppContext();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [loginOut, setLoginOut] = useState('Sign Out');
//   const [loginHistory, setLoginHistory] = useState([]);

//   // Toggle between Sign In and Sign Out
//   const toggleLoginState = async () => {
//     const newState = loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out';
//     setLoginOut(newState);

//     // Log the request body to ensure it's correct
//     console.log('Request Body:', {
//       action: newState,
//       username: userName, // Ensure you pass the correct user information
//       timestamp: new Date().toISOString(),
//     });

//     // Send the action to the backend (Sign In or Sign Out) using PATCH
//     try {
//       const response = await axios.patch('http://localhost:4000/api/login', {
//         action: newState,
//         username: userName, // Ensure you pass the correct user information
//         timestamp: new Date().toISOString(),
//       });
//       console.log('Action successfully logged:', response.data);
//       fetchLoginHistory(); // Re-fetch login history after successful action
//     } catch (error) {
//       console.error('Error logging action:', error.response?.data || error.message);
//     }
//   };

//   // Fetch login history
//   const fetchLoginHistory = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/login-history', {
//         params: { username: userName }, 
//       });
//       setLoginHistory(response.data.history); 
//     } catch (error) {
//       console.error('Error fetching login history:', error.response?.data || error.message);
//     }
//   };

//   useEffect(() => {
//     // Update the date and time every 1000ms (1 second)
//     const intervalId = setInterval(() => {
//       setCurrentDate(new Date());
//     }, 1000);

//     // Fetch login history on component mount
//     fetchLoginHistory();

//     // Cleanup interval on component unmount
//     return () => clearInterval(intervalId);
//   }, [userName]);

//   // Extract individual date and time values
//   const year = currentDate.getFullYear();
//   const month = currentDate.getMonth() + 1; // months are zero-indexed
//   const day = currentDate.getDate();
//   const hours = currentDate.getHours();
//   const minutes = currentDate.getMinutes();
//   const seconds = currentDate.getSeconds();
//   const milliseconds = currentDate.getMilliseconds();

//   // Function to format time (adds leading zero if single digit)
//   const formatTime = (time) => (time < 10 ? `0${time}` : time);

//   // Format milliseconds to always show 3 digits
//   const formatMilliseconds = (ms) => ms.toString().padStart(3, '0');

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Current Date and Time</h1>

//       {/* Display Current Year, Month, Day */}
//       <div className="mb-2">
//         <p><strong>Year:</strong> {year}</p>
//         <p><strong>Month:</strong> {month}</p>
//         <p><strong>Day:</strong> {day}</p>
//       </div>

//       {/* Display Current Time: Hours, Minutes, Seconds, and Milliseconds */}
//       <div className="mb-4">
//         <p>
//           <strong>Time:</strong>
//           {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}.{formatMilliseconds(milliseconds)}
//         </p>
//       </div>

//       {/* Display Average Working Hours */}
//       <div className="mb-4">
//         <h2>Average working hours is: 8:00</h2>
//       </div>

//       {/* Sign In/Sign Out Button */}
//       <div>
//         <button
//           onClick={toggleLoginState}
//           className={`text-white px-4 py-2 rounded-lg 
//             ${loginOut === 'Sign In' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
//         >
//           {loginOut === 'Sign In' ? 'Sign Out' : 'Sign In'}
//         </button>
//       </div>

//       {/* Display Login History */}
//       <div className="mt-4">
//         <h3>Login History:</h3>
//         <ul>
//           {loginHistory.map((entry, index) => (
//             <li key={index}>
//               {entry.action} - {new Date(entry.timestamp).toLocaleString()}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Attendance;




'use client';
import { useAppContext } from '@/app/Context';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Attendance = () => {
  const { userName } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loginOut, setLoginOut] = useState('Sign Out');
  const [loginHistory, setLoginHistory] = useState([]);

  // Fetch the current status from the backend when the component mounts
  const fetchLoginStatus = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/login-status', {
        params: { username: userName },
      });
      if (response.data.success) {
        setLoginOut(response.data.status); // Set the initial status (Sign In or Sign Out)
      }
    } catch (error) {
      console.error('Error fetching login status:', error.response?.data || error.message);
    }
  };

  // Optimistically update the status locally and then sync with the backend
  const toggleLoginState = async () => {
    const newState = loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out';

    // Optimistically update the UI
    setLoginOut(newState);

    // Log the request body to ensure it's correct
    console.log('Request Body:', {
      action: newState,
      username: userName, // Ensure you pass the correct user information
      timestamp: new Date().toISOString(),
    });

    try {
      // Send the action to the backend (Sign In or Sign Out) using PATCH
      const response = await axios.patch('http://localhost:4000/api/login', {
        action: newState,
        username: userName,
        timestamp: new Date().toISOString(),
      });
      console.log('Action successfully logged:', response.data);

      // Fetch login history after successful action
      fetchLoginHistory();
      // Refresh the login status after successful update
      fetchLoginStatus();
    } catch (error) {
      console.error('Error logging action:', error.response?.data || error.message);

      // If the request fails, roll back the UI state change
      setLoginOut(loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out');
    }
  };

  // Fetch login history
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
          {loginOut === 'Sign In' ? 'Sign Out' : 'Sign In'}
        </button>
      </div>

      {/* Display Login History */}
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
