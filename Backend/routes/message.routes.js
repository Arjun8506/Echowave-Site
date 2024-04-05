import express from "express"
import { loggedInUser } from "../middleware/getLoggedInUser.js"
import { createMessage, getSpacificMessages } from "../controllers/message.controllers.js"

const router = express.Router()

router.post("/createmessage/:id", loggedInUser, createMessage)

router.get("/getmessages/:id", loggedInUser, getSpacificMessages )

export default router