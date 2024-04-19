import express from "express"
import { loggedInUser } from "../middleware/getLoggedInUser.js"
import { follow, following } from "../controllers/follow.controllers.js"

const router = express.Router()

router.post("/follow/:id", loggedInUser, follow)

router.get("/following/:id", loggedInUser, following)

export default router