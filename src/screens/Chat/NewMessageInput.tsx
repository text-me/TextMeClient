import {useRef, KeyboardEvent} from "react";
import config from '../../config.json'
import {Body, fetch} from '@tauri-apps/api/http';
import {ChatMessage} from "./types";

type Props = {
  onSendClick: (message: ChatMessage) => void
}

export const NewMessageInput = ({onSendClick}: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSend = async () => {
    if (!inputRef.current) {
      return;
    }
  
    const response = await fetch(`${config.serverUrl}/newMessage`, {
      method: 'POST',
      body: Body.json({
        text: inputRef.current.value
      })
    });
    
    inputRef.current.value = "";
    
    const newMessage = response.data as ChatMessage
    onSendClick(newMessage);
  }
  
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.altKey) {
      handleSend();
    }
    
    return false;
  };
  
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <textarea style={{width: '65%'}} ref={inputRef} onKeyDown={handleKeyDown} />
      <button style={{width: '30%'}} onClick={handleSend}>
        Send
      </button>
    </div>
  )
}
