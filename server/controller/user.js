import {handleError} from '../error.js';
import User from '../models/User.js';

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser =async (req,res,next)=>{
    const user =req.user;
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
        {
            $set:req.body,
        },
        {
            new:true,
        })
        res.status(200).json(updatedUser);
    }catch(err){
        next(err);
    }
}  

export const deleteUser = async (req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json("user has been deleted");
    }catch(err){
        next(err);
    }
}
export const follow = async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        const currentUser =await User.findById(req.body.id);
        if(!user.followers.includes(req.body.id)){
            await user.updateOne({$push:{followers:req.body.id}});
            await currentUser.updateOne({$push:{followings:req.params.id}});
        }
        else{
            res.status(403).json("you already follow this user");
        }
     res.status(200).json("user has been followed");
    }catch(err){
        next(err);
    }
}
export const unfollow =async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);
        const currentUser =await User.findById(req.body.id);
        if(currentUser.followings.includes(req.params.id)){
            await user.updateOne({$pull:{followers:req.body.id}});
            await currentUser.updateOne({$pull:{followings:req.params.id}});
        }
        else{
            res.status(403).json("you do not follow this user");
        }
     res.status(200).json("user has been unfollowed");
    }catch(err){
        next(err);
    }
}