import Image from "next/image"

function RoomName({ room }: { room: string }) {
    return (
        <div className="flex items-center py-1 gap-2 ml-2 w-full cursor-default">
            <div style={{ width: "40px", height: "40px" }}>
                <Image src="/userpic.png" alt="" width={40} height={40} />
            </div>
            <p>{room}</p>
        </div>
    )
}

export default RoomName