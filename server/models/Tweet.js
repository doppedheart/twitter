import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
        max:220,
    },
    likes:{
        type:Array,
        default:[],
    }
},{timestamps:true});

export default mongoose.model("Tweet",tweetSchema);

