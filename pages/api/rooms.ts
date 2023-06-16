import prisma from "../../utils/prisma"
import { IncomingMessage } from "http";

export default async function handler(req: IncomingMessage, res: any) {
    if (req.method == "GET") {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(403).json()
        }

        authHeader = authHeader?.split(" ")[1]

        try {
            const user = await prisma.user.findUnique({
                where: { user_id: authHeader }
            })

            if (!user) {
                return res.status(401).json({ status: 401 })
            }

            const userId = user.user_id
            const rooms = await prisma.room.findMany({
                where: {
                    UserRoom: {
                        some: {
                            member_id: userId
                        }
                    },
                },
            });

            if (!rooms) {
                return res.status(401).json({ status: 401 })
            }

            let roomsIds: string[] = []
            rooms.forEach((room) => {
                roomsIds.push(room.room_id)
            })

            const userRoom = await prisma.userRoom.findMany({
                where: {
                    AND: {
                        NOT: {
                            member_id: userId
                        },
                        room_id: {
                            in: roomsIds
                        }
                    }
                },
            });

            if (userRoom.length == 0) {
                return res.status(200).json([])
            }
            

            let roomsList = []
            for (let i = 0; i < userRoom.length; i++) {
                const memberName = await prisma.user.findFirst({
                    where: {
                        user_id: userRoom[i].member_id
                    },
                    select: {
                        user_name: true
                    }
                })
                roomsList[i] = {...userRoom[i], member_name: memberName?.user_name}
            }

            return res.status(200).json(roomsList)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 500 })
        }
    }

    return res.status(405).json({ status: 405 })
}
