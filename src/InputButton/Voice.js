import React, { useEffect, useState } from "react";
import '../App.css';

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


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-US';
recognition.maxAlternatives = 4;

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


function Voice ({contents,setContents,handleReq, handleRes, messages, setMessages}) {
  const [record, setRecord] = useState(false);
  const [reply, setReply] = useState({
    text: "",
    req: false,
  });
  useEffect(() => {
    recognition.onresult = (e) => {
      setContents(current => ({text: e.results[0][0].transcript}));
    };
  }, []);
  
  function startRecord() {
    console.log("시작");
    setRecord(true)
    recognition.start();
  }

  function endRecord(e) {
    console.log("종료");
    setRecord(false);
    recognition.stop();
    send({contents, reply, setReply, handleReq, handleRes, setContents, messages, setMessages})
  }
  return(
    <div>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    
    {!record ? 
      <button className="record" onClick={startRecord}><span class="material-symbols-outlined">
      radio_button_unchecked
      </span></button> :
      <button className="stop" onClick={(e)=>{e.preventDefault();endRecord(e)}}><span class="material-symbols-outlined">
      radio_button_checked
      </span></button>
    }
    <p>{contents.text}</p>
    </div>
  )
}

export default Voice;
