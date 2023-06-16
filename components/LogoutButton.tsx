import React from 'react'

function LogoutButton({logout}: any) {
  return (
    <div className='bg-red-600 ml-auto p-1 rounded cursor-pointer hover:bg-red-700 text-sm' onClick={logout}>
        Logout
    </div>
  )
}

export default LogoutButton