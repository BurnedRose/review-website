"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft, FaSignOutAlt, FaCamera } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Link from "next/link";

export default function EditProfilePage() {
  const router = useRouter(); // Initialize router
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
  });
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    const storedName = localStorage.getItem("profileName");
    const storedUsername = localStorage.getItem("profileUsername");
    const storedBio = localStorage.getItem("profileBio");

    setProfileImage(storedImage || null);
    setFormData({
      name: storedName || "",
      username: storedUsername || "",
      bio: storedBio || "Comsci",
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profileName", formData.name);
    localStorage.setItem("profileUsername", formData.username);
    localStorage.setItem("profileBio", formData.bio);
    
    setSaveStatus("success");
    
    // Show success message briefly, then redirect
    setTimeout(() => {
      router.push("/after"); // Redirect to after page
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[rgba(248,244,235,0.5)]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#8fb277] to-[#3a6959] shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/account" className="flex items-center text-white hover:text-gray-200 transition">
            <FaArrowLeft className="mr-2" />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-xl font-bold text-white">Edit Profile</h1>
          <Link href="/" className="flex items-center text-white hover:text-gray-200 transition">
            <span className="font-medium mr-2">Logout</span>
            <FaSignOutAlt />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Image Section */}
          <div className="bg-gradient-to-br from-[#8fb277] to-[#3a6959] p-8 flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-lg">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <CgProfile className="text-[#3a6959] text-6xl" />
                  </div>
                )}
              </div>
              <label htmlFor="file-upload" className="absolute bottom-0 right-0 bg-[#3a6959] hover:bg-[#2a4d40] p-2 rounded-full text-white cursor-pointer shadow-md transition">
                <FaCamera />
              </label>
              <input id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
            <p className="text-white mt-4 text-sm opacity-80">Tap the camera icon to update your profile picture</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-6">
            {saveStatus === "success" && (
              <div className="mb-4 p-3 bg-[rgba(143,178,119,0.2)] border border-[#8fb277] text-[#3a6959] rounded flex items-center justify-center">
                <span className="font-medium">Profile updated successfully! Redirecting...</span>
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#3a6959] mb-2">
                Full Name
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Enter your full name"
                className="w-full p-3 text-[#3a6959] bg-[#f4f2ec] border border-[#e5e1d8] rounded-lg focus:ring-2 focus:ring-[#8fb277] focus:border-[#8fb277] outline-none transition"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#3a6959] mb-2">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-[#3a6959]/60">@</span>
                <input 
                  type="text" 
                  name="username" 
                  value={formData.username} 
                  onChange={handleChange} 
                  placeholder="username"
                  className="w-full p-3 pl-8 text-[#3a6959] bg-[#f4f2ec] border border-[#e5e1d8] rounded-lg focus:ring-2 focus:ring-[#8fb277] focus:border-[#8fb277] outline-none transition"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#3a6959] mb-2">
                Bio
              </label>
              <textarea 
                name="bio" 
                value={formData.bio} 
                onChange={handleChange} 
                placeholder="Tell us a bit about yourself"
                rows="3"
                className="w-full p-3 text-[#3a6959] bg-[#f4f2ec] border border-[#e5e1d8] rounded-lg focus:ring-2 focus:ring-[#8fb277] focus:border-[#8fb277] outline-none transition resize-none"
              ></textarea>
              <p className="text-xs text-[#3a6959]/70 mt-1">Briefly describe yourself or add your interests</p>
            </div>

            <div className="flex justify-end">
              <button 
                type="submit" 
                className="px-6 py-3 bg-gradient-to-r from-[#8fb277] to-[#3a6959] text-white font-medium rounded-lg hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#8fb277] focus:ring-offset-2 shadow-md transition transform hover:-translate-y-0.5"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}