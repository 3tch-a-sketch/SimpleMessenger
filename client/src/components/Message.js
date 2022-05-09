import React from 'react'

const Message = ({message, user}) => {
  return (
    <div className='p-2 rounded-md hover:bg-slate-100 hover:shadow-sm'>
        <span className='font-extrabold' >{user}</span> <span className='text-gray-600' >{message}</span>
        
    </div>
  )
}

export default Message
