"use client";
import { useEffect, useState } from "react";

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/review');
        const data = await res.json();
        
        if (data.success) {
          setReviews(data.reviews);
        } else {
          setStatus('Failed to fetch reviews.');
        }
      } catch (error) {
        setStatus('An error occurred while fetching reviews.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-10 w-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 w-full bg-gray-200 rounded-lg max-w-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">All Reviews</h1>
      <p className="text-center text-gray-600 mb-12">Discover our latest reviews and recommendations</p>
      
      {status && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded">
          <p className="text-red-700">{status}</p>
        </div>
      )}
      
      {reviews.length === 0 && !status ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No reviews found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="relative overflow-hidden">
                <img
                  src={review.imageUrl || "/api/placeholder/400/320"}
                  alt={review.title}
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-0 right-0 bg-black bg-opacity-70 text-white text-xs font-medium px-2 py-1 m-2 rounded">
                  {review.category}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{review.title}</h2>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{review.author}</span>
                  <span className="mx-2">•</span>
                  <span>{review.postDate}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{review.description}</p>
                <a
                  href={`/review/${review._id || index}`}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300 mt-auto"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {reviews.length > 0 && (
        <div className="mt-12 text-center">
          <button className="px-6 py-3 bg-white text-gray-800 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-300">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
}