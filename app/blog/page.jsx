"use client";
import { useEffect, useState, useCallback } from "react";
import { 
  FaSearch, FaTag, FaTimes, FaStar, 
  FaSort, FaEye, FaThumbsUp, FaChartBar,
} from "react-icons/fa";
import Header from '../all_review/header';

export default function BlogPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("highest");
  const [starFilter, setStarFilter] = useState(0);
  const [filteredReviews, setFilteredReviews] = useState([]);
  // Add pagination state
  const [visibleCount, setVisibleCount] = useState(9);

  // Filter and sort reviews
  const getFilteredAndSortedReviews = useCallback(() => {
    // Filter by search term and exact star rating
    let results = reviews.filter(review =>
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (starFilter === 0 || review.rating === starFilter)
    );
    
    // Sort results
    let sortedResults = [...results];
    
    if (sortOption === "highest") {
      sortedResults.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortOption === "lowest") {
      sortedResults.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    } else if (sortOption === "most_liked") {
      sortedResults.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else if (sortOption === "most_viewed") {
      sortedResults.sort((a, b) => (b.views || 0) - (a.views || 0));
    }
    
    return sortedResults;
  }, [reviews, searchTerm, starFilter, sortOption]);

  // Update filtered reviews when dependencies change
  useEffect(() => {
    setFilteredReviews(getFilteredAndSortedReviews());
    // Reset visible count when filters change
    setVisibleCount(9);
  }, [reviews, searchTerm, starFilter, sortOption, getFilteredAndSortedReviews]);

  // Calculate rating distribution for chart
  const getRatingDistribution = useCallback(() => {
    const distribution = [0, 0, 0, 0, 0]; // 5 stars
    
    reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating - 1]++;
      }
    });
    
    return distribution;
  }, [reviews]);
  
  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews.length;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/review");
        const data = await res.json();
        if (data.success) {
          const reviewsWithProcessedData = data.reviews.map(review => {
            return {
              ...review,
              views: review.views || 0,
              likes: review.likes || 0,
              // Process the MongoDB fields directly
              // Using authorImg for the profile image as per your MongoDB schema
            };
          });
          
          setReviews(reviewsWithProcessedData);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);

  // Handler for changing sort option
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Handle load more button click
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 9);
  };

  function renderStars(count) {
    return (
      <div className="flex space-x-1">
        {Array(5).fill(0).map((_, i) => (
          <FaStar 
            key={i} 
            className={`${i < count ? "text-[#fcce07]" : "text-[#e5e1d8]"} ${
              window.innerWidth <= 640 ? "text-sm" : "text-lg"
            }`}
          />
        ))}
      </div>
    );
  }

  const openReviewModal = (review) => {
    // Increment view count when opening a review
    const updatedReviews = reviews.map(r => 
      r._id === review._id ? { ...r, views: (r.views || 0) + 1 } : r
    );
    setReviews(updatedReviews);
    
    setSelectedReview({...review, views: (review.views || 0) + 1});
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
    document.body.style.overflow = 'auto';
  };

  const handleLikeReview = (reviewId, event) => {
    event.stopPropagation();
    
    const updatedReviews = reviews.map(review =>
      review._id === reviewId ? { ...review, likes: (review.likes || 0) + 1 } : review
    );
    
    setReviews(updatedReviews);
    
    if (selectedReview && selectedReview._id === reviewId) {
      setSelectedReview({...selectedReview, likes: (selectedReview.likes || 0) + 1});
    }
  };

  const getRandomProfileColor = (authorName) => {
    const colors = ['#2b5d4a', '#7ea566', '#eab54e', '#e07a5f', '#8a5a83'];
    const hash = authorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const ProfileAvatar = ({ review, size = "md" }) => {
    const author = review?.author || "?";
    const profileImage = review?.authorImg || null;
  
    const [imageError, setImageError] = useState(false);
  
    const bgColor = getRandomProfileColor(author);
    const initials = author?.charAt(0) || "?";
  
    const sizeClass = {
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg",
    }[size];
  
    const handleError = () => {
      setImageError(true);
    };
  
    if (profileImage && !imageError) {
      return (
        <div className={`${sizeClass} rounded-full overflow-hidden flex-shrink-0`}>
          <img
            src={profileImage}
            alt={`${author}'s profile`}
            className="w-full h-full object-cover"
            onError={handleError}
          />
        </div>
      );
    }
  
    return (
      <div
        className={`${sizeClass} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
        style={{ backgroundColor: bgColor }}
      >
        {initials.toUpperCase()}
      </div>
    );
  };


  const ReviewModal = () => {
    if (!selectedReview || !isModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-[rgba(248,244,235,0.7)] flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white   rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl my-8">
          <div className="sticky top-0 bg-[#2b5d4a] text-[#f8f4eb] rounded-t-lg p-4 z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl md:text-2xl font-bold truncate">{selectedReview.title}</h2>
              <button onClick={closeModal} className="text-[#f8f4eb] hover:text-[#eab54e] p-1">
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-4 md:p-6">
            {/* Author info with avatar - passing the whole review object */}
            <div className="flex items-center mb-4">
              <ProfileAvatar review={selectedReview} size="lg" />
              <div className="ml-3">
                <p className="font-medium text-[#2b5d4a]">{selectedReview.author}</p>
                {selectedReview.date && (
                  <p className="text-sm text-[#4a4a4a]">
                    {new Date(selectedReview.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <p className="text-[#4a4a4a] mb-2">Rating:</p>
                <span className="text-lg font-medium text-[#2b5d4a]">
                  {selectedReview.rating}/5
                </span>
              </div>
              {renderStars(selectedReview.rating || 0)}
            </div>
            
            <div className="text-[#2d2d2d] mb-6">
              <p className="whitespace-pre-line">{selectedReview.description}</p>
            </div>
            
            {/* Engagement stats */}
            <div className="bg-white p-3 rounded-lg mb-4">
              <h3 className="text-sm font-medium text-[#2b5d4a] mb-2">Engagement</h3>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <FaEye className="text-[#7ea566] mr-2" />
                  <span className="text-[#4a4a4a]">{selectedReview.views || 0} views</span>
                </div>
                <div className="flex items-center">
                  <FaThumbsUp className="text-[#7ea566] mr-2" />
                  <span className="text-[#4a4a4a]">{selectedReview.likes || 0} likes</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-[#e5e1d8] pt-4 text-sm text-[#4a4a4a]">
              <div className="flex items-center mb-2">
                <FaTag className="mr-2 text-[#7ea566]" />
                <span>{selectedReview.category}</span>
              </div>
            </div>
          </div>
          
          <div className="sticky bottom-0 bg-white bg-opacity-40 px-4 md:px-6 py-4 rounded-b-lg shadow-inner">
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={(e) => handleLikeReview(selectedReview._id, e)}
                className="py-2 px-3 bg-[#7ea566] text-white rounded-md hover:bg-[#568f3e] font-medium flex items-center justify-center"
              >
                <FaThumbsUp className="mr-2" /> Like
              </button>
              <button 
                onClick={closeModal} 
                className="py-2 px-3 bg-[#2b5d4a] text-white rounded-md hover:bg-[#1a4535] font-medium flex items-center justify-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#f8f4eb] relative" >
      
        <div className="max-w-6xl mx-auto px-4 py-6 md:p-6">
          <header className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-[#2b5d4a] text-center mb-2">All Reviews</h1>
            <p className="text-[#4a4a4a] text-center">{filteredReviews.length} reviews found</p>
          </header>

          {/* Horizontal Rating Distribution Chart */}
          <div className="mb-6 md:mb-8 bg-white border border-[#e5e1d8] rounded-lg p-4 md:p-5 shadow-sm">
            <h2 className="text-lg md:text-xl font-semibold text-[#2b5d4a] mb-4 flex items-center">
              <FaChartBar className="mr-2" /> Rating Distribution
            </h2>
            
            <div className="space-y-3 mb-2">
              {ratingDistribution.slice().reverse().map((count, reverseIndex) => {
                const index = 4 - reverseIndex; // Convert back to 0-4 index (5 star to 1 star)
                const starNumber = index + 1; // Actual star value (1-5)
                const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                
                return (
                  <div key={index} className="flex items-center">
                    <div className="flex items-center w-16 mr-3">
                      <span className="mr-1">{starNumber}</span>
                      <FaStar className="text-[#fcce07]" />
                    </div>
                    
                    <div className="flex-1 h-5 bg-[#e5e1d8] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#7ea566] rounded-full relative"
                        style={{ width: `${percentage}%` }}
                      >
                      </div>
                    </div>
                    
                    <div className="ml-3 w-16 text-right">
                      <span className="text-sm text-[#4a4a4a]">{count} ({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-xs text-center text-[#4a4a4a]">
              Showing distribution of {totalReviews} total reviews
            </div>
          </div>

          {/* Search & Sort Controls */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Search input */}
              <div className="relative md:col-span-2">
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

              {/* Sort dropdown - removed latest/oldest options */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSort className="text-[#f8f4eb]" />
                </div>
                <select
                  className="pl-10 pr-10 py-3 w-full h-12 text-base rounded-lg bg-[#2b5d4a] text-[#f8f4eb] 
                  border border-[#2b5d4a] hover:border-[#7ea566]
                  focus:ring-2 focus:ring-[#7ea566] focus:outline-none
                  transition duration-150 appearance-none"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                  <option value="most_liked">Most Liked</option>
                  <option value="most_viewed">Most Viewed</option>
                </select>
              </div>
            </div>

            {/* Star Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#4a4a4a] mb-2">Filter by Stars</label>
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`px-4 py-2 rounded-md border transition-colors ${
                    starFilter === 0 
                      ? 'bg-[#2b5d4a] text-white border-[#2b5d4a]' 
                      : 'bg-white text-[#2b5d4a] border-[#e5e1d8] hover:border-[#7ea566]'
                  }`}
                  onClick={() => setStarFilter(0)}
                >
                  All
                </button>
                {[1, 2, 3, 4, 5].map(stars => (
                  <button
                    key={stars}
                    className={`px-4 py-2 rounded-md border flex items-center transition-colors ${
                      starFilter === stars 
                        ? 'bg-[#7ea566] text-white border-[#7ea566]' 
                        : 'bg-white text-[#2b5d4a] border-[#e5e1d8] hover:border-[#7ea566]'
                    }`}
                    onClick={() => setStarFilter(stars)}
                  >
                    {stars} <FaStar className="text-[#fcce07] ml-1" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading & Results */}
          {loading ? (
            <div className="flex flex-col items-center justify-center p-8 md:p-12">
              <div className="animate-spin mb-4 h-10 w-10 border-4 border-[#7ea566] rounded-full border-t-transparent"></div>
              <p className="text-[#4a4a4a]">Loading reviews...</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="bg-white border border-[#e5e1d8] rounded-lg p-6 md:p-8 text-center shadow-sm">
              <div className="text-4xl text-[#a8a195] mb-4">
                <FaSearch className="mx-auto h-8 w-8 md:h-10 md:w-10" />
              </div>
              <h3 className="text-xl font-medium text-[#2b5d4a] mb-2">No reviews found</h3>
              <p className="text-[#4a4a4a]">
                {searchTerm || starFilter > 0 ? 
                  "Try adjusting your search or filter criteria." : 
                  "Be the first to leave a review!"}
              </p>
              <button 
                className="mt-4 px-4 py-2 bg-[#7ea566] text-white rounded-md hover:bg-[#568f3e]"
                onClick={() => {
                  setSearchTerm("");
                  setStarFilter(0);
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {/* Only show the number of reviews based on visibleCount */}
              {filteredReviews.slice(0, visibleCount).map((review) => {
                const maxLength = 100;
                const shortDesc = review.description?.length > maxLength
                  ? `${review.description.substring(0, maxLength)}...`
                  : review.description;
                return (
                  <div
                    key={review._id}
                    className="border border-[#e5e1d8] rounded-lg shadow-sm bg-white hover:shadow-md transition-all group cursor-pointer"
                    onClick={() => openReviewModal(review)}
                  >
                    <div className="p-4">
                      {/* Review header with author avatar - passing the whole review object */}
                      <div className="flex items-center mb-3">
                        <ProfileAvatar review={review} size="sm" />
                        <div className="ml-2 flex-1 min-w-0">
                          <p className="font-medium text-[#2b5d4a] truncate">{review.author}</p>
                          {review.date && (
                            <p className="text-xs text-[#4a4a4a]">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-col mb-3">
                        <h2 className="text-lg font-semibold text-[#2b5d4a] group-hover:text-[#7ea566] transition-colors mb-1 line-clamp-2">{review.title}</h2>
                        <div className="flex items-center">
                          {renderStars(review.rating || 0)}
                          <span className="ml-2 text-sm text-[#4a4a4a]">{review.rating}/5</span>
                        </div>
                      </div>
                      
                      <p className="text-[#2d2d2d] mb-2 text-sm line-clamp-3">{shortDesc}</p>
                      <span className="text-[#7ea566] hover:text-[#568f3e] font-medium text-sm inline-block mb-2">Read more</span>
                      
                      {/* Engagement stats */}
                      <div className="flex justify-between items-center border-t border-[#e5e1d8] pt-3">
                        <div className="flex space-x-4 text-xs">
                          <span className="flex items-center"><FaEye className="mr-1 text-[#7ea566]" />{review.views || 0}</span>
                          <span className="flex items-center"><FaThumbsUp className="mr-1 text-[#7ea566]" />{review.likes || 0}</span>
                        </div>
                        <button 
                          onClick={(e) => handleLikeReview(review._id, e)}
                          className="text-xs px-2 py-1 bg-[#7ea566] bg-opacity-10 text-[#7ea566] rounded hover:bg-opacity-20 transition-colors"
                        >
                          Like
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Pagination - Only show when needed */}
          {filteredReviews.length > 0 && visibleCount < filteredReviews.length && (
            <div className="mt-8 flex justify-center">
              <button 
                className="px-4 py-2 bg-[#2b5d4a] text-white rounded-md hover:bg-[#1a4535]"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && <ReviewModal />}
    </>
  );
}