const { get } = require('express/lib/response');
const request = require('supertest');
const metricsController = require('../server/controllers/metricsController')

const server = 'http://localhost:3000';


// /v1/traces
// expect: ('Content-Type', /json/)
// error handling

const mockReq = {
    body: {
        resourceSpans: [{
            instrumentationLibrarySpans: [{
                spans: [{
                    attributes: [0, 1, 2, {
                        value: {
                            stringValue: 'GET'
                        }},
                        4, 5, 6, 7, 8, 9, 10, 11, {
                            value: {
                                intValue: 200
                            }
                        }
                    ],
                    startTimeUnixNano: 1648566066671458000000,
                    endTimeUnixNano: 1648566066671469000000
                }]
            }]
        }]
    }
}


describe('Route integration', () => {
    //To test, set up a mock response from tracer
    describe('/v1/traces', () => {
        describe('POST', () => {
            it('responds with a "hello from 3000!" message', () => {
                return request(server)
                    .post('/v1/traces')
                    .send(mockReq)
                    .expect('Content-Type', /text\/html/)
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
                    .expect('"sessionNum has been set!"')
            });
        });
    });

    //  /sessionLogs
    //  expect: ('Content-Type', /json/)
    //  expect: logs from most recent session
    //  error handling
    describe('/sessionLogs', () => {
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
    describe('averageData/:workerName', () => {
        describe('GET', () => {
            it('responds with the data from the previous 5 sessions for that worker', () => {
                return request(server)
                    .get('/averageData/:workerName')
                    .expect('Content-Type', /application\/json/)
            })
        })
    })
});