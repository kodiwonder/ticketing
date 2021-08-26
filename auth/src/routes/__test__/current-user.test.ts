import { app } from '../../app';
import request from 'supertest';


it('get current user after signup', async() =>{
    const authResponse = await request(app)
      .post('/api/users/signup')
      .send({
          email: 'test@test.com',
          password: 'password'
      })
      .expect(201)
    const res = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', authResponse.get('Set-Cookie'))
      .send()
      .expect(200)
    expect(res.body.currentUser.email).toEqual('test@test.com')
})

it('test unauthenticated user', async () => {
    const res = await request(app)
      .get('/api/users/currentuser')
      .send()
      .expect(200)
    expect(res.body.currentUser).toEqual(null)
})