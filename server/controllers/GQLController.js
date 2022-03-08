const express = require('express');
// const curl = require('curl');
const axios = require('axios');
const { graphql, buildSchema } = require('graphql');

const GQLController = {};

//j9dhZHx0KsB5BAM1awwi_Hb7MXmkLegg2RdHuw-W

//API KEY
// 93bee872cd4aacfcae9fb5ca6e27a9d7021d2
GQLController.getGQLData = (req, res, next) => {
    const cloudflare_email = 'airbenderosp@gmail.com';
    const cloudflare_api_key = '93bee872cd4aacfcae9fb5ca6e27a9d7021d2'
    // const cloudflare_api_token = 'j9dhZHx0KsB5BAM1awwi_Hb7MXmkLegg2RdHuw-W';
    const payload = {
        query: `query GetWorkersAnalytics($accountTag: string, $datetimeStart: string, $datetimeEnd: string, $scriptName: string) {
            viewer {
              accounts(filter: {accountTag: $accountTag}) {
                workersInvocationsAdaptive(limit: 100, filter: {
                  scriptName: $scriptName,
                  datetime_geq: $datetimeStart,
                  datetime_leq: $datetimeEnd
                }) {
                  sum {
                    subrequests
                    requests
                    errors
                  }
                  quantiles {
                    cpuTimeP50
                    cpuTimeP99
                  }
                  dimensions{
                    datetime
                    scriptName
                    status
                  }
                }
              }
            }
          }`,
          "variables": {
            "accountTag": "90f518ca7113dc0a91513972ba243ba5",
            "datetimeStart": "2020-05-04T00:00:00.000Z",
            "datetimeEnd": "2020-05-04T00:00:00.000Z",
            "scriptName": "worker-subrequest-test-client"
          }
}


//run in terminal "node server/server.js"
//listening on port 3000
//load http://localhost:3000/
axios.post('https://api.cloudflare.com/client/v4/graphql/', payload, {
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Email": cloudflare_email,
      "X-Auth-key": cloudflare_api_key
    }
  })
  .then(data => {
      console.log(data.data);
      res.json(data.data);
  })
  //https://axios-http.com/docs/handling_errors
  .catch(error => {
        console.log(error.response.data);
        console.log(JSON.stringify(error.response.data));
        console.log(error.response.status);
        console.log(error.response.headers);
    //   throw new Error();
  })
}

module.exports = GQLController;