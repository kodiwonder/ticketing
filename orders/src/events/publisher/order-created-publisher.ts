import { Publisher, Subjects, OrderCreatedEvent } from "@wktockets/common";

export class OrderCreatedPublisher extends Publisher <OrderCreatedEvent>{
    subject:Subjects.OrderCreated = Subjects.OrderCreated;
}