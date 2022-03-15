const db = require('../models/metrics_model');

const metricsController = {
        sessionNum: 1
};

//NOTE: This middleware is invoked when dev presses on "start" on the front-end
// It collects the max sessionNum from our database and increments it by one
// We then store this value in our metricsController object to be used by siftMetrics when dev triggers requests (GET / POST / PATCH / etc.)
metricsController.getSessionNum = (req, res, next) => {
        console.log('in session num!!')
        // ROLE: get max session number from db
        db.query(`SELECT MAX(session_num) FROM metrics`)
                .then(res => {
                        console.log('res from maxSession:', res.rows[0].max);
                        //set the sessionNum to be one greater than the max that we got from table
                        if (res.rows[0].max) metricsController.sessionNum = res.rows[0].max + 1;
                        return next()
                })
                .catch((err) => {
                        return next({
                                log: `Cannot get session number. ERROR: ${err}`,
                                message: { err: 'Error occurred in metricsController' }
                        });
                });

}

//invoked once stop is pressed
metricsController.getSessionLogs = (req, res, next) => {
        // metricsController.incrSession = true;
        // const maxSession = db.query(`SELECT MAX(session_num) FROM metrics`);
        console.log('getting session logs!');
        const query = `SELECT * FROM metrics WHERE session_num = $1 LIMIT 500`
        //db.query(query, [sessionNum])
        db.query(query, [metricsController.sessionNum])
                .then((data) => {
                        //store something to send to the front-end here... i think it'll be in the res.rows
                        console.log(`this is our data`, data.rows);
                        res.locals.logs = data.rows; 
                        console.log(`this is our res.locals.logs`, res.locals.logs)
                        return next();
                })
                .catch((err) => {
                        return next({
                                log: `Cannot get session logs. ERROR: ${err}`,
                                message: { err: 'Error occurred in metricsController' }
                        });
                })
}

// ROLE: adding requests from dev app to the database
metricsController.siftMetrics = async (req, res, next) => {
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
                metrics.sessionNum = metricsController.sessionNum;

                //ROLE: get our 'start' time
                metrics.start = Date.now();
                console.log(`these are our metrics`, metrics);
                res.locals.metrics = metrics;
                return next()

                // ROLE: error handling
        } catch (err) {
                console.log(err);
                next(err);
        }
}


metricsController.addMetrics = (req, res, next) => {
        console.log('in add metrics controller');
        //destructure res.locals.metrics to get our metrics data
        const { method, url, status, responseTime, sessionNum, start } = res.locals.metrics;
        //set up a SQL query to our db that adds all of these data points! Use those $
        const query = `INSERT INTO metrics (method, url, status, response_time_ms, session_num, start) VALUES ($1, $2, $3, $4, $5, $6)`
        //call db.query(queryName, [array of metrics in order])
        db.query(query, [method, url, status, responseTime, sessionNum, start])
                .then(res => {
                        return next()
                })
                //NOTE: potentially build out error handling message
                .catch((err) => {
                        return next({
                                log: `Cannot add to table. ERROR: ${err}`,
                                message: { err: 'Error occurred in metricsController' }
                        });
                })
}





module.exports = metricsController;