const express = require('express');
const cors = require('cors');
const metricsController = require('./controllers/metricsController.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/v1/traces', (req, res) => {
  console.log('made it to the server 3000 from traces!');
  console.log(`this is our req.body`, req.body);
  for (let prop in req.body.resourceSpans[0].resource) {
    console.log(
      `this is the resource`,
      prop,
      ':',
      req.body.resourceSpans[0].resource[prop]
    );
  }
  for (
    let i = 0;
    i < req.body.resourceSpans[0].instrumentationLibrarySpans;
    i++
  ) {
    console.log(`this is the instrumentationLibrarySpans`, prop);
  }
  res.json('hi from 3000!');
});

// ROLE: processes fetch request from miniflare server and store sessions in db
app.post(
  '/allData',
  metricsController.siftMetrics,
  metricsController.addMetrics,
  (req, res) => {
    res.json('hello from server 3000!');
  }
);

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
