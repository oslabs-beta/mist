<script>
  import Chart from './Chart.svelte';
  import { timer } from '../store.js';
  // let startTime;
  // let stopTime;
  // $: console.log(timer.start);
  // $: console.log(timer.stop);
  const start = () => {
    timer.start = performance.now();
  };
  const stop = () => {
    timer.stop = performance.now();
    console.log(`Start: ${timer.start}, Stop: ${timer.stop}`);
  };
</script>

<!-- html goes here -->

<div class="backdrop">
  <slot />
  <button on:click={start}>Start</button>
  <button on:click={stop}>Stop</button>
  <Chart />
  <button on:click>Back to workers</button>
</div>

<style>
</style>
