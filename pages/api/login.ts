import prisma from '../../utils/prisma'

export default async function handler(req: any, res: any) {
    if (req.method == "POST") {
        const body = JSON.parse(req.body)
        const username = body.username
        const password = body.password

        try {
            const user = await prisma.user.findUnique({
                where: {
                    user_username: username
                }
            })

            if (user && user.user_password == password) {
                return res.status(200).json(user)
            }
            
            return res.status(401).json({ status: 401 })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: 500 })
        }
    }

    return res.status(405).json({ status: 405 })
}
