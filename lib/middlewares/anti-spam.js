// lib/middlewares/anti-spam.js

// ฟังก์ชันตรวจสอบการส่งรีวิวซ้ำ
export async function checkDuplicateReview(ReviewModel, review, ip) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // 1 ชั่วโมงย้อนหลัง
  
    // ตรวจสอบผู้เขียนคนเดียวกันส่งบ่อยเกินไปหรือไม่
    const authorSubmissions = await ReviewModel.countDocuments({
      author: review.author,
      createdAt: { $gte: oneHourAgo }
    });
  
    if (authorSubmissions >= 3) {
      return {
        isDuplicate: true,
        message: "You've submitted too many reviews recently. Please try again later."
      };
    }
  
    // ตรวจสอบ IP เดียวกันส่งบ่อยเกินไปหรือไม่
    const ipSubmissions = await ReviewModel.countDocuments({
      ip: ip,
      createdAt: { $gte: oneHourAgo }
    });
  
    if (ipSubmissions >= 5) {
      return {
        isDuplicate: true,
        message: "Too many reviews submitted from your location. Please try again later."
      };
    }
  
    // ตรวจสอบเนื้อหาที่คล้ายกัน
    try {
      const similarReviews = await ReviewModel.find({
        $text: { $search: review.description },
        createdAt: { $gte: oneHourAgo }
      }).limit(1);
  
      if (similarReviews.length > 0) {
        return {
          isDuplicate: true,
          message: "A similar review was submitted recently. Please provide unique content."
        };
      }
    } catch (error) {
      // หาก text search มีปัญหา ให้ใช้การเปรียบเทียบแบบง่าย
      const recentReviews = await ReviewModel.find({
        createdAt: { $gte: oneHourAgo }
      }).select('title description');
  
      // ตรวจสอบความซ้ำซ้อนแบบง่าย
      const isDuplicate = recentReviews.some(existingReview => {
        return (
          existingReview.title.toLowerCase() === review.title.toLowerCase() ||
          existingReview.description.toLowerCase().includes(review.description.toLowerCase()) ||
          review.description.toLowerCase().includes(existingReview.description.toLowerCase())
        );
      });
  
      if (isDuplicate) {
        return {
          isDuplicate: true,
          message: "A similar review was submitted recently. Please provide unique content."
        };
      }
    }
  
    // ไม่พบการซ้ำซ้อน
    return { isDuplicate: false };
  }
  
  // ฟังก์ชันตรวจสอบเนื้อหาที่ไม่เหมาะสม
  export function checkInappropriateContent(review) {
    // รายการคำที่ไม่เหมาะสม (ตัวอย่างเบื้องต้น ควรขยายตามความเหมาะสม)
    const inappropriateWords = ['spam', 'scam', 'xxx', 'casino', 'gambling'];
    
    const lowerCaseTitle = review.title.toLowerCase();
    const lowerCaseDesc = review.description.toLowerCase();
    
    // ตรวจสอบคำที่ไม่เหมาะสม
    const foundWord = inappropriateWords.find(word => 
      lowerCaseTitle.includes(word) || lowerCaseDesc.includes(word)
    );
    
    if (foundWord) {
      return {
        isInappropriate: true,
        message: "Your review contains inappropriate content. Please revise and try again."
      };
    }
    
    // ตรวจสอบลิงก์มากเกินไป (อาจเป็นสแปม)
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    const urlsInTitle = (lowerCaseTitle.match(urlPattern) || []).length;
    const urlsInDesc = (lowerCaseDesc.match(urlPattern) || []).length;
    
    if (urlsInTitle + urlsInDesc > 2) {
      return {
        isInappropriate: true,
        message: "Your review contains too many links. Please reduce the number of links."
      };
    }
    
    return { isInappropriate: false };
  }