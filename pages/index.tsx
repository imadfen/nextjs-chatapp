import { useState } from 'react'
import { io } from 'socket.io-client'
import Login from '../components/Login'
import RoomsList from '../components/RoomsList'
import LogoutButton from '../components/LogoutButton'
import Return from '../components/Return'
import RoomName from '../components/RoomName'
import Room from '../components/Room'
// const socket = io('http://localhost:5000')


export default function Home() {
    const [logged, setLogged] = useState(false)
    const [messageRoom, setMessageRoom]: any[] = useState(null)

    return (
        <div className="w-full h-screen bg-gray-100 dark:bg-gray-950 flex justify-center items-center">
            <div className="bg-white dark:bg-slate-800 dark:text-white rounded-md p-5 pt-2 h-[max(90%,35rem)] w-[max(50%,30rem)]">
                {!logged ?
                    <Login loginAs={setLogged} />
                    :
                    <div className='w-full h-full flex flex-col'>
                        <div className='flex w-full items-center h-14 gap-3'>
                            {messageRoom ? <Return closeRoom={() => setMessageRoom(null)} /> : null}
                            {messageRoom ? <RoomName room={messageRoom.member_name} /> : null}
                            {!messageRoom ? <LogoutButton logout={() => setLogged(false)} /> : null}
                        </div>
                        <div className='w-full h-full bg-slate-900 rounded-xl p-2 overflow-y-auto'>
                            {!messageRoom ?
                                <RoomsList user={logged} chooseRoom={setMessageRoom} />
                                :
                                <Room user={logged} roomId={messageRoom.room_id} />
                            }

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
