import { writable } from 'svelte/store';

export const workers = [
  { id: 1, name: 'Worker 1' },
  { id: 2, name: 'Worker 2' },
  { id: 3, name: 'Worker 3' },
];

export const user = writable({
  email: 'Email',
  apiKey: 'API Key',
});

export const timer = writable({
  start: 0,
  stop: 0,
});
