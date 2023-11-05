import React, { useState } from 'react';
import './App.css';
import Head from './Head';
import Body from './Body';
import Input from './Input';

function App() {
  const [messages, setMessages] = useState([]);
  return (
    <div className="app">
      <Head />
      <Body messages={messages}/>
      <Input messages = {messages} setMessages = {setMessages}/>
    </div>
  );
}

export default App;

