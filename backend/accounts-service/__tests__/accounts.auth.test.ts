import request from 'supertest';
import { IAccount } from '../src/models/accounts';
import app from '../src/app';
import repository from '../src/models/accountRepository';

const testEmail = 'jest@accounts.auth.com';
const hashPassword = '$2a$10$p0Cnz2uTR5xXj4qGxJxBv.5GHgtzeMTsqNb4THd6uHpA9cGOmlSHK';//123456
const testPassword = '123456';

beforeAll(async () => {
  const testAccount : IAccount = {
    name: 'jest',
    email: testEmail,
    password: hashPassword,
    domain: 'jest.com'
  }
  await repository.add(testAccount);
})

afterAll(async () => {
  await repository.removeByEmail(testEmail);
})

describe('Testando rotas de autenticação', () => {
  it('POST /accounts/login - 200 OK', async () => {


    // testing
    const payload = {
      email: testEmail,
      password: testPassword
    }

    const resultado = await request(app)
      .post('/accounts/login')
      .send(payload);

      expect(resultado.status).toEqual(200);
      expect(resultado.body.auth).toBeTruthy();
      expect(resultado.body.token).toBeTruthy();
  })

  it('POST /accounts/login - 422 Unprocessable Entity', async () => {
    const payload = {
      email: testEmail,
    }

    const resultado = await request(app)
      .post('/accounts/login')
      .send(payload);

      expect(resultado.status).toEqual(422);
  })

  it('POST /accounts/login - 401 unauthorized', async () => {
    const payload = {
      email: testEmail,
      password: testPassword+'1'
    }

    const resultado = await request(app)
      .post('/accounts/login')
      .send(payload);

      expect(resultado.status).toEqual(401);
  })

  it('POST /accounts/logout - 200 OK', async () => {
    const resultado = await request(app)
      .post('/accounts/logout');

      expect(resultado.status).toEqual(200);
  })

})