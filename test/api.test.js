import chai from 'chai';
import chaiHttp from 'chai-http';
import { execSync } from 'child_process';

chai.use(chaiHttp);
const { expect } = chai;

let server;

describe('Car CRUD API', () => {
  before((done) => {
    server = execSync('node server.js', { stdio: 'inherit' });
    done();
  });

  after((done) => {
    server.kill();
    done();
  });

  describe('GET /api/mostPopularMake', () => {
    it('should return the most popular car make', (done) => {
      chai.request('http://localhost:3000')
        .get('/api/mostPopularMake')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('mostPopularMake');
          done();
        });
    });
  });

  describe('POST /api/car', () => {
    it('should add a new car', (done) => {
      chai.request('http://localhost:3000')
        .post('/api/car')
        .send({
          color: 'blue',
          make: 'Toyota',
          model: 'Corolla',
          reg_number: 'CA 12345'
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('make', 'Toyota');
          done();
        });
    });
  });

  describe('GET /api/car/:reg_number', () => {
    it('should get a car by registration number', (done) => {
      const regNumber = 'CA 12345';
      chai.request('http://localhost:3000')
        .get(`/api/car/${regNumber}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('reg_number', regNumber);
          done();
        });
    });
  });

  describe('PUT /api/car/:reg_number', () => {
    it('should update a car by registration number', (done) => {
      const regNumber = 'CA 12345';
      chai.request('http://localhost:3000')
        .put(`/api/car/${regNumber}`)
        .send({
          color: 'red',
          make: 'Toyota',
          model: 'Corolla'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('color', 'red');
          done();
        });
    });
  });

  describe('DELETE /api/car/:reg_number', () => {
    it('should delete a car by registration number', (done) => {
      const regNumber = 'CA 12345';
      chai.request('http://localhost:3000')
        .delete(`/api/car/${regNumber}`)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
  