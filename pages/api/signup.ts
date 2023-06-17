import { User } from '@prisma/client'
import prisma from '../../utils/prisma'

const existCheck = async (username: string) => {
    const user = await prisma.user.findUnique({
        where: {
            user_username: username
        }
    })

    if (user) {
        return true
    }

    return false
}

const createUser = async (data: { name: string, username: string, password: string, }) => {
    const name = data.name
    const username = data.username
    const password = data.password

    const user = await prisma.user.create({
        data: {
            user_name: name,
            user_username: username,
            user_password: password
        }
    })

    return user
}

const createRooms = async (newUserId: string) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                NOT: {
                    user_id: newUserId
                }
            }
        })
    
        users.forEach(async (user: User) => {
            const roomId = (await prisma.room.create({data:{}})).room_id
            await prisma.userRoom.createMany({
                data: [
                    {
                        room_id: roomId,
                        member_id: user.user_id
                    },
                    {
                        room_id: roomId,
                        member_id: newUserId
                    }
                ]
            })
        })
        
        return true
    } catch (error) {
        console.error(error);
        return true
    }

}


export default async function handler(req: any, res: any) {
    if (req.method == "POST") {
        const body = JSON.parse(req.body)

        try {
            if (await existCheck(body.username)) {
                return res.status(403).json({ status: 403 })
            }

            const user = await createUser(body)

            const roomsCreated = await createRooms(user.user_id)

            if (!roomsCreated) {
                return res.status(500).json({ status: 500 })
            }

            return res.status(200).json(user)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 500 })
        }
    }

    return res.status(405).json({ status: 405 })
}
