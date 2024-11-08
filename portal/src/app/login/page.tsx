"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { useAppContext } from "../Context";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

export default function LoginPage() {
    const router = useRouter();
    const { updateUserDetails } = useAppContext();
    
    const [user, setUser] = useState({
        email: "",
        password: "",
        employeeId:""
    });
    
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const onLogin = async () => {
        if (!user.email || !user.password) {
            return alert("Please fill in all fields.");
        }

        try {
          console.log(user);
          
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log("Login Response", response.data);
            
            // Update user details in context
            updateUserDetails(response.data.user); 
            
            // Redirect based on user role
            const redirectPath ='/components/Attentance';
            // const redirectPath = user.role === 'admin' ? '/Admin/Dashboard' : '/Dashboard/Filter';
            router.push(redirectPath);
        } catch (error) {
            console.log("Login failed", error);
            alert("Login failed: " + (error.response?.data?.error || error.message));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2">
            <h1 className="text-2xl font-bold mb-4">{loading ? "Processing" : "Login"}</h1>
            <hr className="w-full mb-4" />
            

            <label htmlFor="email" className="mb-1">Employee Id : </label>
            <input
                className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-4 w-80"
                id="Employee Id"
                type="text"
                value={user.employeeId}
                onChange={(e) => setUser({ ...user, employeeId: e.target.value })}
                placeholder="Email"
            />

            <label htmlFor="email" className="mb-1">Email</label>
            <input
                className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black mb-4 w-80"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />

            <label htmlFor="password" className="mb-1">Password</label>
            <div className="relative mb-4 w-80">
                <input
                    className="p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black w-full"
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
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
                onClick={onLogin}
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


