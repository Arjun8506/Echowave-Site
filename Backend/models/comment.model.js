import mongoose from "mongoose";

const commentShema = new mongoose.Schema({
    postid: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    userid: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        required: true
    },
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentShema)

export default Comment