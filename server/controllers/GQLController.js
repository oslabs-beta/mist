const express = require('express');
const curl = require('curl');
const axios = require('axios');
const { graphql, buildSchema } = require('graphql');
const mockdb = require('../models/mockdb.js');

const GQLController = {};

GQLController.getMockData = (req, res, next) => {
  //access data from mockdb
  //serve back to front-end-- store in res.locals
  // console.log(JSON.parse(mockdb));
  res.locals.data = mockdb;
  return next();
};

//j9dhZHx0KsB5BAM1awwi_Hb7MXmkLegg2RdHuw-W

//API KEY
// 93bee872cd4aacfcae9fb5ca6e27a9d7021d2

/* NOTE: GETTING PAST ACCOUNT PERMISSIONS BLOCK
  1) Set accountTag to account Id, which can be found in Cloudflare dashboard
  2) Accounts needs to have a filter option or it won't work
  3) Set permissions in Cloudflare dashboard 
    a) account --> account analytics --> read
    b) zone --> logs --> read
    c) zone --> analytics --> read
*/

GQLController.getGQLData = (req, res, next) => {
  const cloudflare_email = 'airbenderosp@gmail.com';
  const cloudflare_api_key = '93bee872cd4aacfcae9fb5ca6e27a9d7021d2';
  const cloudflare_api_token = 'j9dhZHx0KsB5BAM1awwi_Hb7MXmkLegg2RdHuw-W';
  //NOTE: when abstracting away, this cloudflare_id needs to be used for the 'account tag' value
  const cloudflare_id = 'b3b6a9170e95e7d2694f728cfe832d2b';
  const payload = {
    query: `query {
          viewer {
            accounts(filter: {accountTag: $accountTag}) {
              workersInvocationsAdaptive(
                limit: 100, filter: {
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

    variables: {
      accountTag: cloudflare_id,
      datetimeStart: '2022-03-09T10:05:00.000Z',
      datetimeEnd: '2022-03-09T23:00:00.000Z',
    },
  };

  //run in terminal "node server/server.js"
  //listening on port 3000
  //load http://localhost:3000/
  axios
    .post('https://api.cloudflare.com/client/v4/graphql/', payload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Email': cloudflare_email,
        // "X-Auth-key": cloudflare_api_key
        Authorization: 'Bearer j9dhZHx0KsB5BAM1awwi_Hb7MXmkLegg2RdHuw-W',
      },
    })
    .then((data) => {
      console.log(data.data);
      res.json(data.data);
    })
    //https://axios-http.com/docs/handling_errors
    .catch((error) => {
      console.log(error.response.data);
      console.log(JSON.stringify(error.response.data));
      console.log(error.response.status);
      console.log(error.response.headers);
      throw new Error();
    });
};

module.exports = GQLController;
// {"result":{
//   "id":"8575b81cfcc14b9faef43a176cb9a5ce",
//   "status":"active"
//   ,"not_before":"2022-03-07T00:00:00Z"
//   ,"expires_on":"2022-04-14T23:59:59Z"
// },
//   "success":true,
//   "errors":[],
//   "messages":[{"code":10000,"message":"This API Token is valid and active","type":null}
// ]}%

// "query" : `
//   query {
//     __schema {
//       types {
//         name {
//           viewer
//         }
//       }
//     }
//   }`,

// query: `query GetWorkersAnalytics($accountTag: string, $datetimeStart: string, $datetimeEnd: string, $scriptName: string) {
//     viewer {
//       accounts(filter: {accountTag: $accountTag}) {
//         workersInvocationsAdaptive(limit: 100, filter: {
//           scriptName: $scriptName,
//           datetime_geq: $datetimeStart,
//           datetime_leq: $datetimeEnd
//         }) {
//           sum {
//             subrequests
//             requests
//             errors
//           }
// quantiles {
//   cpuTimeP50
//   cpuTimeP99
// }
// dimensions{
//   datetime
//   scriptName
//   status
// }
//         }
//       }
//     }
//   }`,
