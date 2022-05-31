import React, {useRef} from 'react'
import {AiOutlineArrowUp} from 'react-icons/ai'
import axios from 'axios'
const MessageSendPanel = (passwordHash, username) => {

    let message = useRef()
    let submit = useRef()

    function sendMessage(){
        console.log("send message")
        console.log(passwordHash)
        if(passwordHash['passwordHash'] === "" || message.current.value === ""){
          console.log("no password or data")
          return
        }else{
          axios.post('http://'+window.location.hostname+':8000/message', {message: message.current.value, username: passwordHash['username'], password_hash: passwordHash['passwordHash']}).then(res => {
              console.log(res.data)
              message.current.value = ""
          })
        }
    }

    function onEnter(event){
      if(event.keyCode === 13){
        sendMessage()
      }
    }

  return (
    <div className='space-x-6'>
        <input className='p-2 bg-grey-600 shadow-md border rounded-md w-10/12' placeholder={'message ' + window.location} onKeyUp={onEnter} ref={message}></input>
        <button className='px-6 py-2 rounded-md  border shadow-md text-gray-700 bg-green-400 h-11' onClick={sendMessage} ref={submit} >< AiOutlineArrowUp /></button>

        {/* <button className='px-6 py-2 rounded-md  border shadow-md text-gray-700 bg-green-400 h-11' onClick={sendMessage} ref={submit} >ab</button> */}

    </div>
  )
}

export default MessageSendPanel
