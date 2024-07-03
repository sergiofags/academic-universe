"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, lastName, username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers and special characters');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/auth/register', { name, lastName, username, email, password });
      router.push('/login');
    } catch (error) {
      console.error('Error registering', error);
      setError('Error registering user');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 mx-auto md:h-screen lg:py-0">
      <div className="w-450 rounded-xl shadow-2xl md:mt-0 sm:max-w-md xl:p-0 bg-neutral-800">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl font-bold font-Poppins-Regular leading-tight tracking-tight md:text-2xl text-white">
            Sign up
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-lg font-semibold font-Poppins-Regular text-white">First name</label>
              <input
                className="bg-neutral-700 rounded-xl focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 text-white text-lg font-Poppins-Regular"
                type="text"
                name="name"
                placeholder="First Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block mb-2 text-lg font-semibold font-Poppins-Regular text-white">Last name</label>
              <input
                className="bg-neutral-700 rounded-xl focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 text-white text-lg font-Poppins-Regular"
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-lg font-semibold font-Poppins-Regular text-white">Username</label>
              <input
                className="bg-neutral-700 rounded-xl focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 text-white text-lg font-Poppins-Regular"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-lg font-semibold font-Poppins-Regular text-white">Email address</label>
              <input
                className="bg-neutral-700 rounded-xl focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 text-white text-lg font-Poppins-Regular"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 text-lg font-semibold font-Poppins-Regular text-white">Password</label>
              <div className="relative">
                <input
                  className="bg-neutral-700 rounded-xl focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 text-white text-lg font-Poppins-Regular"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
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
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block mb-2 text-lg font-semibold font-Poppins-Regular text-white">Confirm password</label>
              <div className="relative">
                <input
                  className="bg-neutral-700 rounded-xl focus:ring-violet-600 focus:border-violet-600 block w-full p-2.5 text-white text-lg font-Poppins-Regular"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash className="text-gray-500 hover:text-gray-300" /> : <FaEye className="text-gray-500 hover:text-gray-300" />}
                </button>
              </div>
            </div>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-500 focus:ring-4 focus:outline-none focus:ring-primary-300 text-lg font-semibold text-white rounded-xl px-5 py-2.5 text-center mb-4 font-Poppins-Regular"
            >
              Sign up
            </button>
            <p className="block mb-2 text-lg font-semibold text-white font-Poppins-Regular">
              Already have an account? <Link href="/login" className="mb-2 text-lg font-semibold text-violet-500 hover:text-violet-400">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
