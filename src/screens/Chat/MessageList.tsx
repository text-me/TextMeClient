import {ChatMessage} from "./types";

type Props = {
  messages: ChatMessage[]
}

export const MessageList = ({messages}: Props) => {
  return (
    <div style={{overflow: "scroll"}}>
      {messages.map(({Text, ID}) => {
        return <p key={ID}>{Text}</p>
      })}
    </div>
  )
}
