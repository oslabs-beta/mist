/**
 * @jest-environment jsdom
 */

// import from store
// import Chart from 'chart.js/auto';
// import {
//   workerTimer,
//   labels,
//   succs,
//   errs,
//   pieData,
//   currentWorker,
//   sessAvgs,
//   sessNums,
// } from './store';

// import from functions
const createData = require('../src/functions.js');
const createScatterChart = require('../src/functions.js');
const createPieChart = require('../src/functions.js');
const createBarGraph = require('../src/functions.js');


const functions = require('../src/functions.js');

describe('create data function unit tests', () => {
  it('receives truthy logs and avgLogs parameters', () => {
      const logs = [{
        _id: 193,
        method: 'GET',
        url: '/',
        status: 200,
        response_time_ms: 4.3,
        session_num: 30,
        start: '1647906546879',
        worker: 'sample-worker-2',
      },
      {
        _id: 194,
        method: 'GET',
        url: '/favicon.ico',
        status: 200,
        response_time_ms: 2.36,
        session_num: 30,
        start: '1647906547045',
        worker: 'sample-worker-2',
      }]
      const avgLogs = [{
        response_time_ms: 4.18, 
        session_num: 26 
      },
      { 
        response_time_ms: 0.68, 
        session_num: 26 
      }]
      createData(logs, avgLogs)
      expect(logs).toBe(true);
  });
})
