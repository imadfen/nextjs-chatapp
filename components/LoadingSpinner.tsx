import React from 'react'
import { TailSpin } from 'react-loader-spinner'

function LoadingSpinner() {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <TailSpin
                height="40"
                width="40"
                color="#4fa94d"
            />
        </div>
    )
}

export default LoadingSpinner