'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import Footer from "../../Components/homepage/Footer";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const users = [
    { email: "eki@gmail.com", password: "eki00" },
    { email: "test@example.com", password: "password123" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const userExists = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userExists) {
      alert("Login successful!");
      router.push("/welcome");
    } else {
      setErrorMessage("Invalid login credentials!");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#2e2e2e]">
        <div className="bg-[#7ea566] rounded-lg p-8 shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-2 text-white">Welcome</h2>
          <p className="text-center text-white mb-6">Please Enter Your Email</p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-white mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-white bg-transparent text-white rounded placeholder-white"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-white mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-white bg-transparent text-white rounded placeholder-white"
                placeholder="Enter your password"
                required
              />
            </div>

            {errorMessage && (
              <p className="text-red-200 text-center mb-4">{errorMessage}</p>
            )}

            <div className="flex items-center justify-between mb-4 text-white text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember Me
              </label>
              <a href="#" className="text-blue-200 hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded mb-3 hover:opacity-80"
            >
              Log In
            </button>
          </form>

          <button
            onClick={() => alert("Microsoft login clicked!")}
            className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            <img
              src="/microsoft-logo.jpg"
              alt="Microsoft"
              className="w-5 h-5 mr-2"
            />
            Log In With Microsoft account
          </button>

          <p className="text-center text-sm text-white mt-4">
            New here?{" "}
            <a href="/signup" className="text-blue-200 hover:underline">
              Create an account.
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}