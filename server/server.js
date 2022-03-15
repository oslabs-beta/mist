// NOTE: Do some more research into this function
// ROLE: This function works so and so
// TEST: --> WORKS

const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes/router.js');
const metricsController = require('./controllers/metricsController.js');

// const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ROLE: current path to process fetch request from miniflare server and store sessions in db
app.post('/allData', metricsController.siftMetrics, metricsController.addMetrics, (req, res) => {
    //NOTE: change once we've written out this route
    //console.log(req.body);
    res.json('hello from server 3000!');
});

// NOTE: invoked when pressed "stop"
app.get('/sessionLogs', metricsController.getSessionLogs, (req, res) => {
    res.json('our get request is working!');
})

// NOTE: getting the sessionNum when dev presses "start".
// Front-end needs to route their "start" to the route /sessionNum so that it gets invoked
app.get('/sessionNum', metricsController.getSessionNum, (req, res) => {
    res.json('sessionNum has been set!');
})

// app.use('/miniFlare', router);

// NOTE: temporary path for real data; change to '/'
app.use('/realData', router)

// NOTE: currently used for mock data
app.use('/', router, (req, res) => {
    res.json(res.locals.data)
})


//--------------------------ERROR HANDLING MIST---------------------------------------
//ROLE: catch-all route handler for requests made to unknown route
app.use((req, res) => res.status(404).send('Request sent to unknown page'));

//ROLE: error handling (standard & global)
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: {err: 'An error occured'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.stats).json(errorObj.message);
})

app.listen(PORT, () => {
  console.log(`listening on the port ${PORT}`);
});




module.exports = {
    app,
};
