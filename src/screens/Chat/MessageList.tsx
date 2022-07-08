import {ChatMessage} from "./types";

type Props = {
  messages: ChatMessage[]
}

export const MessageList = ({messages}: Props) => {
  return (
    <div style={{overflow: "scroll"}}>
      {messages.map(({text}) => {
        return <p>{text}</p>
      })}
    </div>
  )
}
