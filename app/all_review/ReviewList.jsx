import { blog_data } from "@/Assets/assets";
import React, { useState } from "react";
import ReviewsItem from "./ReviewItem";

const ReviewsList = () => {
  const [menu, setMenu] = useState("All");

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        {["All", "Learning", "Environment", "Lifestyle"].map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={`py-1 px-4 rounded-sm ${menu === cat ? "bg-black text-white" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-around gap-4 gap-y-10 mb-16 xl:mx-24">
        {blog_data
          .filter((item) => menu === "All" || item.category === menu)
          .map((item, index) => (
            <ReviewsItem
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
            />
          ))}
      </div>
    </div>
  );
};

export default ReviewsList;
