import config from '../../config.json'
import {TGroup, TMessage, TMessagePayload, TNewGroupPayload} from "./types";

export enum WsEventType {
  MessageSend = "messageSend",
  MessageReceived = "messageReceived",
  NewGroupSend = "newGroupSend",
  NewGroupReceived = "newGroupReceived"
}

class WsConnection {
  private readonly ws: WebSocket;
  
  private newMessageHandlers: Array<(data: TMessage) => void> = [];
  private newGroupHandlers: Array<(data: TGroup) => void> = [];
  
  constructor() {
    this.ws = new WebSocket(config.serverWsUrl);
    
    this.ws.onclose = () => {
      console.log('WS connection closed')
    }
    this.ws.onmessage = (event) => {
      this.handleMessage(event);
    }
  }
  
  sendNewMessage(data: TMessagePayload) {
    this.ws.send(JSON.stringify({
      type: WsEventType.MessageSend,
      data
    }))
  }
  
  createNewGroup(data: TNewGroupPayload) {
    this.ws.send(JSON.stringify({
      type: WsEventType.NewGroupSend,
      data
    }));
  }
  
  onNewMessage(handler: (message: TMessage) => void): () => void {
    this.newMessageHandlers.push(handler);
    
    return () => {
      this.newMessageHandlers.splice(this.newMessageHandlers.indexOf(handler), 1);
    }
  }
  
  onNewGroup(handler: (groups: TGroup) => void): () => void {
    this.newGroupHandlers.push(handler);
    
    return () => {
      this.newGroupHandlers.splice(this.newGroupHandlers.indexOf(handler), 1);
    }
  }
  
  handleMessage(event: MessageEvent) {
    console.log(event);
    const json = JSON.parse(event.data)
    
    switch (json.type) {
      case WsEventType.MessageReceived: {
        this.newMessageHandlers.forEach((handler) => handler(json.data));
        break;
      }
      case WsEventType.NewGroupReceived: {
        this.newGroupHandlers.forEach((handler) => handler(json.data));
        break;
      }
    }
  }
}

const ws = new WsConnection();
export {ws}
