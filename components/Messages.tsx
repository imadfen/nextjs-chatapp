import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import LoadingSpinner from "./LoadingSpinner"

function Messages({ user, room }: { user: any, room: string }) {
    const [messages, setMessages]: any[] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            container.scrollTop = container.scrollHeight;
        }
    });


    useEffect(() => {
        setLoading(true)

        fetch(`/api/${room}`, {
            headers: {
                Authorization: `Bearer ${user.user_id}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                setMessages((prev: {}[]) => {
                    if (JSON.stringify(data) == JSON.stringify(prev)) {
                        return data
                    }
                    return [...data, ...prev]
                })
                setLoading(false)
            })
            .catch(err => {
                console.error(err);
                setLoading(false)
                setError(true)
            })
    }, [])


    return (
        <div className="w-full h-full p-2 rounded-md bg-black overflow-y-auto" ref={containerRef}>
            {loading && <LoadingSpinner />}
            {error ?
                <p className="text-red-600 text-center font-semibold">error loading the messages</p>
                :
                messages.length > 0 ?
                    messages.map((message: any, index: number) => {
                        if (message.me) {
                            var flex_dir = "flex-row-reverse"
                            var theme = "bg-gradient-to-tr from-fuchsia-800 to-blue-500"
                        } else {
                            var flex_dir = "flex-row"
                            var theme = "bg-gray-700"
                        }

                        return (
                            <div className={`flex ${flex_dir} gap-1 my-1`} key={index}>
                                {!message.me ?
                                    <div style={{ width: "35px", height: "35px" }}>
                                        <Image src="/userpic.png" alt="" width={35} height={35} />
                                    </div>
                                    : null}
                                <p className={`px-2 py-1 max-w-xs rounded-lg font-bold cursor-default ${theme}`}>
                                    {message.message_content}
                                </p>
                            </div>
                        )
                    })
                    :
                    <p className="text-slate-300 text-center font-semibold">no messages yet</p>
            }
        </div>
    )
}

export default Messages