import {ChatMessage} from "./types";
import {ScrollArea} from "@mantine/core";
import { MessageItem } from "./MessageItem";

type Props = {
  messages: ChatMessage[]
}

export const MessageList = ({messages}: Props) => {
  return (
    <ScrollArea>
      {messages.map(({Text, ID}) => {
        return <MessageItem key={ID} text={Text} />
      })}
    </ScrollArea>
  )
}
