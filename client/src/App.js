import LoginPanel from './components/LoginPanel';
import MessagePanel from './components/MessagePanel';
import MessageSendPanel from './components/MessageSendPanel';
import { useState } from 'react';
import { useInterval } from 'usehooks-ts'
import axios from 'axios';

function App() {

  let [messages, setMessages] = useState([{id:1, message:'hello', user:'user1'}, {id:2, message:'hello', user:'user2'}, {id:3, message:'hello', user:'user3'}]);
  let [username, setUsername] = useState('');
  let [passwordHash, setPasswordHash] = useState('');

  useInterval(updateMessages, 500)

  function updateMessages(){
    axios.get('http://'+window.location.hostname+':8000/message').then(res => {
      // console.log(res.data)
      let jsonArray = [];

      for(let key in res.data){
        jsonArray.push(res.data[key])
      }
      // console.log(jsonArray)
      if(jsonArray.length !== messages.length){
        setMessages(jsonArray)
      }
    })
  }

  return (
    <div className='grid place-items-center h-screen'>
      <div className='p-4 outline-2 font-Nunito'>
        <LoginPanel setPasswordHash={setPasswordHash} setUsername={setUsername}/>
        <MessagePanel messages={messages}/>
        <MessageSendPanel passwordHash={passwordHash} username={username}/>
      </div>
    </div>
  );
}

export default App;
