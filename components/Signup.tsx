import { useState } from "react"
import capitalText from "../utils/capitalText"

function Signup({ loginAs }: { loginAs: (param: any) => void }) {
    const [errorMessage, setErrorMessage] = useState("")
    const [inputVals, setInputVals] = useState({
        name: "",
        username: "",
        password: "",
        passwordverefy: "",
    })
    const [errorPassword, setErrorPassword] = useState(false)

    const handleChange = (e: any, input: string) => {
        var list: any
        list = inputVals
        const value = e.target.value
        list[input] = value
        setInputVals(list)

        if (input == "password" || input == "passwordverefy") {
            if (inputVals.passwordverefy != inputVals.password) {
                setErrorPassword(true)
            } else {
                setErrorPassword(false)
            }
        }
    }


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setErrorMessage("")
        setErrorPassword(false)

        if (inputVals.password != inputVals.passwordverefy) {
            setErrorPassword(true)
            return
        }

        inputVals.name = capitalText(inputVals.name)

        const response = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify(inputVals)
        })

        if (response.status == 200) {
            const data = await response.json()
            loginAs(data)

            return true
        } else if (response.status == 403) {
            setErrorMessage("username already exists")
            return false
        }

        console.log("error login");
        setErrorMessage("internal server error")
        return false
    }


    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <h1 className='text-5xl font-bold select-none'>Sign up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-1/2 gap-5'>
                <div className='text-red-500 h-6 mt-4'>
                    <p>
                        {errorMessage}
                    </p>
                </div>

                <input type="text" defaultValue={inputVals.name} onChange={(e) => handleChange(e, "name")} name='name' placeholder='name' className='w-3/4 h-10 bg-transparent rounded border border-white outline-none p-2' autoComplete='off' required />
                <input type="text" defaultValue={inputVals.username} onChange={(e) => handleChange(e, "username")} name='username' placeholder='username' className='w-3/4 h-10 bg-transparent rounded border border-white outline-none p-2' autoComplete='off' required />
                <input type="password" name='password' defaultValue={inputVals.password} onChange={(e) => handleChange(e, "password")} placeholder='password' className='w-3/4 h-10 bg-transparent rounded border border-white outline-none p-2' required />
                <input type="password" name='passwordverefy' defaultValue={inputVals.passwordverefy} onChange={(e) => handleChange(e, "passwordverefy")} placeholder='verify password' className={'w-3/4 h-10 bg-transparent rounded outline-none p-2 ' + (errorPassword ? "border-2 border-red-600" : "border border-white")} required />

                <input type="submit" value="signup" className='w-1/4 p-2 rounded border hover:bg-white hover:text-black cursor-pointer' />
            </form>
        </div>
    )
}

export default Signup