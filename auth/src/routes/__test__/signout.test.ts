import { app } from '../../app';
import request from 'supertest';


it('clears the cookie after signinging out', async() =>{
    await request(app)
      .post('/api/users/signup')
      .send({
          email: 'test@test.com',
          password: 'password'
      })
      .expect(201)
    
    const res = await request(app)
      .post('/api/users/signout')
      .send({})
      .expect(200)
    expect(res.get('Set-Cookie')).toBeDefined()
})