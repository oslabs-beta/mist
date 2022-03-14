const db = require('../models/metrics_model');

const metricsController = {
        session: this.getSessionNum() || 1,
};

//NOTE: may have to re-visit this logic to ensure it's working
metricsController.getSessionNum = () => {
        //get max session number from db
        const maxSession = db.query(`SELECT MAX(session_num) FROM metrics`);
        return maxSession;
}

metricsController.siftMetrics = (req, res, next) => {
        //deconstruct our res.body
        const { method, url, status, responseTime } = res.body;
        //save those data points in our own object in the correct format
        const metrics = {
                method,
                url
        };
        //convert status to a number and add ot metrics
        metrics.status = Number(status);
        //convert response time to a float w/o ms
        metrics.responseTime = Number(responseTime.replace(/[A-Za-z]/g, ''));
        
        //get our session number

        //get our 'start' time
}

metricsController.addMetrics = (req, res, next) => {
        next()
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