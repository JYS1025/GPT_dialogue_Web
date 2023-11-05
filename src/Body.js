import React from "react";
import './App.css';
function MyChatBox({ message }) {
  return <div className="mychatbox">{message}</div>;
}
function AIChatBox({ message }) {
  return <div className="aichatbox">{message}</div>;
}

function Body({messages}) {
    return (
      <div className="body">
        <div className="chatbox-container">
        {messages.map((message, index) => (
          message.req===true ? <MyChatBox key={index} message={message.text} /> : <AIChatBox key={index} message={message.text} />
        ))}
        </div>
      </div>
    );
  }

export default Body;