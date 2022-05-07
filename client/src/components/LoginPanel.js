import React, {useRef, useState} from 'react'

const LoginPanel = () => {

  let username = useRef()
  let password = useRef()
  let submit = useRef()
  let [session, setSession] = useState(0)

  function login(){
    // console.log(username.current.value, password.current.value)
    // console.log("submit", submit)

    let result = passwordCheck(username.current.value, password.current.value)
    setSession(result)
    console.log(['default','login','failed'][result+1])

  }

  function passwordCheck(username, password){

    return Math.floor(Math.random() * 3) - 1

  }

  function getSessionStyle(){
    switch(session){
      case 1: // login success
        return 'bg-green-400'
      case -1: // the password is wrong
        return 'bg-red-500'
      default: // default before login attempt
        return 'bg-blue-400'
    }
  }

  return (
    <div className='space-x-6'>
      <input className='p-2 bg-grey-600 shadow-md border rounded-md' placeholder='username' ref={username}></input>
      <input className='p-2 bg-grey-600 shadow-md border rounded-md' placeholder='password' type="password" ref={password}></input>
      <button className={'px-4 py-2 rounded-md  border shadow-md text-gray-700 '+ getSessionStyle() } ref={submit} onClick={login}>submit</button>
    </div>
  )
}

export default LoginPanel
