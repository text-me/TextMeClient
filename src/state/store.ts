import create from 'zustand'
import {devtools} from "zustand/middleware";
import { immer } from 'zustand/middleware/immer'

interface State {
  messages: ChatMessage[]
  setMessages: (messages: ChatMessage[]) => void
  addMessage: (message: ChatMessage) => void
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
      }
      // setBees: (input) => set({ bees: input }),
      // increase: (by) => set((state) => ({ bears: state.bears + by })),
    }))
  )
)

// const useStore = create<State>()((set) => ({
//   messages: [],
//   addMessage: () => {},
//   // bears: 0,
//   // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   // removeAllBears: () => set({ bears: 0 }),
// }));

export type ChatMessage = {
  ID: number,
  Text: string
}
