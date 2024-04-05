import Post from "../models/post.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createPost = async (req, res, next) => {
    try {
        const userId = req.params.id
        const { caption, description, images } = req.body
        const newPost = new Post({
            caption: caption,
            description: description,
            images: images,
            author: userId
        })
        if (!newPost) return next(errorHandler(402, "Couldn't created the Post"))
        await newPost.save()
        res.status(201).json({
            success: true,
            sattusCode: 201,
            message: "Created Post"
        })
    } catch (error) {
        next(error)
    }
}

export const getPosts = async (req, res, next) => {
    try {
        const userid = req.params.id
        if (req.user.id !== userid) return next(errorHandler(404, "user not found"))

        const allPosts = await Post.find({ author: userid }).populate("author").sort({createdAt: -1})
        if (!allPosts) {
            return next(errorHandler(401, "unable to get posts"))
        }
        res.status(200).json({
            success: true,
            sattusCode: 200,
            posts: allPosts
        })
    } catch (error) {
        next(error)
    }
}

export const getAllUsersPosts = async (req, res, next) => {
    try {
        const allPosts = await Post.find().populate("author").sort({ createdAt: -1 });
        if (!allPosts) {
            return next(errorHandler(401, "unable to get posts"))
        }
        res.status(200).json({
            success: true,
            sattusCode: 200,
            posts: allPosts
        })
    } catch (error) {
        next(error)
    }
}

export const getSpacificPost = async (req, res, next) => {
    try {
        const postId = req.params.id
        const post = await Post.findById(postId).populate("author")
        if (!post) {
            return next(errorHandler(401, "unable to get posts"))
        }
        res.status(200).json({
            success: true,
            sattusCode: 200,
            post: post
        })
    } catch (error) {
        next(error)
    }
}

export const getSpacificPostAndDelete = async (req, res, next) => {
    try {
        const postId = req.params.id
        const post = await Post.findByIdAndDelete(postId)
        if (!post) {
            return next(errorHandler(401, "unable to delete post"))
        }
        res.status(200).json({
            success: true,
            sattusCode: 200,
            message: "Post Deleted Successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getUserPost = async (req, res, next) => {
    try {
        const userid = req.params.id
        console.log(userid);
        const allPosts = await Post.find( { author: userid } );
        if (!allPosts || allPosts.length === 0) {
            return next(errorHandler(401, "unable to get posts"))
        }
        res.status(200).json({
            success: true,
            sattusCode: 200,
            posts: allPosts
        })
    } catch (error) {
        next(error)
    }
}