import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },

    category:{
        type:String,
        required:true,
    },

    author:{
        type:String,
        required:true,
    },

    authorImg:{
        type:String,
        required:true,
    },

    date:{
        type:Date,
        default:Date.now(),
    }
})

const ReviewModel = mongoose.models.review || mongoose.model("review",Schema)

export default ReviewModel;
