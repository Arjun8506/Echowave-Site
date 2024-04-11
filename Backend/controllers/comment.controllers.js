import Comment from "../models/comment.model.js"
import { errorHandler } from "../utils/errorHandler.js"

export const commentHere = async (req, res, next) => {
    try {
        const { postid, comment } = req.body
        const userid = req.user.id

        const existedComment = await Comment.find({ userid: userid })
        if (existedComment.length > 0) return next(errorHandler(409, "You already commented"))

        const newComment = new Comment({
            postid: postid,
            userid: userid,
            comment: comment
        })
        await newComment.save()
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Commented Successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getcomments = async (req, res, next) => {
    try {
        const postid = req.params.id
        if (!postid) return next(errorHandler(404, "Unable to Fetch the comments"))
        const comments = await Comment.find({ postid: postid }).populate("userid").sort({ createdAt: -1 })
        if (!comments) return next(errorHandler(404, "comments not found"))
        res.status(200).json({
            success: true,
            statusCode: 200,
            comments: comments
        })
    } catch (error) {
        next(error)
    }
}