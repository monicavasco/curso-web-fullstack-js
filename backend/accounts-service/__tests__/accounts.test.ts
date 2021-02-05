import request from 'supertest'
import app from './../src/app'
import {IAccount} from '../src/models/accounts'
import repository from '../src/models/accountRepository';
import auth from '../src/auth';

const testEmail = 'jest@accounts.com';
const testEmail2 = 'jest2@accounts.com';
const hashPassword = '$2a$10$p0Cnz2uTR5xXj4qGxJxBv.5GHgtzeMTsqNb4THd6uHpA9cGOmlSHK';//123456
let jwt : string = '';
let testId : number = 0;

beforeAll(async () => {
  const testAccount : IAccount = {
    name: 'jest',
    email: testEmail,
    password: hashPassword,
    domain: 'jest.com'
  }
  const result = await repository.add(testAccount);
  testId = result.id!;
  jwt = await auth.sign(result.id!);
})

afterAll(async () => {
  await repository.removeByEmail(testEmail);
  await repository.removeByEmail(testEmail2);
})

describe('Testando rotas do accounts', () => {
  it('GET /accounts/ - Deve retornar statusCode 200', async () => {
    const resultado = await request(app)
      .get('/accounts/')
      .set('x-access-token', jwt);

      expect(resultado.status).toEqual(200);
      expect(Array.isArray(resultado.body)).toBeTruthy();
  })

  it('POST /accounts/ - Deve retornar statusCode 201', async () => {
    const payload : IAccount = {
      name: 'jest2',
      email: testEmail2,
      password: '123456',
      domain: 'jest.com',
    }

    const resultado = await request(app)
      .post('/accounts/')
      .send(payload)

    expect(resultado.status).toEqual(201);
    expect(resultado.body.id).toBeTruthy();
  })

  it('POST /accounts/ - Deve retornar statusCode 422', async () => {
    const payload = {
      street: 'rua dos tupis',
      city: 'Gravataí',
      state: 'RS'
    }

    const resultado = await request(app)
      .post('/accounts/')
      .send(payload)

    expect(resultado.status).toEqual(422);
  })

  it('PATCH /accounts/ - Deve retornar statusCode 200', async () => {
    const payload = {
      name: 'Daniel Castro',
    }

    const resultado = await request(app)
      .patch('/accounts/' + testId)
      .send(payload)
      .set('x-access-token', jwt);

    expect(resultado.status).toEqual(200);
    expect(resultado.body.id).toEqual(testId);
    expect(resultado.body.name).toEqual(payload.name);
  })

  it('PATCH /accounts/:id - Deve retornar statusCode 400', async () => {
    const payload = {
      name: 'Daniel Castro',
    }

    const resultado = await request(app)
      .patch('/accounts/abc')
      .send(payload)
      .set('x-access-token', jwt);

    expect(resultado.status).toEqual(400);
  })

  it('PATCH /accounts/:id - Deve retornar statusCode 404', async () => {
    const payload = {
      name: 'Daniel Castro',
      //password: '123456789',
    }

    const resultado = await request(app)
      .patch('/accounts/-1')
      .send(payload)
      .set('x-access-token', jwt);

    expect(resultado.status).toEqual(404);
  })

  it('GET /accounts/:id - Deve retornar statusCode 200', async () => {
    const resultado = await request(app)
      .get('/accounts/' + testId)
      .set('x-access-token', jwt);

      expect(resultado.status).toEqual(200);
      expect(resultado.body.id).toBe(testId);
  })


  it('GET /accounts/:id - Deve retornar statusCode 404', async () => {
    const resultado = await request(app)
      .get('/accounts/2')
      .set('x-access-token', jwt);

      expect(resultado.status).toEqual(404);
  })

  it('GET /accounts/:id - Deve retornar statusCode 400', async () => {
    const resultado = await request(app)
      .get('/accounts/abc')
      .set('x-access-token', jwt);

      expect(resultado.status).toEqual(400);
  })

})