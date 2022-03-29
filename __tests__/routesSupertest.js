const { get } = require('express/lib/response');
const request = require('supertest');
const metricsController = require('../server/controllers/metricsController')

const server = 'http://localhost:3000';


// /v1/traces
// expect: ('Content-Type', /json/)
// error handling


 describe('Route integration', () => {
     describe('/v1/traces', () => {
         describe('POST', () => {
             it('responds with a "hello from 3000!" message', () => {
                 return request(server)
                    .post('/v1/traces')
                    .expect('Content-Type', /application\/json/)
             });
         });
     });

// /sessionNum
// expect: ('Content-Type', /json/)
// error handling

     
     describe('/sessionNum', () => {
         describe('GET', ()=> {
             it('responds with "sessionNum has been set!" message', () => {
                 return request(server)
                    .get('/sessionNum')
                    .expect('Content-Type', /application\/json/)
             });
         });
     });
 });


     /*


/sessionLogs
expect: ('Content-Type', /json/)
expect: logs from most recent session
error handling


/averageData/:workerName
expect: ('Content-Type', /json/)
average data of the last 5 sessions

/*
expect: 404 status code



*/