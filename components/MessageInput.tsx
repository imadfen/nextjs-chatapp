import { useState } from "react"
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface propsType {
    user: any,
    room: string,
    emitMessageSent: (message: string) => void
}

function MessageInput({ user, room, emitMessageSent }: propsType) {
    const [message, setMessage] = useState("")
    const [errorSend, setErrorSend] = useState(false)

    const handlChange = (e: any) => {
        setMessage(e.target.value)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (message == "") {
            return
        }

        const result = await fetch(`/api/${room}/newmessage`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.user_id}`
            },

            body: JSON.stringify({ content: message })
        })

        if (result.ok) {
            setMessage("")
            emitMessageSent(message)
        } else {
            setErrorSend(true)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex mt-auto w-full h-fit">
            <input type="text" name="message" className={`p-2 w-full rounded-lg text-black font-bold break-words bg-slate-300 outline-none resize-none ${errorSend ? "border-4 border-red-600" : ""}`} value={message} placeholder="Type message" autoComplete="off" onChange={handlChange} />
            <button type="submit" className="p-2 ml-auto text-2xl hover:text-slate-400">
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </form>
    )
}

export default MessageInput