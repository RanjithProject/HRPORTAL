the login code is 

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useAppContext } from "../Context";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { onLogin, loading, buttonDisabled, handleButtonDisable } = useAppContext();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  // Handle user input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // Update button disabled state based on input
    handleButtonDisable(user.email, user.password);
  };

  // Handle login form submission
  const handleLogin = () => {
    onLogin(user, router); // Call the onLogin function from context
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
      <h1 className="text-2xl font-bold mb-4">{loading ? "Processing" : "Login"}</h1>
      <hr className="w-full mb-4" />

      <label htmlFor="email" className="mb-1">Email</label>
      <input
        className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-4 w-80"
        id="email"
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <label htmlFor="password" className="mb-1">Password</label>
      <div className="relative mb-4 w-80">
        <input
          className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black w-full"
          id="password"
          name="password"
          type={passwordVisible ? "text" : "password"}
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? <FaEyeSlash className="text-gray-600" /> : <FaRegEye className="text-gray-600" />}
        </button>
      </div>

      <button
        onClick={handleLogin}
        className="p-2 border border-gray-300 mb-4 bg-blue-500 text-white rounded-lg w-80 hover:bg-blue-600 transition duration-200"
        disabled={buttonDisabled || loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <div className="flex flex-col items-center">
        <Link href="/signup" className="text-blue-500 mb-2">Visit Sign Up</Link>
        <Link href="/forgotpassword" className="text-blue-500">Forgot Password?</Link>
      </div>
    </div>
  );
}

and the context code is 


'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Create a Context for the app
const AppContext = createContext(null);

// Context Provider component
export function AppWrapper({ children }) {
  const [user, setUser] = useState(null); // Store the entire user object (not just username)
  const [loading, setLoading] = useState(false); // Loading state for login
  const [buttonDisabled, setButtonDisabled] = useState(true); // Button disabled state

  // Fetch user details
  const fetchUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me');
      setUser(res.data.data); // Set the user details
    } catch (error) {
      console.error(error.message);
      setUser(null); // Set to null if user is not logged in
    }
  };

  // Update the user details
  const updateUserDetails = (userData) => {
    setUser(userData);
  };

  // Handle the login process
  const onLogin = async (userData, router) => {
    if (!userData.email || !userData.password) {
      return toast.error("Please fill in all fields.");
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/users/login', userData);
      // Update user details in context after successful login
      updateUserDetails(response.data.user);
      
      toast.success("Login successful!");
      
      // Redirect user after login
      router.push('/profile'); // Adjust based on user role if necessary
    } catch (error) {
      toast.error("Login failed: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Fetch user details when the component mounts
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Disable button if email and password are not provided
  const handleButtonDisable = (email, password) => {
    setButtonDisabled(!(email && password));
  };

  return (
    <AppContext.Provider value={{ user, loading, buttonDisabled, onLogin, handleButtonDisable }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the app context
export function useAppContext() {
  return useContext(AppContext);
}
and the navbar .js is 
"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();

  // State to store user data
  const [user, setUser] = useState(null);

  // Logout function
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Successful");
      setUser(null); // Clear user data on logout
      router.push("/login");
    } catch (error) {
      console.error(error.message);
      toast.error("Error logging out");
    }
  };

  // Fetch user details (username and id)
  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      if (response.data?.data) {
        setUser(response.data.data); // Set the user data
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch user details");
    }
  };

  // Fetch user details on component mount
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-lg font-semibold">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link href="/profile" className="hover:text-gray-300">
              Profile
            </Link>

            {/* Conditionally render the username or login button */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-white">{user.username}</span> {/* Display user name */}
                  <button
                    onClick={logout}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
analys all code login to fastly update name in navbar without refreshing rewrite correctly