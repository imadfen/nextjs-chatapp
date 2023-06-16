import MessageInput from "./MessageInput"
import Messages from "./Messages"

function Room({ user, roomId }: { user: any, roomId: string }) {
    return (
        <div className="flex flex-col w-full h-full gap-2">
            <Messages user={user} room={roomId} />
            <MessageInput user={user} room={roomId} />
        </div>
    )
}

export default Room