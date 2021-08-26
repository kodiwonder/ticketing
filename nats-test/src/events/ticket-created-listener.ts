import { Message } from 'node-nats-streaming';
import { Listener } from "./base-listen";
import { TicketCreatedEvent } from '../events/ticket-created-event';
import { Subjects } from './subjects';

export class  TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message) { 
        console.log('Event data: ', data);
        msg.ack()
    }
}