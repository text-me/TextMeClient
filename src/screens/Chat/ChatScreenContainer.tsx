import {useEffect} from "react";
import {MessageList} from "./MessageList";
import {NewMessageInput} from "./NewMessageInput";
import {fetch} from "@tauri-apps/api/http";
import config from "../../config.json";
import {ws} from "./ws";
import {Stack} from "@mantine/core";
import {useStore} from "../../state/store";
import {TMessage} from "./types";

export const ChatScreenContainer = () => {
  const messages = useStore((state) => state.messages)
  const setMessages = useStore((state) => state.setMessages)
  const addMessage = useStore((state) => state.addMessage)
  
  useEffect(() => {
    const removeSubscription = ws.onNewMessage((newMessage) => {
      addMessage(newMessage);
    });
    
    return removeSubscription;
  }, []);
  
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`${config.serverUrl}/getMessages`);
      setMessages(response.data as TMessage[]);
    }
    
    fetchMessages();
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
