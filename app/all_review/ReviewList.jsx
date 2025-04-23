import React, { useState, useEffect } from "react";

export default function ReviewListPage() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // โหลดข้อมูลรีวิวจาก API
    const fetchReviews = async () => {
      const res = await fetch("/api/review"); // ใช้ /api/review เพื่อดึงข้อมูล
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      } else {
        setStatus("Failed to load reviews");
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch("/api/review", {
      method: "DELETE", // ใช้ HTTP method DELETE
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // ส่ง id ของรีวิวที่ต้องการลบ
    });

    const data = await res.json();
    if (data.success) {
      setReviews(reviews.filter(review => review._id !== id)); // ลบรีวิวจาก state
      setStatus("Review deleted successfully!");
    } else {
      setStatus("Failed to delete review.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      {status && <p className="mb-4">{status}</p>}
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review._id} className="border p-4">
            <h2 className="text-xl font-semibold">{review.title}</h2>
            <p>{review.description}</p>
            <button
              onClick={() => handleDelete(review._id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
