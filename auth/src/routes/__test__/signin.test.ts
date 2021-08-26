import { app } from '../../app';
import request from 'supertest';


it('returns a 201 on succesful signin', async() => {
    await request(app)
      .post('/api/users/signin')
      .send({
          email: 'test@test.com',
          password: 'password'
      })
      .expect(400)
})

it('returns a 201 on succesful signin', async() => {
    await request(app)
      .post('/api/users/signup')
      .send({
          email: 'test@test.com',
          password: 'password'
      })
      .expect(201)
    
    await request(app)
      .post('/api/users/signin')
      .send({
          email: 'test@tes.com',
          password: 'password'
      })
      .expect(400)
    
    await request(app)
      .post('/api/users/signin')
      .send({
          email: 'test@test.com',
          password: 'pass'
      })
      .expect(400)


    //check for invalid password test
})

it('set a cookie after valid credention', async() =>{
    await request(app)
      .post('/api/users/signup')
      .send({
          email: 'test@test.com',
          password: 'password'
      })
      .expect(201)
    
    const res = await request(app)
      .post('/api/users/signin')
      .send({
          email: 'test@test.com',
          password: 'password'
      })
      .expect(200)
    expect(res.get('Set-Cookie')).toBeDefined()
})