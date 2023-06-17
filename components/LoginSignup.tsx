import { useState } from "react"
import Login from "./Login"
import Signup from "./Signup"

function LoginSignup({ loginAs }: { loginAs: any }) {
    const [isLoginSwitcher, setIsLoginSwitcher] = useState(true)

    const selectedStyle = " w-16 text-center font-bold"
    const notSelectedStyle = "w-16 text-center cursor-pointer"

    return (
        <div className='h-full flex flex-col justify-evenly'>
            {isLoginSwitcher ?
                <Login  loginAs={loginAs} />
                :
                <Signup loginAs={loginAs} />
            }

            <div className='mt-6 flex w-1/4 justify-evenly self-center cursor-default'>
                {isLoginSwitcher ?
                    <>
                        <p className={selectedStyle}>Login</p>
                        <p>|</p>
                        <p className={notSelectedStyle} onClick={() => setIsLoginSwitcher(false)}>Signup</p>
                    </>
                    :
                    <>
                        <p className={notSelectedStyle} onClick={() => setIsLoginSwitcher(true)}>Login</p>
                        <p>|</p>
                        <p className={selectedStyle}>Signup</p>
                    </>
                }
            </div>
        </div>
    )

}

export default LoginSignup