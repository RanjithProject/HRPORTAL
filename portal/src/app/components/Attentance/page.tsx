// // 'use client';
// // import { useAppContext } from '@/app/Context';
// // import axios from 'axios';
// // import React, { useState, useEffect } from 'react';

// // const Attendance = () => {
// //   const { userName } = useAppContext();
// //   const [currentDate, setCurrentDate] = useState(new Date());
// //   const [loginOut, setLoginOut] = useState('Sign Out');
// //   const [loginHistory, setLoginHistory] = useState([]);

// //   // Fetch the current status from the backend when the component mounts
// //   const fetchLoginStatus = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:4000/api/login-status', {
// //         params: { username: userName },
// //       });
// //       if (response.data.success) {
// //         setLoginOut(response.data.status); 
// //       }
// //     } catch (error) {
// //       console.error('Error fetching login status:', error.response?.data || error.message);
// //     }
// //   };

// //   // Optimistically update the status locally and then sync with the backend
// //   const toggleLoginState = async () => {
// //     const newState = loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out';

// //     // Optimistically update the UI
// //     setLoginOut(newState);

// //     // Log the request body to ensure it's correct
// //     console.log('Request Body:', {
// //       action: newState,
// //       username: userName, // Ensure you pass the correct user information
// //       timestamp: new Date().toISOString(),
// //     });

// //     try {
// //       // Send the action to the backend (Sign In or Sign Out) using PATCH
// //       const response = await axios.patch('http://localhost:4000/api/login', {
// //         action: newState,
// //         username: userName,
// //         timestamp: new Date().toISOString(),
// //       });
// //       console.log('Action successfully logged:', response.data);

// //       // Fetch login history after successful action
// //       fetchLoginHistory();
// //       // Refresh the login status after successful update
// //       fetchLoginStatus();
// //     } catch (error) {
// //       console.error('Error logging action:', error.response?.data || error.message);

// //       // If the request fails, roll back the UI state change
// //       setLoginOut(loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out');
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
// //       console.error('Error fetching login history:', error.response?.data || error.message);
// //     }
// //   };

// //   useEffect(() => {
// //     // Update the date and time every 1000ms (1 second)
// //     const intervalId = setInterval(() => {
// //       setCurrentDate(new Date());
// //     }, 1000);

// //     // Fetch initial login status and login history on component mount
// //     fetchLoginStatus();
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

// //   // console.log(loginHistory);

// //   const calculateTimeDifference=(history)=>{
// //     for(let i=0;i<history.length;i+=2){
// //       //get pair of 2 values sigIn and SignOut

// //       const sigIn=history[i];
// //       const signOut=history[i+1];
// //       if(sigIn&&signOut&&sigIn.action==="Sign In"&&signOut.action==="Sign Out"){
// //         const time1=new Date(sigIn);
// //         const time2=new Date(signOut);

// //         // get the diffrence of signIn and signOut
// //         const twoTimesDiffirence=time1-time2;
        
// //         //convert milliseconds to house and minutes and seconds and milliseconds
// //         const hours=Math.floor(twoTimesDiffirence/(1000*60*60));
// //         const mintues=Math.floor(twoTimesDiffirence%(1000*60*60)/(1000*60));
// //         const seconds = Math.floor((twoTimesDiffirence % (1000 * 60)) / 1000);
// //         const milliseconds=Math.floor(twoTimesDiffirence%1000);

// //         console.log("hours : ",hours);
// //         console.log("mintues : ",mintues);
// //         console.log("seconds : ",seconds);
        
// //         console.log("milliseconds : ",milliseconds);
        
        
// //       }
// //     }
// //   }

// //   console.log(calculateTimeDifference(loginHistory));
  

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

//   // Fetch the current login status from the backend
//   const fetchLoginStatus = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/login-status', {
//         params: { username: userName },
//       });
//       if (response.data.success) {
//         setLoginOut(response.data.status);
//       }
//     } catch (error) {
//       console.error('Error fetching login status:', error.response?.data || error.message);
//     }
//   };

//   // Toggle login state (Sign In / Sign Out)
//   const toggleLoginState = async () => {
//     const newState = loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out';

//     // Optimistically update the UI
//     setLoginOut(newState);

//     try {
//       const response = await axios.patch('http://localhost:4000/api/login', {
//         action: newState,
//         username: userName,
//         timestamp: new Date().toISOString(),
//       });

//       console.log('Action successfully logged:', response.data);

//       // Fetch updated login status and history after logging action
//       fetchLoginStatus();
//       fetchLoginHistory();
//     } catch (error) {
//       console.error('Error logging action:', error.response?.data || error.message);
//       // Roll back the UI state change on failure
//       setLoginOut(loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out');
//     }
//   };

//   // Fetch login history from the backend
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

//     // Fetch initial login status and login history on component mount
//     fetchLoginStatus();
//     fetchLoginHistory();

//     // Cleanup interval on component unmount
//     return () => clearInterval(intervalId);
//   }, [userName]);

//   // Calculate time difference between each "Sign In" and "Sign Out" pair
//   const calculateTimeDifferences = (history) => {
//     const differences = [];
//     for (let i = 0; i < history.length; i += 2) {
//       const signIn = history[i];
//       const signOut = history[i + 1];
//       if (signIn && signOut && signIn.action === "Sign In" && signOut.action === "Sign Out") {
//         const time1 = new Date(signIn.timestamp);
//         const time2 = new Date(signOut.timestamp);

//         // Calculate the difference in milliseconds
//         const differenceInMilliseconds = time2 - time1;

//         // Convert milliseconds to hours, minutes, seconds, and milliseconds
//         const hours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
//         const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);
//         const milliseconds = differenceInMilliseconds % 1000;

//         differences.push({ hours, minutes, seconds, milliseconds });
//       }
//     }
//     return differences;
//   };

//   const timeDifferences = calculateTimeDifferences(loginHistory);

//   // Format time with leading zeros for display
//   const formatTime = (time) => (time < 10 ? `0${time}` : time);
//   const formatMilliseconds = (ms) => ms.toString().padStart(3, '0');

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Current Date and Time</h1>

//       {/* Display Current Date */}
//       <div className="mb-2">
//         <p><strong>Year:</strong> {currentDate.getFullYear()}</p>
//         <p><strong>Month:</strong> {currentDate.getMonth() + 1}</p>
//         <p><strong>Day:</strong> {currentDate.getDate()}</p>
//       </div>

//       {/* Display Current Time */}
//       <div className="mb-4">
//         <p>
//           <strong>Time:</strong> {formatTime(currentDate.getHours())}:
//           {formatTime(currentDate.getMinutes())}:{formatTime(currentDate.getSeconds())}.
//           {formatMilliseconds(currentDate.getMilliseconds())}
//         </p>
//       </div>

//       {/* Display Average Working Hours */}
//       <div className="mb-4">
//         <h2>Average working hours: 8:00</h2>
//       </div>

//       {/* Toggle Sign In/Sign Out Button */}
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
//             <li key={entry._id}>
//               {entry.action} - {new Date(entry.timestamp).toLocaleString()}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Display Time Differences for Each Session */}
//       <div className="mt-4">
//         <h3>Time Differences:</h3>
//         <ul>
//           {timeDifferences.map((diff, index) => (
//             <li key={index}>
//               {diff.hours} hours, {diff.minutes} minutes, {diff.seconds} seconds, {diff.milliseconds} milliseconds
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
      if (signIn && signOut && signIn.action === 'Sign In' && signOut.action === 'Sign Out') {
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
      {/* Current Date and Time Table */}
      <h1 className="text-xl font-bold mb-4">Current Date and Time</h1>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Year</th>
              <th className="px-4 py-2 border-b text-left">Month</th>
              <th className="px-4 py-2 border-b text-left">Day</th>
              <th className="px-4 py-2 border-b text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border-b">{currentDate.getFullYear()}</td>
              <td className="px-4 py-2 border-b">{currentDate.getMonth() + 1}</td>
              <td className="px-4 py-2 border-b">{currentDate.getDate()}</td>
              <td className="px-4 py-2 border-b">
                {formatTime(currentDate.getHours())}:{formatTime(currentDate.getMinutes())}:
                {formatTime(currentDate.getSeconds())}.{formatMilliseconds(currentDate.getMilliseconds())}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Sign In / Sign Out Button */}
      <div className="mb-6">
        <button
          onClick={toggleLoginState}
          className={`text-white px-4 py-2 rounded-lg 
            ${loginOut === 'Sign In' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
        >
          {loginOut === 'Sign In' ? 'Sign Out' : 'Sign In'}
        </button>
      </div>

      {/* Login History and Time Differences Table */}
      <h2 className="text-xl font-bold mb-4">Login History and Time Differences</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left">Action</th>
              <th className="px-4 py-2 border-b text-left">Timestamp</th>
              <th className="px-4 py-2 border-b text-left">Duration</th>
            </tr>
          </thead>
          <tbody>
            {loginHistory.map((entry, index) => {
              const entryTime = new Date(entry.timestamp);
              const timeDiff = timeDifferences[index];
              const duration = timeDiff
                ? `${timeDiff.hours}h ${timeDiff.minutes}m ${timeDiff.seconds}s`
                : '';

              return (
                <tr key={entry._id}>
                  <td className="px-4 py-2 border-b">{entry.action}</td>
                  <td className="px-4 py-2 border-b">{entryTime.toLocaleString()}</td>
                  <td className="px-4 py-2 border-b">{duration}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
