import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from 'react-router-dom';

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

    if (value != 0) {
      setMessages(messages => [...messages, { id: id, message: { image: user.picture, text: value, sender: user.name } }])

      socket.emit('send-message', { id: id, message: { image: user.picture, text: value, sender: user.name } });
      setValue('');
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  // Login Auth Method
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if ( !isAuthenticated ) {
    loginWithRedirect()
    // return( <Navigate to="/login" />)
  }

  const addActivity = () => {
    return ( 
    <div className="activity-container">
      <form action="post">
        <label htmlFor="acitivty-title">Title</label>
          <input type="text" name='activity-title'/>
        <label htmlFor="activity-text"></label>
          <input type="text" name='activity-text'/>
          <input type="submit" />
      </form>
    </div>
    )
  }

  return (
    <div className="home-page">
      { isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      )}
      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
      </button>

      <div className="chat-container">{
        !messages.length ? <div>no messages</div> : messages.map((message, i) => 
        <>
          <img src={message.message.image} alt={message.message.sender} />
          <h4 key={i}>{message.message.sender}</h4>
          <p> {message.message.text}</p>
        </>)}
      </div>
      <form action="">
        <input type="text" value={value} onChange={handleChange} />
        <button onClick={handleClick}>Send</button>
      </form>
      <button onClick={() => addActivity()}>
        Add Activity
      </button>
    </div>
  )
}

export default HomePage