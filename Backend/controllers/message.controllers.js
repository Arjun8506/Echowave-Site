import Message from "../models/message.model.js"
import { io, getReceiverSocketId } from "../index.js"
import { errorHandler } from "../utils/errorHandler.js"

export const createMessage = async (req, res, next) => {
    try {
        const senderid = req.user.id
        const receiverid = req.params.id
        const { message } = req.body

        const newMessage = new Message({
            senderid,
            receiverid,
            message: message
        })
        await newMessage.save()

        // SOCKET IO FUNCTIONALITY
        const receiverSocketId = getReceiverSocketId(receiverid);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Message Sended Successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getSpacificMessages = async (req, res, next) => {
    try {
        const senderid = req.user.id
        const receiverid = req.params.id
        // Fetch messages where senderid matches provided senderid and receiverid matches provided receiverid
        const messagesSent = await Message.find({ senderid, receiverid }).sort({ createdAt: 1 });

        // Fetch messages where senderid matches provided receiverid and receiverid matches provided senderid
        const messagesReceived = await Message.find({ senderid: receiverid, receiverid: senderid }).sort({ createdAt: 1 });

        // Concatenate the two arrays of messages
        const allMessages = messagesSent.concat(messagesReceived).reverse();

        if (allMessages.length === 0) {
            res.status(404).json({
                success: true,
                statusCode: 404,
                message: 0
            })
        }else {
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: allMessages
            })
        }
    } catch (error) {
        next(error)
    }
}

export const getLatestMessage = async (req, res, next) => {
    try {
        const senderid = req.user.id
        const receiverid = req.params.id
        const latestMessage = await Message.findOne({ senderid: senderid, receiverid: receiverid }).sort({ timestamp: -1 }).exec();
        
        if (!latestMessage) return next(errorHandler(404, "message not found"))
        
        res.status(200).json({
            success: true,
            statuscode: 200,
            latestMessage: latestMessage
        })
        

    } catch (error) {
        next(error)
    }
}