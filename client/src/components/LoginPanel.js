import React, {useRef, useState} from 'react'
import axios from 'axios'
import {sha512} from 'crypto-hash'

const LoginPanel = ({setPasswordHash, setUsername}) => {

  let username = useRef()
  let password = useRef()
  let submit = useRef()
  let [session, setSession] = useState(0)

  function login(){
    passwordCheck(username.current.value, password.current.value)

  }

  function passwordCheck(username, password){
    // username should be made lowercase before doing any comparison in the database

    sha512(password).then( hash => {
      // console.log({password_hash: hash, username: username.toLowerCase()})
      axios.post('http://'+window.location.hostname+':8000/user', {password_hash: hash, username: username.toLowerCase()}).then(res => {
        console.log(res.data['login'])
        if(res.data['login'] === true){
          console.log("login success")
          setSession(1)
          setUsername(username.toLowerCase())
          console.log(username.toLowerCase())
          setPasswordHash(hash)
          console.log(hash)
        }else if(res.data['login'] === false){
          setSession(-1)
        }
      })

    })
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
