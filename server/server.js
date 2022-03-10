// NOTE: Do some more research into this function
// ROLE: This function works so and so
// TEST: --> WORKS

const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes/router.js');

// const WebSocket = require('ws');
// const server = new WebSocket.Server({ port: '8787' });

// server.on('connection', socket => {
//     socket.on('message', message => {
//         console.log(`happening in ${socket}`)
//         console.log(message);
//         // socket.send(`hey! it's working!!`);
//     })
// })


//--------------------------INITIALIZING SERVER MIST----------------------------------
//ROLE: Set up the app that accesses our front-end
//NOTE: change all instances of this app to appMist
const appMist = express();
const PORTMist = 3000;
appMist.use(express.json());
appMist.use(express.urlencoded({ extended: true }));
appMist.use(cors());

//--------------------------INITIALIZING SERVER FLARE---------------------------------

const appFlare = express();
const PORTFlare = 3001;
appFlare.use(express.json());
appFlare.use(express.urlencoded({ extended: true }));
appFlare.use(cors());
//localhost:9230 <-- what chrome is listening on to get analytics


//--------------------------ROUTING REQUESTS MIST-------------------------------------

// NOTE: currently used for mock data
appMist.use('/', router, (req, res) => {
    res.json(res.locals.data)
})

// NOTE: temporary path for real data; change to '/'
appMist.use('/realData', router)



//--------------------------ROUTING REQUESTS FLARE------------------------------------
appFlare.use('/', (req, res) => {
    console.log('we got a request!');
    //res.json()
})



//--------------------------ERROR HANDLING MIST---------------------------------------
//ROLE: catch-all route handler for requests made to unknown route
appMist.use((req, res) => res.status(404).send('Request sent to unknown page'));

//ROLE: error handling (standard & global)
appMist.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: {err: 'An error occured'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.stats).json(errorObj.message);
})


//--------------------------ERROR HANDLING FLARE--------------------------------------
appFlare.use((req, res) => res.status(404).send('Request sent to unknown page'));

//ROLE: error handling (standard & global)
appFlare.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: {err: 'An error occured'},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.stats).json(errorObj.message);
})



//----------------SET MIST TO LISTEN ON PORTMIST--------------------------------------
appMist.listen(PORTMist, () => {console.log(`listening on the port ${PORTMist}`)});


//----------------SET FLARE TO LISTEN ON PORTFLARE------------------------------------

appFlare.listen(PORTFlare, () => {console.log(`listening on the port ${PORTFlare}`)});



module.exports = {
    appMist,
    appFlare
};