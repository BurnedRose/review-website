"use client";

import { useEffect, useState } from "react";

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch('/api/review');
      const data = await res.json();

      if (data.success) {
        setReviews(data.reviews);
      } else {
        setStatus('Failed to fetch reviews.');
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">All Reviews</h1>
      {status && <p className="text-red-500 text-center">{status}</p>}
      <div className="space-y-8">
        {reviews.map((review, index) => (
          <div key={index} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              {/* รูปภาพของบล็อก */}
              <img
                src={review.imageUrl}  // ใช้ค่ารูปภาพจาก API
                alt={review.title}
                className="w-full h-60 object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{review.title}</h2>
              <p className="text-sm text-gray-500 mb-2">Category: {review.category}</p>
              <p className="text-sm text-gray-500 mb-4">By {review.author} on {review.postDate}</p>
              <p className="text-gray-700 mb-4">{review.description}</p>
              <a
                href={`/review/${index}`}  // หรือแทนที่ด้วย URL ของหน้ารายละเอียด
                className="text-black font-medium hover:text-gray-700"
              >
                Read more...
              </a>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}
