"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaStar, FaPen, FaList, FaUser, FaCalendarAlt, FaTags, FaCheckCircle, FaTimes
} from "react-icons/fa";

export default function AddReviewPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    date: "",
    rating: 0,
    authorImg: "",
  });

  const [status, setStatus] = useState(null);
  const [statusType, setStatusType] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status && statusType === "error") setStatus(null);
  };

  const handleRatingChange = (rating) => {
    setForm({ ...form, rating });
    if (status && statusType === "error") setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.rating) {
      setStatus("Please provide a rating before submitting.");
      setStatusType("error");
      return;
    }
    setIsSubmitting(true);
    const formDataToSend = {
      ...form,
      authorImg: `https://i.pravatar.cc/150?u=${encodeURIComponent(form.author)}`,
    };

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("Review submitted successfully!");
        setStatusType("success");
        setForm({ title: "", description: "", category: "", author: "", date: "", rating: 0, authorImg: "" });
        setHoverRating(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          setStatus(null);
          router.push("/all_review");
        }, 1500);
      } else {
        setStatus(data.message || "Submission failed. Try again.");
        setStatusType("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("Submission failed. Try again.");
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStarRating = () => (
    <div className="flex items-center space-x-2">
      <span className="text-base text-[#2b5d4a]">Your Rating</span>
      <div className="flex space-x-2 ml-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`text-2xl cursor-pointer ${star <= (hoverRating || form.rating) ? "text-[#fcce07]" : "text-gray-200"} hover:scale-110`}
            onClick={() => handleRatingChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          />
        ))}
      </div>
      {form.rating > 0 && (
        <span className="text-base text-[#2b5d4a] ml-2">{form.rating}/5</span>
      )}
    </div>
  );

  const categories = ["Study", "Environment", "Experience", "Other"];
  const isSubmitDisabled = !form.rating || !form.title || !form.description || !form.author || !form.date || !form.category;
  const inputClasses = "w-full border border-[#c5dbce] rounded px-3 py-2.5 bg-white bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-[#8cb76b] text-[#2b5d4a] placeholder-[#88a696]";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#edf7ef] to-[#e0f0e4] py-10 px-4">
      <div className="max-w-xl mx-auto bg-white bg-opacity-90 rounded-xl shadow p-8 border border-[#d5e8db] relative">

        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-[#8cb76b] hover:text-[#2b5d4a] text-xl"
          aria-label="Cancel and go back"
        >
          <FaTimes />
        </button>

        <h1 className="text-3xl font-bold text-[#2b5d4a] mb-2 flex items-center">
          <FaPen className="mr-2 text-[#8cb76b]" /> Add Review
        </h1>
        <p className="text-[#4d7a5a] mb-6 text-base">Share your experience with us</p>

        {status && (
          <div className={`mb-4 p-4 rounded flex items-center ${statusType === "success" ? "bg-[#e0f0e4] text-[#2b5d4a] border border-[#a3d2b6]" : "bg-[#f9e8e8] text-[#9a3f3f] border border-[#f5c1c1]"}`}>
            {statusType === "success" ? <FaCheckCircle className="mr-2 text-[#4d7a5a]" /> : <div className="mr-2">⚠️</div>}
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStarRating()}

          <div className="bg-[#f0f8f2] bg-opacity-75 p-5 rounded border border-[#d5e8db]">
            <h2 className="font-medium text-[#2b5d4a] text-base mb-4">Review Info</h2>
            <div className="mb-4">
              <label className="text-sm font-medium text-[#2b5d4a] flex items-center mb-2">
                <FaList className="mr-2 text-[#8cb76b]" /> Title
              </label>
              <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Review title" className={inputClasses} required />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-[#2b5d4a] flex items-center mb-2">
                <FaTags className="mr-2 text-[#8cb76b]" /> Category
              </label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClasses} required>
                <option value="">Choose category</option>
                {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
              </select>
            </div>
          </div>

          <div className="bg-[#f0f8f2] bg-opacity-75 p-5 rounded border border-[#d5e8db]">
            <h2 className="font-medium text-[#2b5d4a] text-base mb-4">Details</h2>
            <div className="mb-4">
              <label className="text-sm font-medium text-[#2b5d4a] mb-2 block">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Write your review..." rows="5" className={inputClasses} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#2b5d4a] flex items-center mb-2">
                  <FaUser className="mr-2 text-[#8cb76b]" /> Author
                </label>
                <input type="text" name="author" value={form.author} onChange={handleChange} placeholder="Your name" className={inputClasses} required />
              </div>
              <div>
                <label className="text-sm font-medium text-[#2b5d4a] flex items-center mb-2">
                  <FaCalendarAlt className="mr-2 text-[#8cb76b]" /> Date
                </label>
                <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClasses} required />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-[#2b5d4a] to-[#357a56] text-white px-6 py-3 rounded hover:from-[#20493a] hover:to-[#2a6042] font-semibold shadow ${isSubmitDisabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-md"} flex justify-center items-center space-x-2`}
            disabled={isSubmitDisabled || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
