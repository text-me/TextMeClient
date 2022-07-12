import {ChatMessage} from "./types";

type Props = {
  messages: ChatMessage[]
}

export const MessageList = ({messages}: Props) => {
  return (
    <div style={{overflow: "scroll"}}>
      {messages.map(({text, id}) => {
        return <p key={id}>{text}</p>
      })}
    </div>
  )
}
