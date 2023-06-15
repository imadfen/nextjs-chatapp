import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Return({closeRoom}: any) {
  return (
    <FontAwesomeIcon icon={faArrowLeft} className='text-3xl ml-3 cursor-pointer' onClick={closeRoom}/>
  )
}

export default Return