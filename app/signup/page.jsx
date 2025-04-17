"use client";

import { useState } from 'react';
import Footer from '@/Components/homepage/Footer';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Please enter your name";

    if (!formData.email) {
      newErrors.email = "Please enter your email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.dob) newErrors.dob = "Please enter your date of birth";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Signup successful!");
      console.log("Form submitted:", formData);
      window.location.href = '/login';
    }
  };

  return (
    <>
      
      <div className="flex items-center justify-center min-h-screen bg-[#2e2e2e]">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-green-700">Create new Account</h2>
          <p className="text-sm text-[#407911]">
            <a href="/login" className="underline font-semibold">Already Registered? Login</a>
          </p>
          <div className="text-4xl font-bold text-green-800 mt-4">UTCC</div>
          <p className="text-lg font-semibold text-gray-700">ComSci Review</p>

          <form onSubmit={handleSubmit} className="mt-6 text-left">
            {/* Name */}
            <div className="mb-4">
              <label className="block text-gray-900 text-sm">PLEASE ENTER YOUR NAME</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border bg-[#bfd0ac] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6661]"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-900 text-sm">PLEASE ENTER YOUR EMAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border bg-[#bfd0ac] rounded-md focus:outline-none focus:ring-2 focus:ring-[#3f6661]"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-900 text-sm">PLEASE ENTER YOUR PASSWORD</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-[#bfd0ac] focus:outline-none focus:ring-2 focus:ring-[#3f6661]"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Date of Birth */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm">PLEASE ENTER YOUR DATE OF BIRTH</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md bg-[#bfd0ac] focus:outline-none"
              />
              {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-[#3f6661]"
            >Sign Up
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
