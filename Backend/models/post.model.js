import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    description: {
        type: String 
    },
    images: {
        type: Array,
        required: true
    },
    likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema)

export default Post