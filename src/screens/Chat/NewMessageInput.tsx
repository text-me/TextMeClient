import {useRef, KeyboardEvent} from "react";
import {ws} from "./ws";
import {Button, Grid, Textarea} from "@mantine/core";

export const NewMessageInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const handleSend = async () => {
    if (!inputRef.current) {
      return;
    }
    
    ws.sendNewMessage({text: inputRef.current.value})
    
    inputRef.current.value = "";
  }
  
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.altKey) {
      handleSend();
    }
    
    return false;
  };
  
  return (
    <Grid align={"center"}>
      <Grid.Col span={9}>
        <Textarea ref={inputRef} onKeyDown={handleKeyDown} />
      </Grid.Col>
      <Grid.Col span={2}>
        <Button onClick={handleSend}>Send</Button>
      </Grid.Col>
    </Grid>
  )
}
