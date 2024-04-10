import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser"
import http from "http"
import { Server } from "socket.io"

import ConnectDB from "./connectDB/connectDB.js"
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'
import userRoutes from './routes/user.routes.js'
import messageRoutes from "./routes/message.routes.js"
import commentRoutes from "./routes/comment.routes.js"
import path from "path"

dotenv.config()

const app = express()
const Port = process.env.PORT

const __dirname = path.resolve()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

app.use("/api/post", postRoutes)

app.use("/api/user", userRoutes)

app.use("/api/message", messageRoutes)

app.use("/api/comment", commentRoutes)

const server = http.createServer(app)

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {};

export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"],
        credentials: true 
      }
});

io.on('connection', (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId != "undefined") {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

app.use(express.static(path.join(__dirname, "/Frontend/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
})


server.listen(Port, () => {
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