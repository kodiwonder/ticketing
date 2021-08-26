import { app } from '../../app';
import request from 'supertest';
import { Ticket } from '../../models/tickets';


test('has a route handler listning to /api/tickets post requests', async () => {
  await request(app).post('/api/tickets').send({})
})

it('can only be accessed if the user is signed in', async() => {

  const response = await request(app).post('/api/tickets')
    .set('Cookie', global.signin())
    .send({})
  expect(response.status).not.toEqual(401)
})

it('returns an error if an invalid title is provided', async() => {
  const response = await request(app).post('/api/tickets')
  .set('Cookie', global.signin())
  .send({title: '', price: 10})
expect(response.status).toEqual(400)

await request(app).post('/api/tickets')
  .set('Cookie', global.signin())
  .send({price: 10})
  .expect(400)
})

it('returns an error if an invalid price is provided', async() => {
  await request(app).post('/api/tickets')
  .set('Cookie', global.signin())
  .send({title: '10'})
  .expect(400)

  await request(app).post('/api/tickets')
  .set('Cookie', global.signin())
  .send({title: 'asgasg', price: -10})
  .expect(400)
})

it('creates a ticket with valid inputs', async() => {

  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0)
  await request(app).post('/api/tickets')
  .set('Cookie', global.signin())
  .send({title: 'asgasg', price: 10})
  .expect(201)

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(10);
})

