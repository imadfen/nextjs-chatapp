import { useState } from 'react'
import { io } from 'socket.io-client'
import Login from '../components/Login'
import RoomsList from '../components/RoomsList'
// const socket = io('http://localhost:5000')

export default function Home() {
    const [logged, setLogged] = useState(false)
    const [messageRoom, setMessageRoom] = useState(null)

    return (
        <div className="w-full h-screen bg-gray-100 dark:bg-gray-950 flex justify-center items-center">
            <div className="bg-white dark:bg-slate-800 dark:text-white rounded-md p-5 h-5/6 w-1/2">
                {!logged ?
                    <Login loginAs={setLogged}/>
                :
                    <RoomsList user={logged}/>
                }
            </div>
        </div>
    )
}
