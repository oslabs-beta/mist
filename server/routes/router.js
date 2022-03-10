const express = require('express');
const router = express.Router();
const GQLController = require('../controllers/GQLController.js');
// const GQLController = import(path.join(__dirname, '../controllers/GQLController'));

router.get('/', GQLController.getGQLData);

module.exports = router;
