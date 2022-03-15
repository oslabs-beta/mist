const express = require('express');
const router = express.Router();
const GQLController = require('../controllers/GQLController.js');
const miniFlareController = require('../controllers/miniFlareController.js');
const metricsController = require('../controllers/metricsController.js');


// When front-end hits "start", router.get is invoked every 1ms
router.get('/miniFlare', miniFlareController.getRequests, (req, res) => {
    console.log(`back in the router!`)
    return res.json(res.locals.data);
});

// router.use('/allData', metricsController.siftMetrics, metricsController.addMetrics, (req, res) => {
//     return res.json('hey!');
// })




// const GQLController = import(path.join(__dirname, '../controllers/GQLController'));

// NOTE: current path to real data; make just "/" later
router.get('/realData', GQLController.getGQLData);

// NOTE: temporary path to mock data; comment out or delete once query is working
router.get('/', GQLController.getMockData);

module.exports = router;
