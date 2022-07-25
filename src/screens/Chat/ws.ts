import config from '../../config.json'
import {TMessage, TMessagePayload} from "./types";

export enum WsEventType {
  MessageSend = "messageSend",
  MessageReceived = "messageReceived",
}

class WsConnection {
  private readonly ws: WebSocket;
  
  private newMessageHandlers: Array<(data: TMessage) => void> = [];
  
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
  
  onNewMessage(handler: (message: TMessage) => void): () => void {
    this.newMessageHandlers.push(handler);
    
    return () => {
      this.newMessageHandlers.splice(this.newMessageHandlers.indexOf(handler), 1);
    }
  }
  
  handleMessage(event: MessageEvent) {
    console.log(event);
    const json = JSON.parse(event.data)
    
    switch (json.type) {
      case WsEventType.MessageReceived: {
        this.newMessageHandlers.forEach((handler) => handler(json.data));
      }
    }
  }
}

const ws = new WsConnection();
export {ws}
