const db = require('../models/metrics_model');

const metricsController = {
};

//NOTE: may have to re-visit this logic to ensure it's working
metricsController.getSessionNum = () => {
        console.log('in session num!!')
        // ROLE: get max session number from db
        const maxSession = db.query(`SELECT MAX(session_num) FROM metrics`);
        return maxSession + 1;
}

metricsController.siftMetrics = (req, res, next) => {
        try {
        const { method, url, status, responseTime } = req.body;
        // ROLE: save those data points in our own object in the correct format
        const metrics = {
                method,
                url,
                status
        };
        // ROLE: convert response time to a float w/o ms
        metrics.responseTime = Number(responseTime.replace(/[A-Za-z]/g, ''));

        //ROLE: get our session number
        let sessionNum
        typeof metricsController.getSessionNum() === 'number' ? sessionNum = metricsController.getSessionNum() : sessionNum = 1;
        metrics.sessionNum = sessionNum;

        //ROLE: get our 'start' time
        metrics.start = Date.now();
        console.log(`these are our metrics`, metrics);
        return next()
        
        // ROLE: error handling
        } catch(err) {
                console.log(err);
                next(err);        
        }
}

metricsController.addMetrics = (req, res, next) => {
        return next()
}

/*
{
        start,
        method,
        url,
        status,
	responseTime
      }

    "_id" serial PRIMARY KEY,
    "method" VARCHAR(8),
    "url" VARCHAR(100),
    "status" INTEGER,
    "response_time_ms" FLOAT,
    "session_num" INTEGER,
    "start" VARCHAR


*/

module.exports = metricsController;