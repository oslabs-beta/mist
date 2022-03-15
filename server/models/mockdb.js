//Mock Database to facilitate front-end set-up before queries are working

const mockdb = {
    //logs
    logs: [
        {
            _id: 1,
            method: 'POST',
            url: 'http://localhost:8080/penguins',
            status: 200,
            response_time_ms: 1.74,
            session_num: 1,
            start: '2022-03-08T17:00:00+0000',
        },
        {
            _id: 2,
            method: 'GET',
            url: 'http://localhost:8080/',
            status: 400,
            response_time_ms: 2.56,
            session_num: 1,
            start: '2022-03-08T17:02:13+5400',
        },
        {   _id: 3,
            method: 'POST',
            url: 'http://localhost:8080/realData',
            status: 200,
            response_time_ms: 2.71,
            session_num: 1,
            start: '2022-03-08T16:00:00+0000',
        },
        {
            _id: 4,
            method: 'GET',
            url: 'http://localhost:8080/',
            status: 200,
            response_time_ms: 3.56,
            session_num: 2,
            start: '2022-03-08T17:00:00+0000',
        }
    ],
    // median CPU time

    // duration

    // bandwidth

    // granularity
}

module.exports = mockdb;