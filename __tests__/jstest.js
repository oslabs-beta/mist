/**
 * @jest-environment jsdom
 */

// import from store
import Chart from 'chart.js/auto';
import {
  workerTimer,
  labels,
  succs,
  errs,
  pieData,
  currentWorker,
  sessAvgs,
  sessNums,
} from './store';

// import from functions
const createData = require('../src/functions.js');
const createScatterChart = require('../src/functions.js');
const createPieChart = require('../src/functions.js');
const createBarGraph = require('../src/functions.js');

const functions = require('../src/functions.js');

describe('create data function unit tests', () => {
  it('receives truthy logs and avgLogs parameters'); {
      expect(logs).toBe(true);
  }
})