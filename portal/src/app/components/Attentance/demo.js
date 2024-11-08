// // 'use client'; 
// // import { useAppContext } from '@/app/Context';
// // import axios from 'axios';
// // import Link from 'next/link';
// // import React, { useState, useEffect } from 'react';

// // const Attendance = () => {
// //   const { userName } = useAppContext();
// //   const [currentDate, setCurrentDate] = useState(new Date());
// //   const [loginOut, setLoginOut] = useState('Sign Out');
// //   const [breakStatus, setBreakStatus] = useState('Break Out');
// //   const [loginHistory, setLoginHistory] = useState([]);
// //   const [totalBreakTime, setTotalBreakTime] = useState(0); // Tracks total break time in milliseconds

// //   // Fetch login and break history from the backend
// //   const fetchLoginHistory = async () => {
// //     try {
// //       const response = await axios.get('http://localhost:4000/api/login-history', {
// //         params: { username: userName },
// //       });

// //       const history = response.data.history.flatMap(entry => {
// //         const historyItem = [{ action: entry.action, timestamp: entry.timestamp }];
        
// //         if (entry.breaktimestamp && entry.breaktimestamp.length > 0) {
// //           entry.breaktimestamp.forEach(breakEntry => {
// //             historyItem.push({
// //               action: breakEntry.status,
// //               timestamp: breakEntry.timestamp,
// //               type: 'break'
// //             });
// //           });
// //         }

// //         return historyItem;
// //       });

// //       setLoginHistory(history);
// //       calculateTotalBreakTime(response.data.history);
// //     } catch (error) {
// //       console.error('Error fetching login history:', error.response?.data || error.message);
// //     }
// //   };

// //   // Calculate total break time in hours, minutes, and seconds
// //   const calculateTotalBreakTime = (history) => {
// //     let breakTime = 0;
// //     history.forEach(entry => {
// //       if (entry.breaktimestamp) {
// //         entry.breaktimestamp.forEach((breakEntry, index) => {
// //           const breakIn = new Date(breakEntry.timestamp);
// //           const breakOut = entry.breaktimestamp[index + 1] && entry.breaktimestamp[index + 1].status === 'Break Out' 
// //                             ? new Date(entry.breaktimestamp[index + 1].timestamp)
// //                             : null;

// //           if (breakOut) {
// //             breakTime += breakOut - breakIn; // Add the break duration in milliseconds
// //           }
// //         });
// //       }
// //     });

// //     setTotalBreakTime(breakTime);
// //   };

// //   // Toggle login state (Sign In / Sign Out)
// //   const toggleLoginState = async () => {
// //     const newState = loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out';

// //     setLoginOut(newState);

// //     try {
// //       const response = await axios.patch('http://localhost:4000/api/login', {
// //         action: newState,
// //         username: userName,
// //         timestamp: new Date().toISOString(),
// //       });

// //       fetchLoginHistory();
// //     } catch (error) {
// //       console.error('Error logging action:', error.response?.data || error.message);
// //       setLoginOut(loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out');
// //     }
// //   };

// //   // Toggle Break In/Break Out status
// //   const toggleBreakInOut = async () => {
// //     if (loginOut !== 'Sign In') {
// //       console.error('Cannot take a break unless signed in');
// //       return;
// //     }

// //     const newStatus = breakStatus === 'Break Out' ? 'Break In' : 'Break Out';
// //     setBreakStatus(newStatus);

// //     try {
// //       const response = await axios.patch('http://localhost:4000/api/break', {
// //         username: userName,
// //         status: newStatus,
// //         timestamp: new Date().toISOString(),
// //       });

// //       fetchLoginHistory();
// //     } catch (error) {
// //       console.error('Error logging break action:', error.response?.data || error.message);
// //       setBreakStatus(breakStatus === 'Break In' ? 'Break Out' : 'Break In');
// //     }
// //   };

// //   // Calculate duration between Sign In and Sign Out
// //   const calculateSignInSignOutDuration = (signInTimestamp, signOutTimestamp) => {
// //     const signIn = new Date(signInTimestamp);
// //     const signOut = new Date(signOutTimestamp);
// //     const diffInMilliseconds = signOut - signIn;

// //     const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
// //     const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
// //     const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

// //     return { hours, minutes, seconds };
// //   };

// //   // Format time with leading zeros for display
// //   const formatTime = (time) => (time < 10 ? `0${time}` : time);

// //   useEffect(() => {
// //     const intervalId = setInterval(() => {
// //       setCurrentDate(new Date());
// //     }, 1000);

// //     fetchLoginHistory();

// //     return () => clearInterval(intervalId);
// //   }, [userName]);

// //   // Format Break History Table
// //   const renderBreakHistory = () => {
// //     const breakEntries = [];

// //     loginHistory.forEach((entry, index) => {
// //       if (entry.type === 'break' && entry.action === 'Break Out') {
// //         // Find the corresponding "Break In" for this "Break Out"
// //         const breakInEntry = loginHistory.slice(0, index).reverse().find(e => e.type === 'break' && e.action === 'Break In');
        
// //         if (breakInEntry) {
// //           const breakIn = new Date(breakInEntry.timestamp);
// //           const breakOut = new Date(entry.timestamp);
// //           const breakDuration = breakOut - breakIn; // in milliseconds

// //           const breakDurationHours = Math.floor(breakDuration / (1000 * 60 * 60));
// //           const breakDurationMinutes = Math.floor((breakDuration % (1000 * 60 * 60)) / (1000 * 60));
// //           const breakDurationSeconds = Math.floor((breakDuration % (1000 * 60)) / 1000);

// //           breakEntries.push({
// //             breakIn: breakIn.toLocaleString(),
// //             breakOut: breakOut.toLocaleString(),
// //             breakDuration: `${breakDurationHours} hours ${breakDurationMinutes} minutes ${breakDurationSeconds} seconds`
// //           });
// //         }
// //       }
// //     });

// //     return breakEntries;
// //   };

// //   // Format Login History for Sign In/Sign Out table
// //   const renderLoginHistory = () => {
// //     const loginEntries = [];

// //     loginHistory.forEach((entry, index) => {
// //       if (entry.action === 'Sign In' || entry.action === 'Sign Out') {
// //         const timestamp = new Date(entry.timestamp).toLocaleString();

// //         if (entry.action === 'Sign In') {
// //           loginEntries.push({ signIn: timestamp, signOut: null, duration: null });
// //         } else if (entry.action === 'Sign Out') {
// //           const lastSignIn = loginEntries.find(e => e.signOut === null);
// //           if (lastSignIn) {
// //             lastSignIn.signOut = timestamp;
// //             const duration = calculateSignInSignOutDuration(lastSignIn.signIn, lastSignIn.signOut);
// //             lastSignIn.duration = `${formatTime(duration.hours)}:${formatTime(duration.minutes)}:${formatTime(duration.seconds)}`;
// //           }
// //         }
// //       }
// //     });

// //     return loginEntries;
// //   };

// //   return (
// //     <div className="p-6 space-y-4">
// //       <h1 className="text-2xl font-semibold mb-4">Current Date and Time</h1>

// //       {/* Display Current Date */}
// //       <div className="mb-2">
// //         <p><strong>Year:</strong> {currentDate.getFullYear()}</p>
// //         <p><strong>Month:</strong> {currentDate.getMonth() + 1}</p>
// //         <p><strong>Day:</strong> {currentDate.getDate()}</p>
// //       </div>

// //       {/* Display Current Time */}
// //       <div className="mb-4">
// //         <p>
// //           <strong>Time:</strong> {formatTime(currentDate.getHours())}:
// //           {formatTime(currentDate.getMinutes())}:{formatTime(currentDate.getSeconds())}
// //         </p>
// //       </div>

// //       {/* Toggle Sign In/Sign Out Button */}
// //       <div>
// //         <button
// //           onClick={toggleLoginState}
// //           className={`text-white px-4 py-2 rounded-lg 
// //             ${loginOut === 'Sign In' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
// //         >
// //           {loginOut === 'Sign In' ? 'Sign Out' : 'Sign In'}
// //         </button>
// //       </div>

// //       {/* Toggle Break In/Break Out Button */}
// //       <div>
// //         <button
// //           onClick={toggleBreakInOut}
// //           className={`text-white px-4 py-2 rounded-lg 
// //             ${breakStatus === 'Break In' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
// //           disabled={loginOut !== 'Sign In'}
// //         >
// //           {breakStatus === 'Break In' ? 'Break Out' : 'Break In'}
// //         </button>

// //         <Link href={'/components/LeaveApplyPage'} className='text-white px-4 py-2 rounded-lg bg-black'>Leave Apply</Link>
// //       </div>

// //       {/* Display Sign In and Sign Out History */}
// //       <div className="mt-6">
// //         <h3 className="text-lg font-semibold">Sign In/Sign Out History:</h3>
// //         <table className="min-w-full table-auto border-collapse border border-gray-300">
// //           <thead>
// //             <tr className="bg-gray-100">
// //               <th className="border px-4 py-2">Sign In</th>
// //               <th className="border px-4 py-2">Sign Out</th>
// //               <th className="border px-4 py-2">Duration</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {renderLoginHistory().map((entry, index) => (
// //               <tr key={index}>
// //                 <td className="border px-4 py-2">{entry.signIn}</td>
// //                 <td className="border px-4 py-2">{entry.signOut || '-'}</td>
// //                 <td className="border px-4 py-2">{entry.duration || '-'}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Display Break History Table */}
// //       <div className="mt-6">
// //         <h3 className="text-lg font-semibold">Break History:</h3>
// //         <table className="min-w-full table-auto border-collapse border border-gray-300">
// //           <thead>
// //             <tr className="bg-gray-100">
// //               <th className="border px-4 py-2">Break In</th>
// //               <th className="border px-4 py-2">Break Out</th>
// //               <th className="border px-4 py-2">Break Duration</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {renderBreakHistory().map((entry, index) => (
// //               <tr key={index}>
// //                 <td className="border px-4 py-2">{entry.breakIn}</td>
// //                 <td className="border px-4 py-2">{entry.breakOut || '-'}</td>
// //                 <td className="border px-4 py-2">{entry.breakDuration}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Display Total Break Time */}
// //       <div className="mt-6">
// //         <h3 className="text-lg font-semibold">Total Break Time:</h3>
// //         <p>
// //           Total Break Time: {Math.floor(totalBreakTime / (1000 * 60 * 60))} hours 
// //           {Math.floor((totalBreakTime % (1000 * 60 * 60)) / (1000 * 60))} minutes 
// //           {Math.floor((totalBreakTime % (1000 * 60)) / 1000)} seconds
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Attendance;







// 'use client';
// import { useAppContext } from '@/app/Context';
// import axios from 'axios';
// import Link from 'next/link';
// import React, { useState, useEffect } from 'react';

// const Attendance = () => {
//   const { userName } = useAppContext();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [loginOut, setLoginOut] = useState('Sign Out');
//   const [breakStatus, setBreakStatus] = useState('Break Out');
//   const [loginHistory, setLoginHistory] = useState([]);
//   const [totalBreakTime, setTotalBreakTime] = useState(0); // Tracks total break time in milliseconds
//   const [totalWorkingTime, setTotalWorkingTime] = useState(0); // Tracks total working time in milliseconds

//   // Fetch login and break history from the backend
//   const fetchLoginHistory = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/login-history', {
//         params: { username: userName },
//       });

//       const history = response.data.history.flatMap(entry => {
//         const historyItem = [{ action: entry.action, timestamp: entry.timestamp }];
        
//         if (entry.breaktimestamp && entry.breaktimestamp.length > 0) {
//           entry.breaktimestamp.forEach(breakEntry => {
//             historyItem.push({
//               action: breakEntry.status,
//               timestamp: breakEntry.timestamp,
//               type: 'break'
//             });
//           });
//         }

//         return historyItem;
//       });

//       setLoginHistory(history);
//       calculateTotalBreakTime(response.data.history);
//       calculateTotalWorkingTime(response.data.history);
//     } catch (error) {
//       console.error('Error fetching login history:', error.response?.data || error.message);
//     }
//   };

//   // Calculate total break time in milliseconds
//   const calculateTotalBreakTime = (history) => {
//     let breakTime = 0;
//     history.forEach(entry => {
//       if (entry.breaktimestamp) {
//         entry.breaktimestamp.forEach((breakEntry, index) => {
//           const breakIn = new Date(breakEntry.timestamp);
//           const breakOut = entry.breaktimestamp[index + 1] && entry.breaktimestamp[index + 1].status === 'Break Out' 
//                             ? new Date(entry.breaktimestamp[index + 1].timestamp)
//                             : null;

//           if (breakOut) {
//             breakTime += breakOut - breakIn; // Add the break duration in milliseconds
//           }
//         });
//       }
//     });

//     setTotalBreakTime(breakTime);
//   };

//   // Calculate total working time by subtracting break time from login/logout duration
//   const calculateTotalWorkingTime = (history) => {
//     let workingTime = 0;
//     let lastSignIn = null;

//     history.forEach(entry => {
//       if (entry.action === 'Sign In') {
//         lastSignIn = new Date(entry.timestamp);
//       }

//       if (entry.action === 'Sign Out' && lastSignIn) {
//         const signOut = new Date(entry.timestamp);
//         workingTime += signOut - lastSignIn; // Add the working time in milliseconds
//         lastSignIn = null; // Reset lastSignIn after sign out
//       }
//     });

//     // Subtract the total break time from working time
//     workingTime -= totalBreakTime;
//     setTotalWorkingTime(workingTime);
//   };

//   // Toggle login state (Sign In / Sign Out)
//   const toggleLoginState = async () => {
//     const newState = loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out';

//     setLoginOut(newState);

//     try {
//       const response = await axios.patch('http://localhost:4000/api/login', {
//         action: newState,
//         username: userName,
//         timestamp: new Date().toISOString(),
//       });

//       fetchLoginHistory();
//     } catch (error) {
//       console.error('Error logging action:', error.response?.data || error.message);
//       setLoginOut(loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out');
//     }
//   };

//   // Toggle Break In/Break Out status
//   const toggleBreakInOut = async () => {
//     if (loginOut !== 'Sign In') {
//       console.error('Cannot take a break unless signed in');
//       return;
//     }

//     const newStatus = breakStatus === 'Break Out' ? 'Break In' : 'Break Out';
//     setBreakStatus(newStatus);

//     try {
//       const response = await axios.patch('http://localhost:4000/api/break', {
//         username: userName,
//         status: newStatus,
//         timestamp: new Date().toISOString(),
//       });

//       fetchLoginHistory();
//     } catch (error) {
//       console.error('Error logging break action:', error.response?.data || error.message);
//       setBreakStatus(breakStatus === 'Break In' ? 'Break Out' : 'Break In');
//     }
//   };

//   // Calculate duration between Sign In and Sign Out
//   const calculateSignInSignOutDuration = (signInTimestamp, signOutTimestamp) => {
//     const signIn = new Date(signInTimestamp);
//     const signOut = new Date(signOutTimestamp);
//     const diffInMilliseconds = signOut - signIn;

//     const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
//     const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

//     return { hours, minutes, seconds };
//   };

//   // Format time with leading zeros for display
//   const formatTime = (time) => (time < 10 ? `0${time}` : time);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentDate(new Date());
//     }, 1000);

//     fetchLoginHistory();

//     return () => clearInterval(intervalId);
//   }, [userName]);

//   // Format Break History Table
//   const renderBreakHistory = () => {
//     const breakEntries = [];

//     loginHistory.forEach((entry, index) => {
//       if (entry.type === 'break' && entry.action === 'Break Out') {
//         // Find the corresponding "Break In" for this "Break Out"
//         const breakInEntry = loginHistory.slice(0, index).reverse().find(e => e.type === 'break' && e.action === 'Break In');
        
//         if (breakInEntry) {
//           const breakIn = new Date(breakInEntry.timestamp);
//           const breakOut = new Date(entry.timestamp);
//           const breakDuration = breakOut - breakIn; // in milliseconds

//           const breakDurationHours = Math.floor(breakDuration / (1000 * 60 * 60));
//           const breakDurationMinutes = Math.floor((breakDuration % (1000 * 60 * 60)) / (1000 * 60));
//           const breakDurationSeconds = Math.floor((breakDuration % (1000 * 60)) / 1000);

//           breakEntries.push({
//             breakIn: breakIn.toLocaleString(),
//             breakOut: breakOut.toLocaleString(),
//             breakDuration: `${breakDurationHours} hours ${breakDurationMinutes} minutes ${breakDurationSeconds} seconds`
//           });
//         }
//       }
//     });

//     return breakEntries;
//   };

//   // Format Login History for Sign In/Sign Out table
//   const renderLoginHistory = () => {
//     const loginEntries = [];

//     loginHistory.forEach((entry, index) => {
//       if (entry.action === 'Sign In' || entry.action === 'Sign Out') {
//         const timestamp = new Date(entry.timestamp).toLocaleString();

//         if (entry.action === 'Sign In') {
//           loginEntries.push({ signIn: timestamp, signOut: null, duration: null });
//         } else if (entry.action === 'Sign Out') {
//           const lastSignIn = loginEntries.find(e => e.signOut === null);
//           if (lastSignIn) {
//             lastSignIn.signOut = timestamp;
//             const duration = calculateSignInSignOutDuration(lastSignIn.signIn, lastSignIn.signOut);
//             lastSignIn.duration = `${formatTime(duration.hours)}:${formatTime(duration.minutes)}:${formatTime(duration.seconds)}`;
//           }
//         }
//       }
//     });

//     return loginEntries;
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-2xl font-semibold mb-4">Current Date and Time</h1>

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
//           {formatTime(currentDate.getMinutes())}:{formatTime(currentDate.getSeconds())}
//         </p>
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

//       {/* Toggle Break In/Break Out Button */}
//       <div>
//         <button
//           onClick={toggleBreakInOut}
//           className={`text-white px-4 py-2 rounded-lg 
//             ${breakStatus === 'Break In' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
//           disabled={loginOut !== 'Sign In'}
//         >
//           {breakStatus === 'Break In' ? 'Break Out' : 'Break In'}
//         </button>

//         <Link href={'/components/LeaveApplyPage'} className='text-white px-4 py-2 rounded-lg bg-black'>Leave Apply</Link>
//       </div>

//       {/* Display Sign In and Sign Out History */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold">Sign In/Sign Out History:</h3>
//         <table className="min-w-full table-auto border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">Sign In</th>
//               <th className="border px-4 py-2">Sign Out</th>
//               <th className="border px-4 py-2">Duration</th>
//             </tr>
//           </thead>
//           <tbody>
//             {renderLoginHistory().map((entry, index) => (
//               <tr key={index}>
//                 <td className="border px-4 py-2">{entry.signIn}</td>
//                 <td className="border px-4 py-2">{entry.signOut || '-'}</td>
//                 <td className="border px-4 py-2">{entry.duration || '-'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Display Break History Table */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold">Break History:</h3>
//         <table className="min-w-full table-auto border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border px-4 py-2">Break In</th>
//               <th className="border px-4 py-2">Break Out</th>
//               <th className="border px-4 py-2">Break Duration</th>
//             </tr>
//           </thead>
//           <tbody>
//             {renderBreakHistory().map((entry, index) => (
//               <tr key={index}>
//                 <td className="border px-4 py-2">{entry.breakIn}</td>
//                 <td className="border px-4 py-2">{entry.breakOut || '-'}</td>
//                 <td className="border px-4 py-2">{entry.breakDuration}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Display Total Break Time */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold">Total Break Time:</h3>
//         <p>
//           Total Break Time: {Math.floor(totalBreakTime / (1000 * 60 * 60))} hours 
//           {Math.floor((totalBreakTime % (1000 * 60 * 60)) / (1000 * 60))} minutes 
//           {Math.floor((totalBreakTime % (1000 * 60)) / 1000)} seconds
//         </p>
//       </div>

//       {/* Display Total Working Time */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold">Total Working Time:</h3>
//         <p>
//           Total Working Time: {Math.floor(totalWorkingTime / (1000 * 60 * 60))} hours 
//           {Math.floor((totalWorkingTime % (1000 * 60 * 60)) / (1000 * 60))} minutes 
//           {Math.floor((totalWorkingTime % (1000 * 60)) / 1000)} seconds
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Attendance;









'use client';
import { useAppContext } from '@/app/Context';
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Attendance = () => {
  const { userName } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loginOut, setLoginOut] = useState('Sign Out');
  const [breakStatus, setBreakStatus] = useState('Break Out');
  const [loginHistory, setLoginHistory] = useState([]);
  const [totalBreakTime, setTotalBreakTime] = useState(0); // Tracks total break time in milliseconds
  const [totalWorkingTime, setTotalWorkingTime] = useState(0); // Tracks total working time in milliseconds
  const [totalSignInSignOutDuration, setTotalSignInSignOutDuration] = useState(0); // Tracks total sign-in/sign-out duration
  const [totalBreakInOutDuration, setTotalBreakInOutDuration] = useState(0); // Tracks total break-in/break-out duration

  // Fetch login and break history from the backend
  const fetchLoginHistory = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/login-history', {
        params: { username: userName },
      });

      const history = response.data.history.flatMap(entry => {
        const historyItem = [{ action: entry.action, timestamp: entry.timestamp }];
        
        if (entry.breaktimestamp && entry.breaktimestamp.length > 0) {
          entry.breaktimestamp.forEach(breakEntry => {
            historyItem.push({
              action: breakEntry.status,
              timestamp: breakEntry.timestamp,
              type: 'break'
            });
          });
        }

        return historyItem;
      });

      setLoginHistory(history);
      calculateTotalBreakTime(response.data.history);
      calculateTotalWorkingTime(response.data.history);
      calculateTotalSignInSignOutDuration(response.data.history);
      calculateTotalBreakInOutDuration(response.data.history);
    } catch (error) {
      console.error('Error fetching login history:', error.response?.data || error.message);
    }
  };

  // Calculate total break time in milliseconds
  const calculateTotalBreakTime = (history) => {
    let breakTime = 0;
    history.forEach(entry => {
      if (entry.breaktimestamp) {
        entry.breaktimestamp.forEach((breakEntry, index) => {
          const breakIn = new Date(breakEntry.timestamp);
          const breakOut = entry.breaktimestamp[index + 1] && entry.breaktimestamp[index + 1].status === 'Break Out' 
                            ? new Date(entry.breaktimestamp[index + 1].timestamp)
                            : null;

          if (breakOut) {
            breakTime += breakOut - breakIn; // Add the break duration in milliseconds
          }
        });
      }
    });

    setTotalBreakTime(breakTime);
  };

  // Calculate total working time by subtracting break time from login/logout duration
  const calculateTotalWorkingTime = (history) => {
    let workingTime = 0;
    let lastSignIn = null;

    history.forEach(entry => {
      if (entry.action === 'Sign In') {
        lastSignIn = new Date(entry.timestamp);
      }

      if (entry.action === 'Sign Out' && lastSignIn) {
        const signOut = new Date(entry.timestamp);
        workingTime += signOut - lastSignIn; // Add the working time in milliseconds
        lastSignIn = null; // Reset lastSignIn after sign out
      }
    });

    // Subtract the total break time from working time
    workingTime -= totalBreakTime;
    setTotalWorkingTime(workingTime);
  };

  // Calculate total sign-in/sign-out duration
  const calculateTotalSignInSignOutDuration = (history) => {
    let signInSignOutDuration = 0;
    let lastSignIn = null;

    history.forEach(entry => {
      if (entry.action === 'Sign In') {
        lastSignIn = new Date(entry.timestamp);
      }

      if (entry.action === 'Sign Out' && lastSignIn) {
        const signOut = new Date(entry.timestamp);
        signInSignOutDuration += signOut - lastSignIn; // Add the sign-in/sign-out duration in milliseconds
        lastSignIn = null; // Reset lastSignIn after sign out
      }
    });

    setTotalSignInSignOutDuration(signInSignOutDuration);
  };

  // Calculate total break-in/break-out duration
  const calculateTotalBreakInOutDuration = (history) => {
    let breakInOutDuration = 0;

    history.forEach(entry => {
      if (entry.type === 'break' && entry.action === 'Break Out') {
        const breakInEntry = history.slice(0, history.indexOf(entry)).reverse().find(e => e.type === 'break' && e.action === 'Break In');
        
        if (breakInEntry) {
          const breakIn = new Date(breakInEntry.timestamp);
          const breakOut = new Date(entry.timestamp);
          breakInOutDuration += breakOut - breakIn; // Add the break-in/break-out duration in milliseconds
        }
      }
    });

    setTotalBreakInOutDuration(breakInOutDuration);
  };

  // Toggle login state (Sign In / Sign Out)
  const toggleLoginState = async () => {
    const newState = loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out';

    setLoginOut(newState);

    try {
      const response = await axios.patch('http://localhost:4000/api/login', {
        action: newState,
        username: userName,
        timestamp: new Date().toISOString(),
      });

      fetchLoginHistory();
    } catch (error) {
      console.error('Error logging action:', error.response?.data || error.message);
      setLoginOut(loginOut === 'Sign Out' ? 'Sign In' : 'Sign Out');
    }
  };

  // Toggle Break In/Break Out status
  const toggleBreakInOut = async () => {
    if (loginOut !== 'Sign In') {
      console.error('Cannot take a break unless signed in');
      return;
    }

    const newStatus = breakStatus === 'Break Out' ? 'Break In' : 'Break Out';
    setBreakStatus(newStatus);

    try {
      const response = await axios.patch('http://localhost:4000/api/break', {
        username: userName,
        status: newStatus,
        timestamp: new Date().toISOString(),
      });

      fetchLoginHistory();
    } catch (error) {
      console.error('Error logging break action:', error.response?.data || error.message);
      setBreakStatus(breakStatus === 'Break In' ? 'Break Out' : 'Break In');
    }
  };

  // Format time with leading zeros for display
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    fetchLoginHistory();

    return () => clearInterval(intervalId);
  }, [userName]);

  // Format Break History Table
  const renderBreakHistory = () => {
    const breakEntries = [];

    loginHistory.forEach((entry, index) => {
      if (entry.type === 'break' && entry.action === 'Break Out') {
        // Find the corresponding "Break In" for this "Break Out"
        const breakInEntry = loginHistory.slice(0, index).reverse().find(e => e.type === 'break' && e.action === 'Break In');
        
        if (breakInEntry) {
          const breakIn = new Date(breakInEntry.timestamp);
          const breakOut = new Date(entry.timestamp);
          const breakDuration = breakOut - breakIn; // in milliseconds

          const breakDurationHours = Math.floor(breakDuration / (1000 * 60 * 60));
          const breakDurationMinutes = Math.floor((breakDuration % (1000 * 60 * 60)) / (1000 * 60));
          const breakDurationSeconds = Math.floor((breakDuration % (1000 * 60)) / 1000);

          breakEntries.push({
            breakIn: breakIn.toLocaleString(),
            breakOut: breakOut.toLocaleString(),
            breakDuration: `${breakDurationHours} hours ${breakDurationMinutes} minutes ${breakDurationSeconds} seconds`
          });
        }
      }
    });

    return breakEntries;
  };

  // Format Login History for Sign In/Sign Out table
  const renderLoginHistory = () => {
    const loginEntries = [];

    loginHistory.forEach((entry, index) => {
      if (entry.action === 'Sign In' || entry.action === 'Sign Out') {
        const timestamp = new Date(entry.timestamp).toLocaleString();

        if (entry.action === 'Sign In') {
          loginEntries.push({ signIn: timestamp, signOut: null, duration: null });
        } else if (entry.action === 'Sign Out') {
          const lastSignIn = loginEntries.find(e => e.signOut === null);
          if (lastSignIn) {
            lastSignIn.signOut = timestamp;
            const duration = calculateSignInSignOutDuration(lastSignIn.signIn, lastSignIn.signOut);
            lastSignIn.duration = `${formatTime(duration.hours)}:${formatTime(duration.minutes)}:${formatTime(duration.seconds)}`;
          }
        }
      }
    });

    return loginEntries;
  };

  // Function to calculate the duration between Sign In and Sign Out
  const calculateSignInSignOutDuration = (signInTime, signOutTime) => {
    const signInDate = new Date(signInTime);
    const signOutDate = new Date(signOutTime);

    const duration = signOutDate - signInDate; // in milliseconds

    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold mb-4">Current Date and Time</h1>

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
          {formatTime(currentDate.getMinutes())}:{formatTime(currentDate.getSeconds())}
        </p>
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

      {/* Toggle Break In/Break Out Button */}
      <div>
        <button
          onClick={toggleBreakInOut}
          className={`text-white px-4 py-2 rounded-lg 
            ${breakStatus === 'Break In' ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'}`}
          disabled={loginOut !== 'Sign In'}
        >
          {breakStatus === 'Break In' ? 'Break Out' : 'Break In'}
        </button>

        <Link href={'/components/LeaveApplyPage'} className='text-white px-4 py-2 rounded-lg bg-black'>Leave Apply</Link>
      </div>

      {/* Display Sign In and Sign Out History */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Sign In/Sign Out History:</h3>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Sign In</th>
              <th className="border px-4 py-2">Sign Out</th>
              <th className="border px-4 py-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {renderLoginHistory().map((entry, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{entry.signIn}</td>
                <td className="border px-4 py-2">{entry.signOut || '-'}</td>
                <td className="border px-4 py-2">{entry.duration || '-'}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-200">
              <td className="border px-4 py-2" colSpan="2">Total Duration:</td>
              <td className="border px-4 py-2">
                {Math.floor(totalSignInSignOutDuration / (1000 * 60 * 60))} hours 
                {Math.floor((totalSignInSignOutDuration % (1000 * 60 * 60)) / (1000 * 60))} minutes 
                {Math.floor((totalSignInSignOutDuration % (1000 * 60)) / 1000)} seconds
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Display Break History Table */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Break History:</h3>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Break In</th>
              <th className="border px-4 py-2">Break Out</th>
              <th className="border px-4 py-2">Break Duration</th>
            </tr>
          </thead>
          <tbody>
            {renderBreakHistory().map((entry, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{entry.breakIn}</td>
                <td className="border px-4 py-2">{entry.breakOut || '-'}</td>
                <td className="border px-4 py-2">{entry.breakDuration}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-200">
              <td className="border px-4 py-2" colSpan="2">Total Break Duration:</td>
              <td className="border px-4 py-2">
                {Math.floor(totalBreakInOutDuration / (1000 * 60 * 60))} hours 
                {Math.floor((totalBreakInOutDuration % (1000 * 60 * 60)) / (1000 * 60))} minutes 
                {Math.floor((totalBreakInOutDuration % (1000 * 60)) / 1000)} seconds
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Display Total Break Time */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Total Break Time:</h3>
        <p>
          Total Break Time: {Math.floor(totalBreakTime / (1000 * 60 * 60))} hours 
          {Math.floor((totalBreakTime % (1000 * 60 * 60)) / (1000 * 60))} minutes 
          {Math.floor((totalBreakTime % (1000 * 60)) / 1000)} seconds
        </p>
      </div>

      {/* Display Total Working Time */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Total Working Time:</h3>
        <p>
          Total Working Time: {Math.floor(totalWorkingTime / (1000 * 60 * 60))} hours 
          {Math.floor((totalWorkingTime % (1000 * 60 * 60)) / (1000 * 60))} minutes 
          {Math.floor((totalWorkingTime % (1000 * 60)) / 1000)} seconds
        </p>
      </div>
    </div>
  );
};

export default Attendance;
