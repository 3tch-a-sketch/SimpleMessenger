import React, {useRef} from 'react'
import {AiOutlineArrowUp} from 'react-icons/ai'

const MessageSendPanel = () => {

    let message = useRef()
    let submit = useRef()

    function sendMessage(){
        console.log("send message")
    }


  return (
    <div className='space-x-6'>
        <input className='p-2 bg-grey-600 shadow-md border rounded-md w-10/12' placeholder={'message ' + window.location} ref={message}></input>
        <button className='px-6 py-2 rounded-md  border shadow-md text-gray-700 bg-green-400 h-11' onClick={sendMessage} ref={submit} >< AiOutlineArrowUp /></button>
    </div>
  )
}

export default MessageSendPanel
