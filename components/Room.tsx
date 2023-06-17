import { useEffect, useRef } from "react"
import MessageInput from "./MessageInput"
import Messages from "./Messages"
import { io } from 'socket.io-client'
let socket: any;

function Room({ user, roomId }: { user: any, roomId: string }) {
    const messagesRef: any = useRef()

    useEffect(() => {
        socketInit()
    }, [roomId])

    const socketInit = async () => {
        socket = io('http://localhost:5000');

        socket.emit("join-room", roomId)

        socket.on("receive-messages", (room: string, message: string) => {
            refetchMessages()
        });
    };

    const emitMessageSent = (message: string) => {
        socket.emit("send-message", roomId, message)
    }

    const refetchMessages = () => {
        if (messagesRef.current) {
            messagesRef.current.fetchMessages();
        }
    }

    return (
        <div className="flex flex-col w-full h-full gap-2">
            <Messages user={user} room={roomId} ref={messagesRef} />
            <MessageInput user={user} room={roomId} emitMessageSent={emitMessageSent}/>
        </div>
    )
}


export default Room