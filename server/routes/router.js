const express = require('express');
const router = express.Router();
const GQLController = require('../controllers/GQLController.js');

// const GQLController = import(path.join(__dirname, '../controllers/GQLController'));

// NOTE: current path to real data; make just "/" later
router.get('/realData', GQLController.getGQLData); 

// NOTE: temporary path to mock data; comment out or delete once query is working
router.get('/', GQLController.getMockData);



module.exports = router;