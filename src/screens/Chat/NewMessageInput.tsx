import {useRef, KeyboardEvent} from "react";
import {conn} from "./ws";

export const NewMessageInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSend = async () => {
    if (!inputRef.current) {
      return;
    }
  
    conn.send(JSON.stringify({type: 'newMessage', text: inputRef.current.value}));
    
    inputRef.current.value = "";
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
