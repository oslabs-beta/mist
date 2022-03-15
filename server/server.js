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

<<<<<<< HEAD
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
=======
//--------------------------INITIALIZING SERVER MIST----------------------------------
//ROLE: Set up the app that accesses our front-end
//NOTE: change all instances of this app to appMist
const appMist = express();
const PORTMist = 3000;
appMist.use(express.json());
appMist.use(express.urlencoded({ extended: true }));
appMist.use(cors());

//--------------------------INITIALIZING SERVER FLARE---------------------------------

// const appFlare = express();
// const PORTFlare = 3001;
// appFlare.use(express.json());
// appFlare.use(express.urlencoded({ extended: true }));
// appFlare.use(cors());
//localhost:9230 <-- what chrome is listening on to get analytics

//--------------------------ROUTING REQUESTS MIST-------------------------------------

// NOTE: currently used for mock data
appMist.use('/', router, (req, res) => {
  res.json(res.locals.data);
});
>>>>>>> dev

// NOTE: getting the sessionNum when dev presses "start".
// Front-end needs to route their "start" to the route /sessionNum so that it gets invoked
app.get('/sessionNum', metricsController.getSessionNum, (req, res) => {
    res.json('sessionNum has been set!');
})

// app.use('/miniFlare', router);

// NOTE: temporary path for real data; change to '/'
<<<<<<< HEAD
app.use('/realData', router)

// NOTE: currently used for mock data
app.use('/', router, (req, res) => {
    res.json(res.locals.data)
})

=======
// appMist.use('/realData', router);

//--------------------------ROUTING REQUESTS FLARE------------------------------------
// appFlare.use('/', (req, res) => {
//   console.log('we got a request!');
//   //res.json()
// });
>>>>>>> dev

//--------------------------ERROR HANDLING MIST---------------------------------------
//ROLE: catch-all route handler for requests made to unknown route
app.use((req, res) => res.status(404).send('Request sent to unknown page'));

//ROLE: error handling (standard & global)
<<<<<<< HEAD
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
=======
appMist.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.stats).json(errorObj.message);
});

// app.listen(PORT, () => {
//   console.log(`listening on the port ${PORT}`);
// });

//--------------------------ERROR HANDLING FLARE--------------------------------------
// appFlare.use((req, res) =>
//   res.status(404).send('Request sent to unknown page')
// );

// //ROLE: error handling (standard & global)
// appFlare.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occured' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.stats).json(errorObj.message);
// });

//----------------SET MIST TO LISTEN ON PORTMIST--------------------------------------
appMist.listen(PORTMist, () => {
  console.log(`listening on the port ${PORTMist}`);
});

//----------------SET FLARE TO LISTEN ON PORTFLARE------------------------------------

// appFlare.listen(PORTFlare, () => {console.log(`listening on the port ${PORTFlare}`)});

module.exports = {
  appMist,
  // appFlare,
>>>>>>> dev
};
