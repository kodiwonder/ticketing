import express, { Request, response, Response } from 'express';
import mongoose from "mongoose";
import { BadRequestError, NotFoundError, OrderStatus, requireAuth, validateRequest } from "@wktockets/common";
import { body } from "express-validator";
import { Order } from '../models/order';
import { Ticket } from '../models/ticket';
import { OrderCreatedPublisher } from '../events/publisher/order-created-publisher';
import { natswrapper } from '../nats-wrapper';


const router = express.Router();
const EXPIRATION_WINDOW_SECONDS = 15 * 60;
router.post('/api/orders', requireAuth, [
   body('ticketId')
   .not()
   .isEmpty()
   .custom((val: string) => mongoose.Types.ObjectId.isValid(val))
   .withMessage('TicketId must be provided')
], validateRequest, async (req: Request, res: Response) => {
   const { ticketId } = req.body;

   const ticket = await Ticket.findById(ticketId);
   if(!ticket) {
      throw new NotFoundError();
   }

   
   const isReserved = await ticket.isReserved();
  
   if(isReserved) {
      throw new BadRequestError('Ticket is already reserved');
   }

   const expiration = new Date();
   expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
   const order = Order.build({
      expiresAt: expiration,
      status: OrderStatus.Created,
      ticket,
      userId: req.currentUser!.id
   });

   await order.save();

   new OrderCreatedPublisher(natswrapper.client).publish({
      expiresAt: order.expiresAt.toISOString(),
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      ticket: {
         id: order.ticket.id,
         price: order.ticket.price
      }
   });
   res.status(201).send({ order });
})

export { router as newOrderRouter }