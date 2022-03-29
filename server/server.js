const express = require('express');
const cors = require('cors');
const metricsController = require('./controllers/metricsController.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ROLE: processes trace post request from miniflare server and store sessions in database
app.use('/v1/traces', metricsController.siftMetricsTel, metricsController.addMetrics, (req, res) => {
  res.json('hello from 3000!');
});


// ROLE: getting sessionNum when dev presses "start" adds 1 to the current max session num in database
app.get('/sessionNum', metricsController.getSessionNum, (req, res) => {
  res.json('sessionNum has been set!');
});

// ROLE: invoked when pressed "stop" to get session logs from database
app.get('/sessionLogs', metricsController.getSessionLogs, (req, res) => {
  console.log(res.locals.logs);
  res.json(res.locals.logs);
});

// ROLE: retrieve average response times for the previous few sessions with that worker
app.get(
  '/averageData/:workerName',
  metricsController.getAverageData,
  (req, res) => {
    console.log(res.locals.averages);
    res.json(res.locals.averages);
  }
);

//--------------------------ERROR HANDLING---------------------------------------
//ROLE: catch-all route handler for requests made to unknown route
app.use('/*', (req, res) =>
  res.status(404).send('Request sent to unknown page')
);

//ROLE: error handling (standard & global)
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.stats).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`listening on the port ${PORT}`);
});

module.exports = app;
