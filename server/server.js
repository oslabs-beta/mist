const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');
const router = require('./routes/router.js');
// const router = import(path.join(__dirname, './routes/router'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// NOTE: Do some more research into this function
// ROLE: This function works so and so
// TEST: --> WORKS

// NOTE: currently used for mock data
app.use('/', router, (req, res) => {
    res.json(res.locals.data)
})

// NOTE: temporary path for real data; change to '/'
app.use('/realData', router)


//----------------ERROR HANDLING--------------------------
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


app.listen(PORT, () => {console.log(`listening on the port ${PORT}`)});

module.exports = app;