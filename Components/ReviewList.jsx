import { blog_data } from "@/Assets/assets";
import React, { useState } from "react";
import ReviewsItem from "./ReviewItem";

const BlogList = () => {

    const [menu,setMenu] = useState("All")

    return (
        <div>
            <div className="flex justify-center gap-6 my-10">
                <button onClick={()=>`All`} className={menu==="All"? "bg-black text-white py-1 px-4 rounded-sm":""}>All</button>
                <button onClick={()=>`Learning`}className={menu==="Learning"? "bg-black text-white py-1 px-4 rounded-sm":""}>Learning</button>
                <button onClick={()=>`Environment`}className={menu==="Environment"? "bg-black text-white py-1 px-4 rounded-sm":""}>Environment</button>
                <button onClick={()=>`Lifestyle`}className={menu==="Lifestyle"? "bg-black text-white py-1 px-4 rounded-sm":""}>Lifestyle</button>
            </div>
            <div className="flex flwx-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
                {blog_data.filter((item)=> menu==="All"?true:item.category===menu).map((item,index)=>{
                    return <ReviewsItem key={index} image={item.image} title={item.title} description={item.description} category={item.category}/>
                })}
            </div>
        </div>
    )
}

export default BlogList