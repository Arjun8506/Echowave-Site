import express, { json } from "express"
import dotenv from 'dotenv'
import cors from 'cors'

import ConnectDB from "./connectDB/connectDB.js"
import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express()
const Port = process.env.PORT

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)

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