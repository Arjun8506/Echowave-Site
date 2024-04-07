import express, { json } from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"

import ConnectDB from "./connectDB/connectDB.js"
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import userRoutes from './routes/user.routes.js'
import messageRoutes from "./routes/message.routes.js"
import commentRoutes from "./routes/comment.routes.js"

dotenv.config()

const app = express()
const Port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.use("/api/post", postRoutes)

app.use("/api/user", userRoutes)

app.use("/api/message", messageRoutes)

app.use("/api/comment", commentRoutes)

app.listen(Port, ()=> {
    ConnectDB()
    console.log(`Server is Running on ${Port} Port`);
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "something went wrong";
    res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        message: message
    })
})