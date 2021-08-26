import { Publisher, Subjects, OrderCancelledEvent } from "@wktockets/common";

export class OrderCancelledPublisher extends Publisher <OrderCancelledEvent>{
    subject:Subjects.OrderCancelled = Subjects.OrderCancelled;
}