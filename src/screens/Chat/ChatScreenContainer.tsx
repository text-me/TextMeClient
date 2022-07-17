import {useEffect} from "react";
import { MessageList } from "./MessageList";
import { NewMessageInput } from "./NewMessageInput";
import {fetch} from "@tauri-apps/api/http";
import config from "../../config.json";
import {conn} from "./ws";
import {Stack} from "@mantine/core";
import {ChatMessage, useStore} from "../../state/store";

export const ChatScreenContainer = () => {
  const messages = useStore((state) => state.messages)
  const setMessages = useStore((state) => state.setMessages)
  const addMessage = useStore((state) => state.addMessage)
  
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`${config.serverUrl}/getMessages`);
      setMessages(response.data as ChatMessage[]);
    }
    
    fetchMessages();
  
    conn.onmessage = (ev) => {
      console.log(ev);
      
      addMessage(JSON.parse(ev.data));
    }
  }, []);
  
  return (
    <Stack justify={'space-between'} style={{
      height: '100%'
    }}>
      <MessageList messages={messages} />
      <NewMessageInput />
    </Stack>
  )
}
