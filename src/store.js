import { writable } from 'svelte/store';
import Chart from 'chart.js/auto';

export const workers = [
  { id: 1, name: 'Worker 1' },
  { id: 2, name: 'Worker 2' },
  { id: 3, name: 'Worker 3' },
];

export const user = writable({
  email: 'Email',
  apiKey: 'API Key',
});

export const workerTimer = writable({
  start: 0,
  stop: 0,
  requestStart: 0,
  requestComplete: 0,
});

export const logArray = writable([
  {
    status: 200,
    elapsedTime: '460ms',
    URI: 'GET/category',
    requestTime: '9am',
  },
  {
    status: 204,
    elapsedTime: '506ms',
    URI: 'GET/category',
    requestTime: '10pm',
  },
]);

export const labels = [`${0}ms`];
export const succs = [0];
export const errs = [0];
export const subReqs = [0];
export const pieData = [0, 0, 0];
