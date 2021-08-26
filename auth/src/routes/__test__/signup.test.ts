import { app } from '../../app';
import request from 'supertest';


it('returns a 201 on succesful signup', async() => {
    return request(app)
      .post('/api/users/signup')
      .send({
          email: 'test@test.com',
          password: 'password'
      })
      .expect(201)
})

it('return a 400 with an invalid email or password', async() =>{
    await request(app)
      .post('/api/users/signup')
      .send({
          email: 'test.com',
          password: 'password'
      })
      .expect(400)
    await request(app)
      .post('/api/users/signup')
      .send({
          email: 'test@gmail.com',
          password: 'psd'
      })
      .expect(400)
})

it('return a 400 with missing email and password', async() =>{
    return request(app)
      .post('/api/users/signup')
      .send({})
      .expect(400)
})

it('disallows duplicate emails', async() => {
    await request(app)
      .post('/api/users/signup')
      .send({
          email: 'test@gmail.com',
          password: 'psdjkljh'
      })
      .expect(201)
    
    await request(app)
      .post('/api/users/signup')
      .send({
          email: 'test@gmail.com',
          password: 'psdjkljh'
      })
      .expect(400)
})

it('set a cookie after successful signup', async() => {
    const res = await request(app)
      .post('/api/users/signup')
      .send({
          email: 'test@gmail.com',
          password: 'password'
      })
      .expect(201)
    
    expect(res.get('Set-Cookie')).toBeDefined();
})