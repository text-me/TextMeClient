import {ScrollArea} from "@mantine/core";
import { MessageItem } from "./MessageItem";
import {useEffect, useRef} from "react";
import {TMessage} from "./types";

type Props = {
  messages: TMessage[]
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
      {messages.map(({id, text}) => {
        return <MessageItem key={id} text={text} />
      })}
    </ScrollArea>
  )
}
