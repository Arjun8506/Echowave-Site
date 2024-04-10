import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import io from "socket.io-client"

const socketContext = createContext()

export const useSocketContext = () => {

    const context = useContext(socketContext);
    if (!context) {
        throw new Error("useSocketContext must be used within a SocketContextProvider");
    }
    return context;
}

const SocketContextProvider = ({ children }) => {
    const [socket, setsocket] = useState(null)
    const [onlineUsers, setonlineUsers] = useState([])
    const { authUser } = useAuthContext()

    useEffect(() => {
      if (authUser) {
        const newSocket = io("http://localhost:5000", {
            query: {
                userId: authUser._id
            }
        })
        setsocket(newSocket)

        newSocket.on("getOnlineUsers", (users) => {
            setonlineUsers(users)
        })
        return () => {
            newSocket.close()
        }
      } else {
        if (socket) {
            socket.close()
            setsocket(null)
        }
      }
    }, [authUser])

    return <socketContext.Provider value={{ socket, onlineUsers }} >
        {children}
    </socketContext.Provider>
}

export default SocketContextProvider;