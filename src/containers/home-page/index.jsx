import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const PORT = 'http://localhost:3500';


const HomePage = () => {
  const [value, setValue] = useState('');
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const newSocket = io(PORT);

    newSocket.emit('join-room', id);

    newSocket.on('room-message', (data) => {
      setMessages((oldMessages) => [...oldMessages, data]);
    })

    newSocket.on('unsuccessfull', (data) => console.log(data.statusCode));

    setSocket(newSocket);

    newSocket.on('connect', () => console.log('Connected'));
    newSocket.on('disconnect', () => console.log('Disconnected'));

    return () => {
      newSocket.disconnect();
      newSocket.off('connect', () => console.log('Connected'));
      newSocket.off('disconnect', () => console.log('Disconnected'));

    };
  }, []);



  const handleClick = (e) => {
    e.preventDefault();
    console.log(messages)
    setMessages(messages => [...messages, { id: id, message: { text: value, sender: 'Kerby Sarcia' } }])

    socket.emit('send-message', { id: id, message: { text: value, sender: 'Kerby Sarcia' } });
    setValue('');
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <div>
      <div className="">{
        !messages.length ? <div>no messages</div> : messages.map((message, i) => <h1 key={i}>{message.message.text}</h1>)
      }</div>
      <form action="">
        <input type="text" value={value} onChange={handleChange} />
        <button onClick={handleClick}>Send</button>
      </form>
    </div>
  )
}

export default HomePage