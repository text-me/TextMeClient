import {Paper, ScrollArea} from "@mantine/core";
import {TGroup} from "../types";
import {GroupItem} from "./GroupItem";
import {useEffect, useRef} from "react";

type Props = {
  groups: TGroup[]
  selected: number,
  selectGroup: (group: number) => void
}

export const GroupsList = ({groups, selected, selectGroup}: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Always scroll to last message if messages have changed
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({top: Number.MAX_VALUE});
    }
  }, [groups])
  
  return (
    <ScrollArea viewportRef={scrollRef}>
      <Paper>
        {groups.map(({id, title}) => {
          return <GroupItem key={id} title={title} selected={selected == id} onClick={() => selectGroup(id)} />
        })}
      </Paper>
    </ScrollArea>
  )
};
