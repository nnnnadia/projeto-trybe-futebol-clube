import * as chai from 'chai';
import App from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;
describe('Testes de rota', () => {
  describe('POST: /login', () => {
    it('Quando o email e a senha estão corretos\n\tStatus: 200;\n\tRespose body: { token };\n', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: 'secret_user',
        });
      expect(response.body.token).to.match(/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/);
      expect(response.status).to.be.equal(200);
    });

    it('Quando email está vazio\n\t'
    + 'Status: 400;\n\tResponse body: { message: \'All fields must be filled\' };\n', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send({
          email: '',
          password: 'secret_user',
        });
      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal('All fields must be filled');
    });

    it('Quando password está vazio\n\t'
    + 'Status: 400;\n\tResponse body: { message: \'All fields must be filled\' };\n', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: '',
        });
      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.be.equal('All fields must be filled');
    });

    it('Quando email está incorreto\n\t'
    + 'Status: 400;\n\tResponse body: { message: \'Incorrect email or password\' };\n', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'notuser@user.com',
          password: 'secret_user',
        });
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Incorrect email or password');
    });

    it('Quando password está incorreto\n\t'
    + 'Status: 400;\n\tResponse body: { message: \'Incorrect email or password\' };\n', async () => {
      const response = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'user@user.com',
          password: 'not_user',
        });
      expect(response.status).to.be.equal(401);
      expect(response.body.message).to.be.equal('Incorrect email or password');
    });
  });
  // describe('GET: /login/validate', async () => {
  //   const response = await chai
  //     .request(app)
  //     .get('/login/validate')
  //     .send({
  //       authorization: 'user@user.com',
  //     });
  //   expect(response.status).to.be.equal(401);
  //   expect(response.body.message).to.be.equal('Incorrect email or password');
  // });
});
