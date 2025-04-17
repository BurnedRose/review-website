'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "../../Components/homepage/Footer";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const users = [
    { email: "eki@gmail.com", password: "eki00" },
    { email: "test@example.com", password: "password123" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      const userExists = users.find(
        (user) => user.email === email && user.password === password
      );
      
      if (userExists) {
        router.push("/welcome");
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <>
      <div 
        className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.8)), url('/background-image1.jpg')"
        }}
      >
        <div className="w-full max-w-md px-6 py-8">
          {/* Card with glassmorphism effect */}
          <div className="relative bg-gradient-to-br from-[#8aba74] to-[#6b9654] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10 rounded-full -ml-12 -mb-12"></div>
            
            {/* Logo and Header */}
            <div className="px-8 pt-8 pb-4 text-center relative z-10">
              <div className="flex justify-center mb-5">
                <div className="bg-white p-3 rounded-full shadow-lg">
                  <Image 
                    src="/logo.png" 
                    alt="Company Logo"
                    width={100} 
                    height={40} 
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white">Welcome</h2>
              <p className="text-white mt-2 opacity-90">Please Enter Your Login Details</p>
            </div>
            
            {/* Form Section */}
            <div className="px-8 py-6 relative z-10">
              {errorMessage && (
                <div className="mb-6 bg-red-500 bg-opacity-20 border-l-4 border-red-500 p-4 rounded-lg">
                  <p className="text-white text-sm">{errorMessage}</p>
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition-all text-gray-800 placeholder-gray-400"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition-all text-gray-800 placeholder-gray-400"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-white text-sm">
                  <label className="flex items-center cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="mr-2 h-4 w-4 rounded border-white focus:ring-green-600 text-green-600"
                    /> 
                    <span className="group-hover:text-green-100 transition-colors">Remember Me</span>
                  </label>
                  <a href="#" className="text-white hover:text-green-100 transition-colors font-medium">Forgot Password?</a>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 rounded-lg shadow-lg text-white font-medium bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] ${
                    isLoading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></span>
                      Signing in...
                    </span>
                  ) : (
                    "Log In"
                  )}
                </button>
              </form>
              
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white border-opacity-30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gradient-to-r from-[#8aba74] to-[#6b9654] text-white font-medium">Or</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={() => alert("Microsoft login clicked!")}
                    className="w-full flex items-center justify-center py-3 px-4 rounded-lg shadow-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="mr-3">
                      <Image
                        src="/microsoft-logo.jpg"
                        alt="Microsoft Logo"
                        width={20}
                        height={20}
                      />
                    </div>
                    <span className="font-medium">Log In With Microsoft account</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="px-8 py-5 text-center border-t border-white border-opacity-20 bg-black bg-opacity-10">
              <p className="text-sm text-white">
                New here?{" "}
                <a href="/signup" className="text-white font-medium hover:text-green-100 transition-colors">
                  Create an account.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}