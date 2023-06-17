import { Socket } from "socket.io";
import { Server } from "socket.io";

console.log("socket starts on port 5000");

const io = new Server(5000, {
    cors: {
        origin: ["http://localhost:3000"]
    }
});


io.on('connection', (socket: Socket) => {
    socket.on("send-message", (room, message) => {
        socket.to(room).emit("receive-messages", room, message)
    })

    

    socket.on("join-room", (room: string) => {
        socket.join(room)
    })
})