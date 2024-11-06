'use client';
import { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";


const AppContext = createContext('Hello');

export function AppWrapper({ children }) {

    const [userName, setUserName] = useState(null);

    const fetchUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            setUserName(res.data.data.username);
        } catch (error) {
            console.error(error.message);
            setUserName(null); // User not logged in
        }
    };

    const updateUserDetails = () => {
        fetchUserDetails();
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);



    return (
        <AppContext.Provider value={{ 
         
            userName, 
            updateUserDetails
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
