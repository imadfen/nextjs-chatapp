// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../utils/prisma"

export default async function handler(req: any, res: any) {
  try {
    await prisma.userRoom.create({
      data: {
        room_id: "8fe64340-9b1b-4ce6-90f6-a7f8193b0b30",
        member_id: "ac76cd7c-1c23-422e-8269-c1e84b096296"
      }
    })

    res.status(200).json({ name: 'John Doe' })
  } catch (error) {
    res.status(500).json({ name: 'John Doe' })
  }
}
