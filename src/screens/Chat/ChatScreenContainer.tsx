import {MouseEvent, useState} from "react";
import {ChatMessage} from "./types";
import * as Styled from './style'
import { MessageList } from "./MessageList";
import { NewMessageInput } from "./NewMessageInput";

export const ChatScreenContainer = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  const handleMessageSendClick = (text: string) => {
    setMessages([...messages, {text}])
  }
  
  return (
    <Styled.Root>
      <MessageList messages={messages} />
      <NewMessageInput onSendClick={handleMessageSendClick} />
    </Styled.Root>
  )
}
