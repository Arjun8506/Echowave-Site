import User from "../models/user.model.js"
import { errorHandler } from "../utils/errorHandler.js"
import bcryptjs from "bcryptjs"

export const allUsers = async (req, res, next) => {
    try {
        const loggedInUserId = req.user.id
        const users = await User.find({ _id: { $ne: loggedInUserId } }).sort({ createdAt: -1 })
        if (!users) return next(errorHandler(404, "Users Not Found"))
        res.status(200).json({
            success: true,
            statusCode: 200,
            users: users
        })
    } catch (error) {
        next(error)
    }
}

export const getSpecifiedUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) return next(errorHandler(404, "User Not Found"))
        res.status(200).json({
            success: true,
            statusCode: 200,
            user: user
        })
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { username, password, profilePic } = req.body
        const userid = req.user.id
        const userToUpdate = await User.findById(userid)
        if (!userToUpdate) return next(errorHandler(404, "User Not Found"))

        const hashedPassword = bcryptjs.hashSync(password, 10)

        // Update only the provided fields
        const updateFields = {};
        if (username) {
            updateFields.username = username;
        }
        if (hashedPassword) {
            updateFields.password = hashedPassword;
        }
        if (profilePic) {
            updateFields.profilePic = profilePic;
        }

        // Perform the update operation
        const user = await User.findByIdAndUpdate(userid, updateFields, { new: true });

        if (!user) return next(errorHandler(500, "unable to update user"))
        res.status(200).json({
            success: true,
            statusCode: 201,
            message: "Update Successfull",
            user: user
        })
    } catch (error) {
        next(error)
    }
}

export const searchedUser = async (req, res, next) => {
    try {
        const { search } = req.body

        if(search === "") return next(errorHandler(400, "Search Input is empty"))

        const regex = new RegExp(search, 'i');

        const users = await User.find({ username: { $regex: regex } })
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Users Not Found"
            });
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            users: users
        })
    } catch (error) {
        next(error)
    }
}