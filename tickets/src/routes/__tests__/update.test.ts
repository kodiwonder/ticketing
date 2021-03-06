import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the user does not exist ', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app).put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({title: 'sadfagga', price: 23})
        .expect(404)
});

it('returns a 401 if the user is not authenticated ', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app).put(`/api/tickets/${id}`)
        .send({title: 'sadfagga', price: 23})
        //.expect(401)
});

it('returns a 401 if the user does not own the ticket ', async () => {
   

});

it('returns a 400 if the provided invalid does price or title ', async () => {
   

});

it('update the ticket provided valid inputs ', async () => {
   

});
