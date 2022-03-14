//Mock Database to facilitate front-end set-up before queries are working

const mockdb = {
    //logs
    logs: [
        {
            status: 400,
            URI: 'GET, /',
            // elapsedTime: '500ms',
            requestTime: '2022-03-05T18:10:00+0000',
            trigger: '500ms'
        },
        {
            status: 200,
            URI: 'POST, /addUser',
            // elapsedTime: '1000ms',
            requestTime: '2022-03-08T14:05:00+0000',
            trigger: '200ms'
        },
        {
            status: 200,
            URI: 'GET, /',
            // elapsedTime: '40ms',
            requestTime: '2022-03-08T17:00:00+0000',
            trigger: '300ms'
        }
    ],
    // median CPU time

    // duration

    // bandwidth

    // granularity
}

module.exports = mockdb;