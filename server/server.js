// NOTE: Do some more research into this function
// ROLE: This function works so and so
// TEST: --> WORKS

const express = require('express');
const path = require('path');
const cors = require('cors');
const router = require('./routes/router.js');
// const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//NOTE: current path to process fetch request from miniflare server
app.use('/allData', router, (req, res) => {
    //NOTE: change once we've written out this route
    console.log(req.body);
    res.json('hello from server 3000!');
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
