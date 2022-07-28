import {Input} from "@mantine/core";
import {KeyboardEvent, useRef} from "react";
import {ws} from "../ws";

export const NewGroup = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!inputRef.current) {
      return;
    }
    
    if (event.key === "Enter") {
      ws.createNewGroup({title: inputRef.current.value})
      inputRef.current.value = "";
    }
    return false;
  };
  
  return (
    <Input ref={inputRef} placeholder="New group name" onKeyDown={handleKeyDown} />
  )
};
