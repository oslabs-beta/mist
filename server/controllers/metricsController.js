const db = require('../models/metrics_model');

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
  const query = `SELECT * FROM metrics WHERE session_num = $1 LIMIT 500`;
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
metricsController.siftMetrics = async (req, res, next) => {
  try {
    const { method, url, status, responseTime } = req.body;
    // ROLE: save those data points in our own object in the correct format
    const metrics = {
      method,
      url,
      status,
    };
    // ROLE: convert response time to a float w/o ms
    metrics.responseTime = Number(responseTime.replace(/[A-Za-z]/g, ''));

    //ROLE: get our session number
    metrics.sessionNum = metricsController.sessionNum;

    //ROLE: get our 'start' time
    metrics.start = Date.now();
    res.locals.metrics = metrics;
    return next();

    // ROLE: error handling
  } catch (err) {
    return next({
      log: `Cannot sift metrics. ERROR: ${err}`,
      message: { err: 'Error occurred in metricsController.siftMetrics' },
    });
  }
};

metricsController.addMetrics = (req, res, next) => {
  console.log('in add metrics controller');
  //destructure res.locals.metrics to get our metrics data
  const { method, url, status, responseTime, sessionNum, start } =
    res.locals.metrics;
  //set up a SQL query to our db that adds all of these data points! Use those $
  const query = `INSERT INTO metrics (method, url, status, response_time_ms, session_num, start) VALUES ($1, $2, $3, $4, $5, $6)`;
  //call db.query(queryName, [array of metrics in order])
  console.log(`these are our metrics`, res.locals.metrics)
  db.query(query, [method, url, status, responseTime, sessionNum, start])
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

module.exports = metricsController;
