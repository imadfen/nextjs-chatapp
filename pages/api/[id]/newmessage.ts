import prisma from "../../../utils/prisma"

export default async function handler(req: any, res: any) {
    if (req.method == "POST") {
        const body = JSON.parse(req.body)
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json()
        }

        const userId = authHeader?.split(" ")[1]
        const roomId = req.query.id
        const content = body.content

        try {
            await prisma.message.create({
                data: {
                    message_content: content,
                    room_id: roomId,
                    sender_id: userId
                }
            })
            
            return res.status(200).json()
        } catch (error) {
            console.error(error)
            return res.status(500).json()
        }
    }

    return res.status(405).json({ status: 405 })
}
