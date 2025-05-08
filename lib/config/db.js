import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect("mongodb+srv://BurnedRose:101046@cluster0.xo409lq.mongodb.net/review-web")
    console.log("DB connected")
}