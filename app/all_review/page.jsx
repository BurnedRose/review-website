"use client";

import { useEffect, useState } from "react";
import { FaSearch, FaTag, FaUser, FaCalendarAlt, FaTimes, FaStar } from "react-icons/fa";
import Header from './header';

export default function AllReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const uniqueCategories = [...new Set(categories.map(cat => cat.category))];

  // ฟังก์ชันสำหรับดึงข้อมูลรีวิวทั้งหมด
  const fetchAllReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/reviews/all_review");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching all reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันสำหรับดึงข้อมูลรีวิวที่กรองตาม searchTerm และ filterCategory
  const fetchFilteredReviews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("searchTerm", searchTerm);
      if (filterCategory) params.append("category", filterCategory);
      
      const response = await fetch(`http://localhost:8080/api/reviews/filtered?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching filtered reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/reviews/categories");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchAllReviews();  // ดึงข้อมูลรีวิวทั้งหมดเมื่อหน้าโหลด
  }, []);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchFilteredReviews();  // ดึงข้อมูลรีวิวที่กรองตามเงื่อนไข searchTerm และ filterCategory
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchTerm, filterCategory]);
  function renderStars(count, reviewId) {
    return (
      <div className="flex space-x-1">
        {Array(5).fill(0).map((_, i) => (
          <FaStar 
            key={`star-${reviewId}-${i}`} 
            className={`text-lg ${i < count ? "text-[#fcce07]" : "text-[#e5e1d8]"}`}
          />
        ))}
      </div>
    );
  }

  const openReviewModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
    document.body.style.overflow = 'auto';
  };

  const ReviewModal = () => {
    if (!selectedReview) return null;

    return (
      <div className="fixed inset-0 bg-[rgba(248,244,235,0.7)] flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="bg-[#2b5d4a] text-[#f8f4eb] rounded-t-lg p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedReview.title}</h2>
              <button onClick={closeModal} className="text-[#f8f4eb] hover:text-[#eab54e]">
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <p className="text-[#4a4a4a] mb-2">Your rating:</p>
              {renderStars(selectedReview.rating || 0, selectedReview._id)}
            </div>
            <div className="text-[#2d2d2d] mb-6">
              <p className="whitespace-pre-line">{selectedReview.description}</p>
            </div>
            <div className="border-t border-[#e5e1d8] pt-4 text-sm text-[#4a4a4a] flex flex-wrap gap-4">
              <div className="flex items-center"><FaTag className="mr-2 text-[#7ea566]" />{selectedReview.category}</div>
              <div className="flex items-center"><FaUser className="mr-2 text-[#7ea566]" />{selectedReview.author}</div>
              {selectedReview.date && (
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-[#7ea566]" />
                  {new Date(selectedReview.date).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
          <div className="bg-white bg-opacity-40 px-6 py-4 rounded-b-lg">
            <button onClick={closeModal} className="w-full py-3 px-4 bg-[#7ea566] text-white rounded-md hover:bg-[#568f3e] font-medium">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const insightFilteredReviews = reviews;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f8f4eb]">
        <div className="max-w-6xl mx-auto p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-[#2b5d4a] text-center mb-2">All Reviews</h1>
            <p className="text-[#4a4a4a]">{insightFilteredReviews.length} reviews found</p>
          </header>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                <FaSearch className="text-[#a8a195]" />
              </div>
              <input
                type="text"
                placeholder="Search reviews..."
                className="pl-10 pr-4 py-3 w-full border-2 border-[#e5e1d8] rounded-lg bg-white text-[#2d2d2d] focus:ring-2 focus:ring-[#7ea566] focus:border-[#7ea566] outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaTag className="text-[#f8f4eb]" />
              </div>
              <select
                className="pl-10 pr-10 py-3 w-full h-12 text-base rounded-lg bg-[#2b5d4a] text-[#f8f4eb] 
                border border-[#2b5d4a] hover:border-[#7ea566] focus:ring-2 focus:ring-[#7ea566] focus:outline-none
                transition duration-150 appearance-none"
                value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
                aria-label="Filter by category"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((category) => (
                <option key={`category-${category}`} value={category}>
                {category}
                </option>
                ))}
              </select>
            </div>
          </div>

          {/* Loading & Results */}
          {loading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="animate-spin mb-4 h-10 w-10 border-4 border-[#7ea566] rounded-full border-t-transparent"></div>
              <p className="text-[#4a4a4a]">Loading reviews...</p>
            </div>
          ) : insightFilteredReviews.length === 0 ? (
            <div className="bg-white border border-[#e5e1d8] rounded-lg p-8 text-center shadow-sm">
              <div className="text-4xl text-[#a8a195] mb-4">
                <FaTag className="mx-auto h-10 w-10" />
              </div>
              <h3 className="text-xl font-medium text-[#2b5d4a] mb-2">No reviews found</h3>
              <p className="text-[#4a4a4a]">
                {searchTerm || filterCategory ? "Try adjusting your search or filter criteria." : "Be the first to leave a review!"}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {insightFilteredReviews.map((review) => {
                const maxLength = 100;
                const shortDesc = review.description?.length > maxLength
                  ? `${review.description.substring(0, maxLength)}...`
                  : review.description;
                return (
                  <div
                    key={review._id || `review-${review.title}-${review.author}`}
                    className="border border-[#e5e1d8] rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openReviewModal(review)}
                  >
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h2 className="text-xl font-semibold text-[#2b5d4a]">{review.title}</h2>
                        <div>{renderStars(review.rating || 0, review._id)}</div>
                      </div>
                      <p className="text-[#2d2d2d] mb-2">{shortDesc}</p>
                      <span className="text-[#7ea566] hover:text-[#568f3e] font-medium">Read more</span>
                      <div className="border-t border-[#e5e1d8] pt-4 mt-2 text-sm text-[#4a4a4a] flex flex-wrap gap-3">
                        <div className="flex items-center"><FaTag className="mr-2 text-[#7ea566]" />{review.category}</div>
                        <div className="flex items-center"><FaUser className="mr-2 text-[#7ea566]" />{review.author}</div>
                        {review.date && (
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-[#7ea566]" />
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <ReviewModal />}
    </>
  );
}
