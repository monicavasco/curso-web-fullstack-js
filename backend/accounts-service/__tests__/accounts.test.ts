import request from 'supertest'
import { Response } from 'express';
import app from './../src/app'

describe('Testando rotas do accounts', () => {
  it('GET /accounts/ - Deve retornar statusCode 200', async () => {
    const resultado = await request(app)
      .get('/accounts/');

      expect(resultado.status).toEqual(200);
      expect(Array.isArray(resultado.body)).toBeTruthy();
  })
  
  it('POST /accounts/ - Deve retornar statusCode 201', async () => {
    const payload = {
      id: 1,
      name: 'Daniel',
      email: 'danielcastro.rs@gmail.com',
      password: '123456',
      status: 1
    }

    const resultado = await request(app)
      .post('/accounts/')
      .send(payload)

    expect(resultado.status).toEqual(201)
  })
})