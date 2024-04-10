import express from "express"
import { createPost, getAllUsersPosts, getPosts, getSpacificPost, getSpacificPostAndDelete, getUserPost, likeThePost } from "../controllers/post.controllers.js"
import { loggedInUser } from "../middleware/getLoggedInUser.js"

const router = express.Router()

router.post("/create/:id", createPost)

router.get("/posts", getAllUsersPosts)

router.get("/spacifivuserpost/:id", getUserPost)

router.get("/getposts/:id", loggedInUser, getPosts)

router.get("/userpost/:id", getSpacificPost)

router.delete("/deletepost/:id", getSpacificPostAndDelete)

router.post("/likepost/:id", loggedInUser, likeThePost)

export default router