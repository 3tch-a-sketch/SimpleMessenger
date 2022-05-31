import React, { useEffect, useRef } from 'react'
import Message from './Message'

const MessagePanel = ({messages}) => {

  let scroll = useRef('')

  useEffect(() => {
    scroll.current.scrollIntoView({behavior: 'smooth'})
    console.log("scrolling")
    console.log(messages)
  }, [messages])

  return (
    <div className=' my-4 rounded-md shadow-md max-h-96 max-w-xl overflow-y-auto border-2 '>
        {messages.map(message => <Message key={message.post_id} message={message.body} user={message.username} time={message.time}/>)}
        <div ref={scroll}/>
    </div>
  )
}

export default MessagePanel
