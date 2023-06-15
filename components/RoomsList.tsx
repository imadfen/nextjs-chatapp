import Image from "next/image"
import { useEffect, useState } from "react"

function RoomsList({ user }: any) {
    const [rooms, setRooms] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        fetch("/api/rooms", {
            headers: {
                Authorization: `Bearer ${user.user_id}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setRooms(data)
            })
            .catch(err => {
                setError("Connection Error")
                console.error(err);
            })
    }, [])

    return (
        <>
            {rooms ?
                <div>
                    {rooms.map((room: any) => {
                        return (
                            <div className="flex gap-5">
                                <div style={{width: "50px", height: "50px"}}>
                                    <Image src="/userpic.png" alt="" width={50} height={50}/>
                                </div>
                                <p>{room.member_name}</p>
                            </div>
                        )
                    })}
                </div>
                :
                null
            }
        </>
    )
}

export default RoomsList