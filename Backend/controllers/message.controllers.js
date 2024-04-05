import Message from "../models/message.model.js"

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
        const filteredMessages = await Message.find({ senderid: senderid, receiverid: receiverid })
        if (filteredMessages.length === 0) {
            res.status(404).json({
                success: true,
                statusCode: 404,
                message: 0
            })
        }else {
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: filteredMessages
            })
        }
    } catch (error) {
        next(error)
    }
}