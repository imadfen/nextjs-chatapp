import React, { useState } from 'react'

function login({ loginAs }: any) {
    const [errorMessage, setErrorMessage] = useState("")
    const [inputVals, setInputVals] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e: any, input: string) => {
        var list: any
        list = inputVals
        list[input] = e.target.value
        setInputVals(list)
    }


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setErrorMessage("")

        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(inputVals)
        })

        if (response.status == 200) {
            const data = await response.json()
            loginAs(data)

            return true
        } else if (response.status == 401) {
            console.log("wrong credentials");
            setErrorMessage("invalid username or password")
            return false
        }

        console.log("error login");
        setErrorMessage("internal server error")
        return false
    }


    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <h1 className='text-5xl font-bold select-none'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center w-1/2 h-1/2 gap-5'>
                <div className='text-red-500 h-6 m-0'>
                    <p>
                        {errorMessage}
                    </p>
                </div>

                <input type="text" defaultValue={inputVals.username} onChange={(e) => handleChange(e, "username")} name='username' placeholder='username' className='w-3/4 h-10 bg-transparent rounded border border-white outline-none p-2' autoComplete='off' required />
                <input type="password" name='password' defaultValue={inputVals.password} onChange={(e) => handleChange(e, "password")} placeholder='password' className='w-3/4 h-10 bg-transparent rounded border border-white outline-none p-2' required />

                <input type="submit" value="login" className='w-1/4 p-2 rounded border hover:bg-white hover:text-black cursor-pointer' />
            </form>
        </div>
    )
}

export default login