import { useState } from 'react'
import { io } from 'socket.io-client'
import Login from '../components/Login'
import RoomsList from '../components/RoomsList'
import LogoutButton from '../components/LogoutButton'
import Return from '../components/Return'
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
                    <div className='w-full h-full flex flex-col'>
                        <div className='flex w-full'>
                            {messageRoom ? <Return closeRoom={()=>setMessageRoom(null)}/> : null}
                            <LogoutButton logout={()=>setLogged(false)}/>
                        </div>
                        <div className='w-full h-full bg-slate-900 rounded-xl p-2 overflow-y-auto'>
                            {!messageRoom ? 
                                <RoomsList user={logged} chooseRoom={setMessageRoom}/>
                            :
                                null
                            }

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
