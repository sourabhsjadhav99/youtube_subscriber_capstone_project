
(async () => {
    // Use dynamic import for chai
    const chai = require('chai');
    // const chai = await import('chai');
    const chaiHttp = require('chai-http'); // Use require for non-ES modules
    const app = require('../src/index.js');

    chai.use(chaiHttp);

    describe('Subscribers Controller', () => {
        describe('GET /subscribers', () => {
            it('should return all subscribers if available', (done) => {
                chai.request(app)
                    .get('/subscribers')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });
            });

            it('should return 404 if no subscribers found', (done) => {
              chai.request(app)
                .get('/subscribers')
                .end((err, res) => {
                  expect(res).to.have.status(404);
                  done();
                });
            });

            it('should return 500 for internal server error', (done) => {
                chai.request(app)
                    .get('/subscribers')
                    .end((err, res) => {
                        expect(res).to.have.status(500);
                        done();
                    });
            });
        });

        describe('GET /subscribers/names', () => {
            it('should return specific fields of subscribers if available', (done) => {
                chai.request(app)
                    .get('/subscribers/names')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('array');
                        done();
                    });
            });

            it('should return 404 if no subscribers found', (done) => {
              chai.request(app)
                .get('/subscribers/names')
                .end((err, res) => {
                  expect(res).to.have.status(404);
                  done();
                });
            });

            it('should return 500 for internal server error', (done) => {
                chai.request(app)
                    .get('/subscribers/names')
                    .end((err, res) => {
                        expect(res).to.have.status(500);
                        done();
                    });
            });
        });

        describe('GET /subscribers/:id', () => {
            it('should return subscriber by ID if available', (done) => {
                chai.request(app)
                    .get('/subscribers/valid_id') // Replace 'valid_id' with a valid subscriber ID
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        done();
                    });
            });

            it('should return 404 if subscriber not found', (done) => {
              chai.request(app)
                .get('/subscribers/invalid_id') // Use an invalid ID that does not exist in the database
                .end((err, res) => {
                  expect(res).to.have.status(404);
                  done();
                });
            });

            it('should return 500 for internal server error', (done) => {
                chai.request(app)
                    .get('/subscribers/valid_id')
                    .end((err, res) => {
                        expect(res).to.have.status(500);
                        done();
                    });
            });
        });
    });
})()

