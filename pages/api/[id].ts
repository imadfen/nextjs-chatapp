import prisma from "../../utils/prisma";

export default async function handler(req: any, res: any) {
    if (req.method == "GET") {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json()
        }

        const userId = authHeader?.split(" ")[1]
        const roomId = req.query.id

        let messages = await prisma.message.findMany({
            where: {
                room_id: roomId
            },
        })

        if (messages.length == 0) {
            return res.status(200).json([])
        }

        let messagesList = []
        for (let i = 0; i < messages.length; i++) {
            messagesList[i] = { ...messages[i], me: messages[i].sender_id == userId }
        }

        return res.status(200).json(messagesList)
    }

    return res.status(405).json()
}