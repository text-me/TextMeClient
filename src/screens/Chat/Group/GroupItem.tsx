import {Container, Text} from "@mantine/core";

type Props = {
  title: string
}

export const GroupItem = ({title}: Props) => {
  return (
    <Container>
      <Text>{title}</Text>
    </Container>
  )
}
