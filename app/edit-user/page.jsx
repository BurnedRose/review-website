"use client";

import { useEffect, useState } from "react";
import { FaArrowLeft, FaSignOutAlt, FaCamera } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditProfilePage() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    profileImageUrl: "",
  });
  const [saveStatus, setSaveStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ตรวจสอบขนาดและชนิดของไฟล์
    if (file.size > 5 * 1024 * 1024) { // ขนาดไฟล์เกิน 5MB
      setUploadError("The image file is too large. Max size is 5MB.");
      return;
    }

    const fileExtension = file.type.split("/")[1];
    if (!["jpeg", "jpg", "png"].includes(fileExtension)) {
      setUploadError("Invalid file type. Please upload a JPEG, PNG, or JPG image.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    const formDataData = new FormData();
    formDataData.append("file", file);
    formDataData.append("upload_preset", "Editprofile");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dwtkj3ziy/upload", {
        method: "POST",
        body: formDataData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error uploading image:", errorText);
        setUploadError("Failed to upload image. Please try again.");
        throw new Error("Image upload failed");
      }

      const data = await res.json();
      const cloudinaryImageUrl = data.secure_url;

      setProfileImage(cloudinaryImageUrl);
      localStorage.setItem("profileImage", cloudinaryImageUrl); // เก็บ URL รูปใน localStorage
      return cloudinaryImageUrl;
    } catch (error) {
      console.error("Image upload failed:", error.message);
      setUploadError("Failed to upload image. Please try again.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const saveProfile = async (imageUrl) => {
    try {
      setSaveStatus("saving");

      const finalImageUrl = imageUrl || profileImage; // ถ้าไม่อัปโหลดรูปใหม่ จะใช้รูปเดิมจาก localStorage

      // ส่งข้อมูลไปยัง API
      const response = await fetch("http://localhost:8080/api/upload-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          bio: formData.bio,
          profileImageUrl: finalImageUrl, // ส่ง URL ของรูปที่อัปโหลด
        }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();

        if (result.success) {
          setSaveStatus("success");
          localStorage.setItem("profileName", formData.name);
          localStorage.setItem("profileUsername", formData.username);
          localStorage.setItem("profileBio", formData.bio);
          localStorage.setItem("profileImage", finalImageUrl); // เก็บ URL รูปใน localStorage
          
          setTimeout(() => {
            router.push("/af-user");
          }, 1500);
          return;
        } else {
          throw new Error(result.message || "Unknown error");
        }
      } else {
        throw new Error("Server didn't return JSON. API endpoint might not exist.");
      }
    } catch (error) {
      setSaveStatus("error");
      console.error("Error saving profile data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim()) {
      setSaveStatus("error-name");
      return;
    }

    if (!formData.username.trim()) {
      setSaveStatus("error-username");
      return;
    }

    try {
      const imageUrl = profileImage;
      saveProfile(imageUrl);
    } catch (error) {
      setSaveStatus("error");
      console.error("Error saving profile:", error);
    }
  };

  const getSaveStatusMessage = () => {
    switch (saveStatus) {
      case "success":
        return {
          message: "Profile updated successfully! Redirecting...",
          className: "bg-[rgba(143,178,119,0.2)] border border-[#8fb277] text-[#3a6959]",
        };
      case "success-local":
        return {
          message: "Profile saved locally! Redirecting...",
          className: "bg-[rgba(143,178,119,0.2)] border border-[#8fb277] text-[#3a6959]",
        };
      case "saving":
        return {
          message: "Saving your profile...",
          className: "bg-[rgba(143,178,119,0.2)] border border-[#8fb277] text-[#3a6959]",
        };
      case "error":
        return {
          message: "Failed to update profile. Please try again.",
          className: "bg-[rgba(255,0,0,0.1)] border border-red-300 text-red-700",
        };
      case "error-name":
        return {
          message: "Please enter your name.",
          className: "bg-[rgba(255,0,0,0.1)] border border-red-300 text-red-700",
        };
      case "error-username":
        return {
          message: "Please enter a username.",
          className: "bg-[rgba(255,0,0,0.1)] border border-red-300 text-red-700",
        };
      case "upload-error":
        return {
          message: uploadError,
          className: "bg-[rgba(255,0,0,0.1)] border border-red-300 text-red-700",
        };
      default:
        return null;
    }
  };

  const statusMessage = getSaveStatusMessage();

  return (
    <div className="min-h-screen bg-[rgba(248,244,235,0.5)]">
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

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
              <label htmlFor="file-upload" className={`absolute bottom-0 right-0 bg-[#3a6959] hover:bg-[#2a4d40] p-2 rounded-full text-white cursor-pointer shadow-md transition ${isUploading ? 'opacity-50' : ''}`}>
                {isUploading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FaCamera />
                )}
              </label>
              <input 
                id="file-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="hidden" 
                disabled={isUploading}
              />
            </div>
            <p className="text-white mt-4 text-sm opacity-80">Tap the camera icon to update your profile picture</p>
            {uploadError && (
              <p className="text-red-100 mt-2 text-sm bg-red-500 px-3 py-1 rounded-full">{uploadError}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {statusMessage && (
              <div className={`mb-4 p-3 ${statusMessage.className} rounded flex items-center justify-center`}>
                <span className="font-medium">{statusMessage.message}</span>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#3a6959] mb-2">Full Name</label>
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
              <label className="block text-sm font-medium text-[#3a6959] mb-2">Username</label>
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
              <label className="block text-sm font-medium text-[#3a6959] mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                className="w-full p-3 text-[#3a6959] bg-[#f4f2ec] border border-[#e5e1d8] rounded-lg focus:ring-2 focus:ring-[#8fb277] focus:border-[#8fb277] outline-none transition"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-3/4 px-4 py-3 bg-[#3a6959] text-white rounded-lg font-semibold hover:bg-[#2a4d40] focus:ring-2 focus:ring-[#8fb277] transition"
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
