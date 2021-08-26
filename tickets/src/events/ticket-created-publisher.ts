import { Publisher, Subjects, TicketCreatedEvent } from "@wktockets/common";

export class TicketCreatedPublisher extends Publisher <TicketCreatedEvent>{
    subject:Subjects.TicketCreated = Subjects.TicketCreated;
}