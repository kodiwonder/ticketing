import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@wktockets/common';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';
import { TicketCreatedPublisher } from '../events/ticket-created-publisher';
import { natswrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/tickets', requireAuth, [
   body('title').notEmpty().withMessage('Title is required'),
   body('price').isFloat({gt: 0}).withMessage('Price must be greater than 0')
], validateRequest, async (req: Request, res: Response) => {
   const { title, price } = req.body;
   const ticket = await Ticket.build({
      title,
      price,
      userId: req.currentUser!.id
   });
   await ticket.save();
   new TicketCreatedPublisher(natswrapper.client).publish({
       id: ticket.id,
       version: ticket.version,
       title: ticket.title,
       userId: ticket.userId,
       price: ticket.price
   });
   res.status(201).send(ticket);
});

export { router as createTicketRouter }