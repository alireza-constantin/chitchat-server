import { Body } from "@nestjs/common";
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { OnEvent } from '@nestjs/event-emitter'

@WebSocketGateway({
    cors: {
        credentials: true,
         origin: ["http://localhost:5173"],
    }
})

export class MessagingGateway implements OnGatewayConnection {
    // constructor(private EventEmitter: EventEmitter2){}
    handleConnection(client: Socket, ...args: any[]) {
        console.log(client)
        console.log('connected', { status: 'good' })
    }
    @WebSocketServer()
    server: Server

    @SubscribeMessage('createMessage')
    handleCreateMessage(@Body() data:any){
        console.log('create message body:', data)
    }

    @OnEvent('message.create')
    handleCreateMessageEvent(payload: any){
        console.log('inside message create event handler')
        console.log(payload)
        this.server.emit('onMessage', payload)
    }    
}