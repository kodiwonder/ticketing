import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, OrderStatus, requireAuth } from '@wktockets/common';
import { Order } from '../models/order';
import { natswrapper } from '../nats-wrapper';
import { OrderCancelledPublisher } from '../events/publisher/order-cancelled-publisher';

const router = express.Router();

router.delete('/api/orders:orderId', requireAuth, async (req: Request, res: Response) => {
   const { orderId } = req.params;
   const order = await Order.findById(orderId).populate('ticket');
   if (!order) {
      throw new NotFoundError();
   }

   if(order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
   }

   order.status = OrderStatus.Cancelled;
   await order.save();

   new OrderCancelledPublisher(natswrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
         id: order.ticket.id
      }
   });
   res.send(order);
})

export { router as deleteOrderRouter }