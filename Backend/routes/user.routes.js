import express  from "express"
import { allUsers, getSpecifiedUser, searchedUser, updateUser } from "../controllers/user.controllers.js"
import { loggedInUser } from "../middleware/getLoggedInUser.js"

const router = express.Router()

router.get("/alluser", loggedInUser, allUsers)

router.post("/updateuser", loggedInUser, updateUser)

router.get("/getuser/:id", getSpecifiedUser)

router.post("/searcheduser", searchedUser)

export default router