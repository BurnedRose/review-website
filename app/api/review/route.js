import {ConnectDB} from "@/lib/config/db"
import ReviewModel from "@/lib/models/ReviewModel";
import {writeFile} from "fs/promises"
const { NextResponse } = require("next/server")


const LoadDB = async () => {
    await ConnectDB();
}

LoadDB();

export async function GET(request) {
    return NextResponse.json({msg: "API working"})
}

export async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now()
/*

    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgUrl = `/${timestamp}_${image.name}`;
*/

    const ReviewData = {
        title:`${formData.get('title')}`,
        description:`${formData.get('description')}`,
        category:`${formData.get('category')}`,
        author:`${formData.get('author')}`,
        //image:`${imgUrl}`,
        authorImg:`${formData.get('authorImg')}`
    }

    await ReviewModel.create(ReviewData);
    console.log("Review Saved")

    return NextResponse.json({success:true,msg:"Review Added"})
}