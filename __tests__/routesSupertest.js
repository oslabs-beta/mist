const { get } = require('express/lib/response');
const request = require('supertest');
const metricsController = require('../server/controllers/metricsController')

const server = 'http://localhost:3000';


// /v1/traces
// expect: ('Content-Type', /json/)
// error handling


 describe('Route integration', () => {
     //NOT GOING TO WORK UNTIL WE SET UP A MOCK RESPONSE FROM THE TRACER!!
     xdescribe('/v1/traces', () => {
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
         describe('GET', () => {
             it('responds with "sessionNum has been set!" message', () => {
                 return request(server)
                    .get('/sessionNum')
                    .expect('Content-Type', /application\/json/)
             });
         });
     });

    //  /sessionLogs
    //  expect: ('Content-Type', /json/)
    //  expect: logs from most recent session
    //  error handling
    xdescribe('/sessionLogs', () => {
        describe('GET', () => {
            it('responds with logs from the most recent session', () => {
                return request(server)
                    .get('/sessionLogs')
                    .expect('Content-Type', /application\/json/)
            })
        })
    })

    // /averageData/:workerName
    // expect: ('Content-Type', /json/)
    // average data of the last 5 sessions
    xdescribe('averageData/:workerName', () => {
        describe('GET', () => {
            it('responds with the data from the previous 5 sessions for that worker', () => {
                return request(server)
                    .get('/averageData/:workerName')
                    .expect('Content-Type', /application\/json/)
            })
        })
    })

 });







/*
expect: 404 status code



*/