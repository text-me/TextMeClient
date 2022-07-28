import create from 'zustand'
import {devtools} from "zustand/middleware";
import { immer } from 'zustand/middleware/immer'
import {TGroup, TMessage} from "../screens/Chat/types";

interface State {
  messages: TMessage[]
  setMessages: (messages: TMessage[]) => void
  addMessage: (message: TMessage) => void,
  
  groups: TGroup[],
  setGroups: (messages: TGroup[]) => void
  addGroup: (message: TGroup) => void,
}

export const useStore = create<State>()(
  devtools(
    immer((set) => ({
      messages: [],
      setMessages: (messages) => set({messages}),
      addMessage: (message) => {
        set((state) => {
          state.messages.push(message)
        })
      },
  
      groups: [],
      setGroups: (groups) => set({groups}),
      addGroup: (group) => {
        set((state) => {
          state.groups.push(group)
        })
      },
    }))
  )
);

useStore.subscribe(console.log);
