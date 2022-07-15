import {useEffect, useState} from "react";
import {ChatMessage} from "./types";
import * as Styled from './style'
import { MessageList } from "./MessageList";
import { NewMessageInput } from "./NewMessageInput";
import {fetch} from "@tauri-apps/api/http";
import config from "../../config.json";
import {conn} from "./ws";

export const ChatScreenContainer = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`${config.serverUrl}/getMessages`);
      setMessages(response.data as ChatMessage[]);
    }
    
    fetchMessages();
  
    conn.onmessage = (ev) => {
      console.log(ev);
      
      setMessages((oldMessages) => ([
        ...oldMessages,
        JSON.parse(ev.data)
      ]))
    }
  }, []);
  
  return (
    <Styled.Root>
      <MessageList messages={messages} />
      <NewMessageInput />
    </Styled.Root>
  )
}
