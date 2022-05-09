import LoginPanel from './components/LoginPanel';
import MessagePanel from './components/MessagePanel';
import MessageSendPanel from './components/MessageSendPanel';
import {useState} from 'react';

function App() {

  let [messages, setMessages] = useState([{id:1, message:'hello', user:'user1'}, {id:2, message:'hello', user:'user2'}, {id:3, message:'hello', user:'user3'}]);
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');


  return (
    <div className='grid place-items-center h-screen'>
      <div className='p-4 outline-2 font-Nunito'>
        <LoginPanel setPassword={setPassword} setUsername={setUsername}/>
        <MessagePanel messages={messages}/>
        <MessageSendPanel/>
      </div>
    </div>
  );
}

export default App;
