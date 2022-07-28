import {Container, Text, useMantineTheme} from "@mantine/core";
import React from "react";

type Props = {
  title: string,
  onClick: () => void,
  selected: boolean
}

export const GroupItem = ({title, selected, onClick}: Props) => {
  const theme = useMantineTheme();
  const style: React.CSSProperties = {}
  
  if (selected) {
    style.backgroundColor = theme.colors.green[1]
  }
  
  return (
    <Container style={style} onClick={onClick}>
      <Text>{title}</Text>
    </Container>
  )
}
