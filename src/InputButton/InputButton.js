import React, { useEffect, useState } from "react";
import Text from "./Text";
import Voice from "./Voice";

function InputButton({text, messages, setMessages}) {
    //declare content(my_request)
    const [contents, setContents] = useState({
        text: "",
        req: true,
    });

    //useEffect for debug
    // useEffect(() => {
    //     console.log(messages);
    // }, [messages]);
    // useEffect(() => {
    //     console.log(contents.text);
    // }, [contents]);

    //handling Request, Response process to body chatbox
    const handleReq = (newContent, setContent, messages, setMessages) => {
        if (newContent) {
          setMessages((messages) => [...messages, newContent]);
        }
        setContent(current => ({text: ""}))
    };

    const handleRes = (reply, setReply, messages, setMessages) => {
        if (reply) {
          setMessages((messages) => [...messages, reply]);
        }
        setReply(current => ({text: ""}))
    };

    //Text mode - Voice mode optioning
    if(text === true){
        return(
            <Text contents={contents} setContents={setContents} handleReq={handleReq} handleRes={handleRes} messages={messages} setMessages={setMessages}/>)
    }
    else{
        return(
            <Voice contents={contents} setContents={setContents} handleReq={handleReq} handleRes={handleRes} messages={messages} setMessages={setMessages}/>)
    }
}

export default InputButton;