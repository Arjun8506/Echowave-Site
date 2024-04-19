import Follow from "../models/follow.model.js"
import { errorHandler } from "../utils/errorHandler.js"

export const follow = async (req, res, next) => {
    try {
        const followerId = req.user.id
        const followingId = req.params.id

        const existedFollowers = await Follow.findOne({ followerId: followerId, followingId: followingId })
        if (existedFollowers) {
            return next(errorHandler(200, "You already Follow him/her"))
        }


        const newfollower = new Follow({
            followerId: followerId,
            followingId: followingId
        })

        await newfollower.save()
        res.status(200).json({
            success: true,
            message: "following started!",
            newfollower
        })
    } catch (error) {
        next(error)
    }
}

export const following = async (req, res, next) => {
    try {
        const followingId = req.params.id

        const followingCount = await Follow.countDocuments({ followingId })

        res.status(200).json({
            success: true,
            followingCount
        })
    } catch (error) {
        next(error)
    }
}