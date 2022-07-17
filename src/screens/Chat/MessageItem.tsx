import {Container, Text} from "@mantine/core";

type Props = {
  text: string
}

export const MessageItem = ({text}: Props) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  )
}
