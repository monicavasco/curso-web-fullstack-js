import request from 'supertest';
import app from '../src/app';

describe('Testando rotas de autenticação', () => {
  // it('POST /accounts/login - 200 OK', async () => {
  //   const payload = {
  //     email: 'danielcastro.rs@gmail.com',
  //     password: '123456'
  //   }

  //   const resultado = await request(app)
  //     .post('/accounts/login')
  //     .send(payload);

  //     expect(resultado.status).toEqual(200);
  //     expect(resultado.body.auth).toBeTruthy();
  //     expect(resultado.body.token).toBeTruthy();
  // })

  it('POST /accounts/login - 401 unauthorized', async () => {
    const payload = {
      email: 'danielcastro.rs@gmail.com',
      password: 'abcabc'
    }

    const resultado = await request(app)
      .post('/accounts/login')
      .send(payload);

      expect(resultado.status).toEqual(401);

  })
})