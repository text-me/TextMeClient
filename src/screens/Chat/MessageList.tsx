import {ScrollArea} from "@mantine/core";
import { MessageItem } from "./MessageItem";
import {ChatMessage} from "../../state/store";
import {useEffect, useRef} from "react";

type Props = {
  messages: ChatMessage[]
}

export const MessageList = ({messages}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Always scroll to last message if messages have changed
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({top: Number.MAX_VALUE});
    }
  }, [messages])
  
  return (
    <ScrollArea viewportRef={scrollRef}>
      {messages.map(({Text, ID}) => {
        return <MessageItem key={ID} text={Text} />
      })}
    </ScrollArea>
  )
}
