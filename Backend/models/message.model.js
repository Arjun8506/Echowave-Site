import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderid: {
        type: String,
        required: true
    },
    receiverid: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    imageurl: {
        type: String
    }
}, {timestamps: true})

const Message = mongoose.model("Message", messageSchema)

export default Message