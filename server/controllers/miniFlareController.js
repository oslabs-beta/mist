const express = require('express');
const curl = require('curl');
const axios = require('axios');
const { graphql, buildSchema } = require('graphql');
const mockdb = require('../models/mockdb.js');
const { response } = require('express');

const miniFlareController = {};

miniFlareController.getRequests = (req,res,next) => {
    console.log('in Controller');
    axios.get('http://localhost:8787/')
    .then(({data})=>{
        console.log(data);
        res.locals.data = data;
    });
    return next();
    // fetch from server 8787
}

module.exports = miniFlareController;