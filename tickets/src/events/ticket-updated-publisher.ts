import { Publisher, Subjects, TicketUpdatedEvent } from "@wktockets/common";

export class TicketUpdatedPublisher extends Publisher <TicketUpdatedEvent>{
    subject:Subjects.TicketUpdated = Subjects.TicketUpdated;
}