'use client'
import { useEffect, useState } from 'react'

export default function LikePage() {
  const [liked, setLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0)
  const [userId, setUserId] = useState(null)

  const reviewId = '6802c2fb74286bd3b888427e' // เปลี่ยนเป็นไอดีของรีวิวที่ต้องการ

  useEffect(() => {
    // ดึง userId จาก localStorage ตอน component โหลด
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) {
      setUserId(storedUserId)
    }

    fetchLikes()
  }, [])

  const handleLike = async () => {
    if (!userId) {
      alert('Please login first.')
      return
    }

    try {
      const res = await fetch(`/api/review/${reviewId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      })

      const data = await res.json()
      if (data.success) {
        setLiked(data.liked)
        setTotalLikes(data.totalLikes)
      }
    } catch (err) {
      console.error('Error toggling like:', err)
    }
  }

  const fetchLikes = async () => {
    try {
      const res = await fetch(`/api/review/${reviewId}/like-count`)
      const data = await res.json()
      setTotalLikes(data.totalLikes)
    } catch (err) {
      console.error('Error fetching like count:', err)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Like Page</h1>
      <button
        className={`px-4 py-2 rounded ${
          liked ? 'bg-red-500 text-white' : 'bg-gray-200'
        }`}
        onClick={handleLike}
      >
        {liked ? 'Unlike ❤️' : 'Like 🤍'}
      </button>
      <p className="mt-2">Total Likes: {totalLikes}</p>
    </div>
  )
}

