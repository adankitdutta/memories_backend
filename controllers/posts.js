import  mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";


export const getPosts= async (req,res)=>{
    try{
        const getMessages= await PostMessage.find();

        res.status(200).json(getMessages);
    }
    catch(error)
    {
        res.status(404).json({
            message:error.message,
        })
    }
}


export const createPost=async (req,res)=>{
    const post=req.body;
    const newPost=new PostMessage(post);
    try{
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(error){
        res.status(409).json({message:error.message});

    }
}


export const updatePost= async (req,res)=>{
    const {id:_id}=req.params;
    const post=req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) 
        return res.status(404).send("No post with that id");

    const updatedPost= await PostMessage.findByIdAndUpdate(_id,{...post,_id} ,{new:true});

    res.json(updatePost);
}


export const deletePost= async (req,res)=>{
    const {id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) 
        return res.status(404).send("No post with that id");

    await PostMessage.findByIdAndDelete(id);

    res.json("Successfully deleted");
}


export const likePost= async (req,res)=>{
    const {id:_id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) 
        return res.status(404).send("No post with that id");
console.log("liked");
        const post =await PostMessage.findById(_id);
    const updatedPost= await PostMessage.findByIdAndUpdate(_id,{likeCount:post.likeCount+1} ,{new:true});

    res.json(updatePost);
}