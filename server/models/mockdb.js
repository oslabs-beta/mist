//yay! comments!

export default mockdb = {
    //number of requests w/ err, succ, cub
    requests: {
        sum: 5,
        errors: 2,
        successes: 3,
        subrequests: 0
    },
    //logs
    logs: [
        {
            status: 'ready',
            trigger: 'GET',
            URL: 'facebook.com',
            time: '500ms'
        },
        {
            status: 'ready',
            trigger: 'POST',
            URL: 'instagram.com',
            time: '1000ms'
        },
        {
            status: 'ready',
            trigger: 'GET',
            URL: 'pinterest.com',
            time: '40ms'
        }
    ],
    // median CPU time

    // duration

    // bandwidth

    // granularity
}