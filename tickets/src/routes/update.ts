import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth, 
        validateRequest, NotAuthorizedError, 
    } from '@wktockets/common';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';
import { natswrapper } from "../nats-wrapper";
import { TicketUpdatedPublisher } from "../events/ticket-updated-publisher";

const router = express.Router();
router.put('/api/tickets:id', requireAuth, [ 
        body('title').notEmpty().withMessage('Title is required'),
        body('price').isFloat({gt: 0}).withMessage('Price must be greater than 0')
    ], validateRequest,
    async(req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id);
        if(!ticket) { 
            throw new NotFoundError();
        }

        if (ticket.userId !== req.currentUser!.id){ 
            throw new NotAuthorizedError()
        }
        ticket.set({
            title: req.body.title,
            price: req.body.price
        });
        await ticket.save();
        new TicketUpdatedPublisher(natswrapper.client).publish({
            id: ticket.id,
            version: ticket.version,
            title: ticket.title,
            userId: ticket.userId,
            price: ticket.price
        });
        res.send(ticket);
});

export { router as updateTicketRouter }