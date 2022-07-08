import {useRef, KeyboardEvent} from "react";

type Props = {
  onSendClick: (message: string) => void
}

export const NewMessageInput = ({onSendClick}: Props) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSend = () => {
    if (!inputRef.current) {
      return;
    }
    
    const message = inputRef.current.value || '';
    onSendClick(message);
    
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
