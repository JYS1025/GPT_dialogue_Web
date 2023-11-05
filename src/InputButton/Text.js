import React, { useState } from "react";
import '../App.css';

//process when send button clicked
async function send({contents, reply, setReply, handleReq, handleRes, setContents, messages, setMessages}) {
  //send MyChatbox
  const newContent = {text: contents.text, req: true};
  setContents((contents) => newContent);
  handleReq(newContent, setContents, messages, setMessages);

  //using GPT API
  const response = await fetch('/api/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: contents.text,
    }),
  });
  const completion = await response.text();
  
  //send AIChatbox
  const newReply = {text: completion, req: false};
  handleRes(newReply, setReply, messages, setMessages);
  setReply((reply) => newReply);
  if (completion !== "") {
    const utterThis = new SpeechSynthesisUtterance(completion)
    utterThis.onend = function (event) {
    }
    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror")
    }
    utterThis.lang = "en";
    utterThis.pitch = pitch
    utterThis.rate = rate
    window.speechSynthesis.speak(utterThis)
  }
}

const pitch = 1;
const rate = 1;
async function populateVoiceList(synth) {
  try {
    const voices = await synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase();
      const bname = b.name.toUpperCase();
      if (aname < bname) return -1;
      else if (aname === bname) return 0;
      else return +1;
    });

    return voices;
  } catch (error) {
    throw new Error("Failure retrieving voices");
  }
}
async function speak(textToRead, synth) {
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => populateVoiceList
    }
  
    if (synth.speaking) {
      console.error("speechSynthesis.speaking")
      return
    }
}

const handleOnKeyPress = ({e, contents, reply, setReply, handleReq, handleRes, setContents, messages, setMessages}) => {
  if (e.key === 'Enter') {
    send({contents, reply, setReply, handleReq, handleRes, setContents, messages, setMessages}); // Enter 입력이 되면 클릭 이벤트 실행
  }
}

function Text ({contents,setContents,handleReq, handleRes, messages, setMessages}) {    
  //declare AI response  
  const [reply, setReply] = useState({
      text: "",
      req: false,
  });
  return(
      <div>
          <input className="textinput" placeholder="Please Enter your Prompt" value={contents.text} onChange={(e)=>setContents(current => ({text: e.target.value}))} onKeyDown={(e)=>handleOnKeyPress({e, contents, reply, setReply, handleReq, handleRes, setContents, messages, setMessages})}></input>
          
          <button className="send" onClick={() => {
              send({contents, reply, setReply, handleReq, handleRes, setContents, messages, setMessages});
            }}> send </button>
      </div>
  )
}

Text.defaultProps = {
  content: {
    text: "",
    req: true,
  }
}

export default Text;