import React, { useState } from "react";
import InputButton from "./InputButton/InputButton";
import './App.css';
function Input({messages, setMessages}) {
    const [text, setText] = useState(false);
    return (
      <div className="input">
        <button className="text" onClick={() => setText(true)}>Text</button>
        <button className="voice" onClick={() => setText(false)}>Voice</button>
        <InputButton messages = {messages} setMessages = {setMessages} text={text}/>
      </div>
    );
}

export default Input;
