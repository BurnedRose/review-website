"use client";

import { useEffect, useState } from "react";
import { FaSearch, FaCog, FaTag, FaUser, FaCalendarAlt, FaTimes, FaStar } from "react-icons/fa";
import { TbChartBarPopular } from "react-icons/tb";
import { MdUpdate } from "react-icons/md";
import Header from './header';

export default function AllReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeInsightFilter, setActiveInsightFilter] = useState("");

  const categories = [...new Set(reviews.map(review => review.category))];

  const filteredReviews = reviews.filter(review =>
    review.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === "" || review.category === filterCategory)
  );

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/review");
        const data = await res.json();
        if (data.success) {
          setReviews(data.reviews);
        } else {
          console.error("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0 && !reviews[0].rating) {
      const reviewsWithRatings = reviews.map(review => ({
        ...review,
        rating: Math.floor(Math.random() * 5) + 1
      }));
      setReviews(reviewsWithRatings);
    }
  }, [reviews]);

  function getRandomRating() {
    return Math.floor(Math.random() * 5) + 1;
  }

  function renderStars(count) {
    return (
      <div className="flex space-x-1">  {/* เพิ่ม flex และ space-x-1 เพื่อจัดให้ดาวอยู่ในแนวนอน */}
        {Array(5).fill(0).map((_, i) => (
          <FaStar key={i} className={`text-lg ${i < count ? "text-[#fcce07]" : "text-[#e5e1d8]"}`} />
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

  const getHighestRatedReviews = () => {
    setSearchTerm("");
    setActiveInsightFilter("highest-rated");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPopularCategories = () => {
    setSearchTerm("");
    setFilterCategory("");
    setActiveInsightFilter("popular-categories");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getLatestReviews = () => {
    setSearchTerm("");
    setFilterCategory("");
    setActiveInsightFilter("latest-reviews");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ReviewModal = () => {
    if (!selectedReview) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-[#f8f4eb] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
          <div className="bg-[#2b5d4a] text-[#f8f4eb] rounded-t-lg p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedReview.title}</h2>
              <button onClick={closeModal} className="text-[#f8f4eb] hover:text-[#eab54e]">
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="flex mb-4">{renderStars(selectedReview.rating || getRandomRating())}</div>
            <div className="text-[#2d2d2d] mb-6">
              <p className="whitespace-pre-line">{selectedReview.description}</p>
            </div>
            <div className="border-t border-[#e5e1d8] pt-4 text-sm text-[#4a4a4a] flex flex-wrap gap-4">
              <div className="flex items-center"><FaTag className="mr-2 text-[#7ea566]" />{selectedReview.category}</div>
              <div className="flex items-center"><FaUser className="mr-2 text-[#7ea566]" />{selectedReview.author}</div>
              {selectedReview.postDate && (
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-[#7ea566]" />
                  {new Date(selectedReview.postDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
          <div className="bg-[#e5e1d8] bg-opacity-40 px-6 py-4 rounded-b-lg">
            <button onClick={closeModal} className="w-full py-3 px-4 bg-[#7ea566] text-white rounded-md hover:bg-[#568f3e] font-medium">
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  let insightFilteredReviews = filteredReviews;
  if (activeInsightFilter === "highest-rated") {
    insightFilteredReviews = [...filteredReviews].sort((a, b) => (b.rating || getRandomRating()) - (a.rating || getRandomRating()));
  } else if (activeInsightFilter === "latest-reviews") {
    insightFilteredReviews = [...filteredReviews].sort((a, b) => new Date(b.postDate || 0) - new Date(a.postDate || 0));
  }

  const categoryCounts = reviews.reduce((acc, review) => {
    acc[review.category] = (acc[review.category] || 0) + 1;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([category]) => category);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f8f4eb]">
        <div className="max-w-6xl mx-auto p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-[#2b5d4a] text-center mb-2">All-Reviews</h1>
            <p className="text-[#4a4a4a]">
              {activeInsightFilter === "highest-rated" && "Showing highest rated reviews from our community"}
              {activeInsightFilter === "popular-categories" && "Showing reviews from popular categories"}
              {activeInsightFilter === "latest-reviews" && "Showing the latest reviews from our community"}
            </p>
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
                <FaCog className="text-[#f8f4eb]" />
              </div>
              <select
                className="pl-10 pr-4 py-3 w-full border border-[#2b5d4a] rounded-lg bg-[#2b5d4a] text-[#f8f4eb] focus:ring-2 focus:ring-[#7ea566] focus:border-[#7ea566]"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category, idx) => (
                  <option key={idx} value={category}>{category}</option>
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
            <>
              <p className="text-[#4a4a4a] mb-4">{insightFilteredReviews.length} reviews found</p>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {insightFilteredReviews.map((review, index) => {
                  const maxLength = 100;
                  const shortDesc = review.description?.length > maxLength
                    ? `${review.description.substring(0, maxLength)}...`
                    : review.description;
                  return (
                    <div
                      key={index}
                      className="border border-[#e5e1d8] rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => openReviewModal(review)}
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h2 className="text-xl font-semibold text-[#2b5d4a]">{review.title}</h2>
                          <div>{renderStars(review.rating || getRandomRating())}</div>
                        </div>
                        <p className="text-[#2d2d2d] mb-2">{shortDesc}</p>
                        <span className="text-[#7ea566] hover:text-[#568f3e] font-medium">Read more</span>
                        <div className="border-t border-[#e5e1d8] pt-4 mt-2 text-sm text-[#4a4a4a] flex flex-wrap gap-3">
                          <div className="flex items-center"><FaTag className="mr-2 text-[#7ea566]" />{review.category}</div>
                          <div className="flex items-center"><FaUser className="mr-2 text-[#7ea566]" />{review.author}</div>
                          {review.postDate && (
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-2 text-[#7ea566]" />
                              {new Date(review.postDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Insights Section */}
        <div className="bg-[#2b5d4a] bg-opacity-5 py-8 mt-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-[#2b5d4a] mb-6">Review Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InsightCard icon={<FaStar className="text-[#fcce07] text-xl" />} title="Highest Rated" onClick={getHighestRatedReviews} />
              <InsightCard
                icon={<TbChartBarPopular className="text-[#fcce07] text-2xl" />}
                title="Popular Categories"
                onClick={getPopularCategories}
                extraContent={
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {topCategories.map((cat, idx) => (
                      <span
                        key={idx}
                        className="bg-[#e5e1d8] px-2 py-1 rounded-full text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFilterCategory(cat);
                          setActiveInsightFilter("");
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                }
              />
              <InsightCard icon={<MdUpdate className="text-[#fcce07] text-2xl" />} title="Latest Reviews" onClick={getLatestReviews} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <ReviewModal />}
    </>
  );
}

function InsightCard({ icon, title, onClick, extraContent }) {
  return (
    <div
      className="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-105 hover:shadow-md"
      onClick={onClick}
    >
      <div className="bg-[#7ea566] bg-opacity-10 p-3 rounded-full mb-3">{icon}</div>
      <h3 className="font-semibold text-[#2b5d4a] mb-1">{title}</h3>
      {title === "Highest Rated" && <p className="text-[#4a4a4a] text-sm">Products with exceptional reviews</p>}
      {title === "Latest Reviews" && <p className="text-[#4a4a4a] text-sm">Stay updated with recent feedback</p>}
      {title === "Popular Categories" && (
        <div className="text-[#4a4a4a] text-sm">
          <p className="mb-2">Trending categories this month</p>
          {extraContent}
        </div>
      )}
    </div>
  );
}
