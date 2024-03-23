import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://i.pinimg.com/564x/72/27/bb/7227bb6cd6cd58f9ccbb009b158605b2.jpg"
    }

}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User