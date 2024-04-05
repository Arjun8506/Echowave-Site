import jwt from "jsonwebtoken"
import bcryptjs from 'bcryptjs'
import User from "../models/user.model.js"
import { errorHandler } from "../utils/errorHandler.js"

export const registerUser = async (req, res, next) => {
    try {
        const { fullname, username, email, password } = req.body
        const user = await User.findOne({ email: email, username: username })
        if (user) {
            console.log("user already exits");
            return next(errorHandler(403, "User Exists Already"))
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User Created Successfully!"
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, "user not found"))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, "Wrong Credentials!"))
        const token = await jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '15d' })
        res.cookie("SocialMediaCookie", token, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true }).status(200).json({
            success: true,
            statusCode: 200,
            user: validUser
        })
    } catch (error) {
        next(error)
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("SocialMediaCookie")
        res.cookie("loggedOut", "", { maxAge: 0 })
        res.status(200).json("Loggedout Successfully")
    } catch (error) {
        next(error)
    }
}

export const googleAuth = async (req, res, next) => {
    try {
        const randomStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const { fullname, email, profilePic } = req.body
        console.log(req.body);

        const user = await User.findOne({ email: email })
        if (user) {
            console.log("found");
            const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15d' })
            res.cookie("SocialMediaCookie", token, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true }).status(200).json({
                success: true,
                statusCode: 200,
                user: user
            })
        }
        if (!user) {
            console.log("not found");
            const username = fullname.replace(/ /g, "") + Math.floor(Math.random() * 10000)
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|[];\':"<>?,./';

            let password = '';
            for (let i = 0; i < 9; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                password += chars[randomIndex];
            }
            console.log(password)
            const hashedPassword = bcryptjs.hashSync(password, 10)

            const newUser = new User({
                fullname: fullname,
                username: username,
                email: email,
                password: hashedPassword,
                profilePic: profilePic
            })
            await newUser.save()

            const token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '15d' })
            res.cookie("SocialMediaCookie", token, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true }).status(200).json({
                success: true,
                statusCode: 200,
                user: newUser
            })
        }
    } catch (error) {
        next(error)
    }
}