import express from "express"
import { loggedInUser } from "../middleware/getLoggedInUser.js"
import { createMessage, getLatestMessage, getSpacificMessages } from "../controllers/message.controllers.js"

const router = express.Router()

router.post("/createmessage/:id", loggedInUser, createMessage)

router.get("/getmessages/:id", loggedInUser, getSpacificMessages )

router.get("/getlatestmessage/:id", loggedInUser, getLatestMessage)

export default router