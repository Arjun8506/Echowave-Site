import express from "express"
import { loggedInUser } from "../middleware/getLoggedInUser.js"
import { commentHere, getcomments } from "../controllers/comment.controllers.js"

const router = express.Router()

router.post("/create", loggedInUser, commentHere)

router.get("/allcomments/:id", getcomments)

export default router