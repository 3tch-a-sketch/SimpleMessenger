import React from 'react'
import Message from './Message'

const MessagePanel = ({messages}) => {


  return (
    <div className=' my-4 rounded-md shadow-md max-h-96 max-w-xl overflow-y-auto border-2 '>
        {messages.map(message => <Message key={message.id} message={message.message} user={message.user}/>)}
    </div>
  )
}

export default MessagePanel
