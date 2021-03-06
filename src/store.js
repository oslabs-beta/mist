// ROLE: our application's core reactive variables, and visualization data variables are declared and held. Please see the appSetup file inside of the docs directory for additional info
import { writable } from 'svelte/store';

export let theme = writable('Misty');
export let previousTheme = writable('Misty');
export let chartFlag = writable(false);
export let genMet = writable(false);
export let loading = writable(false);

export let sessionNum = writable(1);
export let workerName = writable('Worker');

export const workerTimer = writable({
  start: 0,
  stop: 0,
});

export const mockLogArray = writable([]);
export const mockAvgsArray = writable([]);

export const labels = [0];
export const succs = [];
export const errs = [];
export const subReqs = [];
export const pieData = [0, 0];

export const currentWorker = [];
export const sessNums = [];
export const sessAvgs = [];
