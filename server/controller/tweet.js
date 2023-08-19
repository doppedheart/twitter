import { handleError } from '../error.js';
import Tweet from '../models/Tweet.js';
import User from '../models/User.js';


export const createTweet = async (req, res, next) => {
    const newTweet = new Tweet(req.body);
    try{
        const savedTweet= await newTweet.save();
        res.status(200).json(savedTweet);
    }catch(err){
        res.status(500).json(err);
    }

}

export const deleteTweet = async (req, res, next) => {
    try{
    const deleteTweet = await Tweet.findById(req.params.id);

    if(deleteTweet.userId === req.body.id){
       
            await deleteTweet.deleteOne();
            res.status(200).json("Tweet has been deleted");
        
    }else{  
        handleError(500,err);

    }
    }catch(err){
            
        handleError(500,err)
        }
}
export const likeOrDislikeTweet = async (req, res, next) => {
    try{
        const tweet= await Tweet.findById(req.params.id);
        if(!tweet.likes.includes(req.body.id)){
            await tweet.updateOne({$push:{likes:req.body.id}});
            res.status(200).json("The tweet has been liked");

        }else{
            await tweet.updateOne({$pull:{likes:req.body.id}});
            res.status(200).json("The tweet has been disliked");

        }
    }catch(err){
        handleError(500,err);
    }
}
export const getAllTweets = async (req, res, next) => {
    try{
        const currentUser= await User.findById(req.params.id);
        const userTweets = await Tweet.find({userId:currentUser._id});
        const followingTweets = await Promise.all(currentUser.followings.map((followingId)=>{return Tweet.find({userId:followingId})}));
        res.status(200).json(userTweets.concat(...followingTweets))
    }catch(err){
        handleError(500,err);
    }
}
export const getUserTweets = async (req, res, next) => {    
    try{
        const userTweets = await Tweet.find({userId:req.params.id}).sort({createdAt:-1});
        res.status(200).json(userTweets);

    }   catch(err){
        handleError(500,err);
    }
}

export const getExploreTweets = async (req, res, next) => {
    try{
        const allTweets = await Tweet.find({likes:{$exists:true}}).sort({likes:-1});
        res.status(200).json(allTweets);
    }catch(err){
        handleError(500,err);
    }
}
