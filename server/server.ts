import { Socket } from "socket.io";
import { Server } from "socket.io";
const cron = require('node-cron');
import { resetDB } from "../utils/prisma"

console.log("socket starts on port 5000");

// Scheduling the server to reset the database:
cron.schedule('0 0 * * *', async () => {
    await resetDB()
});


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