import { Router } from "express";
import { googleAuth, loginUser, logoutUser, registerUser } from "../controllers/auth.controllers.js";

const router = Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/logout", logoutUser)

router.post("/google", googleAuth)

export default router