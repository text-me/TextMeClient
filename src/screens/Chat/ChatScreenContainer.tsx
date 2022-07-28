import {useEffect} from "react";
import {MessageList} from "./MessageList";
import {NewMessageInput} from "./NewMessageInput";
import {fetch} from "@tauri-apps/api/http";
import config from "../../config.json";
import {ws} from "./ws";
import {SimpleGrid, Stack} from "@mantine/core";
import {useStore} from "../../state/store";
import {TGroup, TMessage} from "./types";
import {NewGroup} from "./Group/NewGroup";
import {GroupsList} from "./Group/GroupsList";

export const ChatScreenContainer = () => {
  const messages = useStore((state) => state.messages)
  const setMessages = useStore((state) => state.setMessages)
  const addMessage = useStore((state) => state.addMessage)
  
  const selectedGroup = useStore((state) => state.selectedGroup)
  const selectGroup = useStore((state) => state.selectGroup)
  
  const groups = useStore((state) => state.groups)
  const setGroups = useStore((state) => state.setGroups)
  const addGroup = useStore((state) => state.addGroup)
  
  useEffect(() => {
    const removeNewMessageSubscription = ws.onNewMessage((newMessage) => {
      addMessage(newMessage);
    });
  
    const removeNewGroupSubscription = ws.onNewGroup((newGroup) => {
      addGroup(newGroup);
    });
    
    return () => {
      removeNewMessageSubscription();
      removeNewGroupSubscription();
    }
  }, []);
  
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`${config.serverUrl}/getMessages`);
      setMessages(response.data as TMessage[]);
    }
    fetchMessages();
  
    const fetchGroups = async () => {
      const response = await fetch(`${config.serverUrl}/getGroups`);
      console.log(response.data);
      setGroups(response.data as TGroup[]);
    }
    fetchGroups();
  }, []);
  
  return (
    <SimpleGrid cols={2}>
      <Stack style={{
        height: '100%',
        justifyContent: 'space-between'
      }}>
        <GroupsList groups={groups} selected={selectedGroup} selectGroup={selectGroup} />
        <NewGroup />
      </Stack>
      <Stack justify={'space-between'} style={{
        height: 'calc(100vh - 48px)'
      }}>
        <MessageList messages={messages} />
        <NewMessageInput />
      </Stack>
    </SimpleGrid>
  )
}
