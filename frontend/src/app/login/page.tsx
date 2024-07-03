"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      router.push('/');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 mx-auto md:h-screen lg:py-0">
      <div className="w-450 rounded-xl shadow-2xl md:mt-0 sm:max-w-md xl:p-0 bg-neutral-800">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl font-bold font-Poppins-Regular leading-tight tracking-tightmd:text-2xl text-white">
            Sign in
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-lg font-semibold font-Poppins-Regular text-white">Your username</label>
              <input 
                className="bg-neutral-700 rounded-xl focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 text-white text-lg font-Poppins-Regular" 
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-lg font-semibold font-Poppins-Regular text-white">Password</label>
              <div className="relative">
                <input 
                  placeholder="••••••••" 
                  className="bg-neutral-700 rounded-xl focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 text-white text-lg font-Poppins-Regular"  
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash className="text-gray-500 hover:text-gray-300" /> : <FaEye className="text-gray-500 hover:text-gray-300" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input 
                    id="remember" 
                    aria-describedby="remember" 
                    type="checkbox" 
                    className="w-4 h-4 border border-gray-300 bg-gray-50 focus:ring-3 focus:ring-primary-300 mt-2.5 font-Poppins-Regular" 
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="block mb-2 text-lg font-semibold font-Poppins-Regular text-white">Remember me</label>
                </div>
              </div>
              <a href="#" className="block mb-2 text-lg font-semibold text-white font-Poppins-Regular">Forgot password?</a>
            </div>
            <button 
              type="submit" 
              className="w-full bg-violet-600 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-primary-300 text-lg font-semibold text-white rounded-xl px-5 py-2.5 text-center font-Poppins-Regular"
            >
              Sign in
            </button>
            <p className="block mb-2 text-lg font-semibold text-white font-Poppins-Regular">
              Don’t have an account yet? <Link href="/register" className="mb-2 text-lg font-semibold text-violet-500 hover:text-violet-400 ">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
