'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create a Context for the app
const AppContext = createContext(null);

// Context Provider component
export function AppWrapper({ children }) {
  const [userName, setUserName] = useState(null);
  const [employeeId,setEmployeeId]=useState(null);

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me');
      setUserName(res.data.data.username); 
      setEmployeeId(res.data.data.employeeId);
    } catch (error) {
      console.error(error.message);
      setUserName(null); // Set to null if user is not logged in
    }
  };
console.log(userName);

console.log(employeeId);


  // Update the user details by calling the fetch function
  const updateUserDetails = () => {
    fetchUserDetails();
  };

  // Fetch user details when the component mounts
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <AppContext.Provider value={{employeeId, userName, updateUserDetails }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the app context
export function useAppContext() {
  return useContext(AppContext);
}
