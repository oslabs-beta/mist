const db = require('../models/metrics_model');
const path = require('path')
const dotenv = require('dotenv')
dotenv.config();

const workerName = process.env.WORKER_NAME;

const metricsController = {
  sessionNum: 1,
};

//ROLE: Increments the sessionNum
metricsController.getSessionNum = (req, res, next) => {
  // ROLE: get max session number from db
  db.query(`SELECT MAX(session_num) FROM metrics`)
    .then((res) => {
      //ROLE: sets the sessionNum to be one greater than the max from *metrics* table
      if (res.rows[0].max) metricsController.sessionNum = res.rows[0].max + 1;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Cannot get session number. ERROR: ${err}`,
        message: { err: 'Error occurred in metricsController.getSessionNum' },
      });
    });
};

// ROLE: Selects metrics from the database for the current sessionNum and stores them in res.locals.logs
metricsController.getSessionLogs = (req, res, next) => {
  const { worker } = req.params;
  //const query = `SELECT * FROM metrics WHERE session_num = (SELECT MAX(session_num) FROM metrics WHERE worker = $1)`;
  const query = `SELECT * FROM metrics WHERE session_num = $1`;
  db.query(query, [metricsController.sessionNum])
    .then((data) => {
      res.locals.logs = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Cannot get session logs. ERROR: ${err}`,
        message: { err: 'Error occurred in metricsController.getSessionLogs' },
      });
    });
};

// ROLE: adding requests from dev app to the *metrics* table in database
metricsController.siftMetricsTel = (req, res, next) => {
  try {
    const method = req.body.resourceSpans[0].instrumentationLibrarySpans[0].spans[0].attributes[3].value.stringValue;
    const status = req.body.resourceSpans[0].instrumentationLibrarySpans[0].spans[0].attributes[12].value.intValue;
    const start = Math.round(req.body.resourceSpans[0].instrumentationLibrarySpans[0].spans[0].startTimeUnixNano / 1000);
    const url  = req.body.resourceSpans[0].instrumentationLibrarySpans[0].spans[0].attributes[4].value.stringValue;
    const responseTime = ((req.body.resourceSpans[0].instrumentationLibrarySpans[0].spans[0].endTimeUnixNano / 1000) - start)/1000;
    // ROLE: save those data points in our own object in the correct format
    const metrics = {
      method,
      status,
      start,
      url,
      responseTime
    }
    // ROLE: get our worker name 
    metrics.workerName = workerName;
    //ROLE: get our session number
    metrics.sessionNum = metricsController.sessionNum;
    console.log(`these are our metrics`, metrics)
    res.locals.metrics = metrics;
    return next()
  }
  // ROLE: error handling
   catch(err){
    return next({
      log: `Cannot sift metrics. ERROR: ${err}`,
      message: { err: 'Error occurred in metricsController.siftMetrics' },
    });
  }
}


//ROLE: Add metrics into the database once they are in the proper format
metricsController.addMetrics = (req, res, next) => {
  console.log('in add metrics controller');
  //destructure res.locals.metrics to get our metrics data
  const { method, url, status, responseTime, sessionNum, start, workerName } =
    res.locals.metrics;
  //set up a SQL query to our db that adds all of these data points! Use those $
  const query = `INSERT INTO metrics (method, url, status, response_time_ms, session_num, start, worker) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  //call db.query(queryName, [array of metrics in order])
  console.log(`these are our metrics`, res.locals.metrics);
  db.query(query, [
    method,
    url,
    status,
    responseTime,
    sessionNum,
    start,
    workerName,
  ])
    .then((res) => {
      return next();
    })
    //NOTE: potentially build out error handling message
    .catch((err) => {
      return next({
        log: `Cannot add to table. ERROR: ${err}`,
        message: { err: 'Error occurred in metricsController.addMetrics' },
      });
    });
};

//ROLE: Get the average response times of the last 5 sessions for a particular worker
metricsController.getAverageData = (req, res, next) => {
  const { workerName } = req.params;
  const query = `SELECT response_time_ms, session_num FROM metrics 
  WHERE worker = $1 
  AND session_num >
  (SELECT MAX(session_num) FROM metrics WHERE worker = $1) - 5`;
  db.query(query, [workerName])
    .then((data) => {
      res.locals.averages = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Cannot get averages. ERROR: ${err}`,
        message: { err: 'Error occurred in metricsController.getAverageData' },
      });
    });
};

module.exports = metricsController;
