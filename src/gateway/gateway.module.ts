import { Module } from '@nestjs/common';
import { MessagingGateway } from './websocket.gateway';

@Module({
    imports: [],
    providers: [MessagingGateway]
})
export class GatewayModule {}
