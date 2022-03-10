<script>
  import LineGraph from './charts/LineGraph.svelte';
  import Table from './charts/Table.svelte';
  import PieChart from './charts/PieChart.svelte';
  import { workerTimer } from '../store.js';
  import {
    testRequest,
    createData,
    createLineGraph,
    createPieChart,
  } from '../functions.js';

  $: console.log(workerTimer);
  let uniqueKey = {};
  let chartFlag = false;

  const start = () => {
    workerTimer.start = performance.now();
    testRequest();
  };

  const stop = () => {
    workerTimer.stop = performance.now();
  };

  const chart = () => {
    if (chartFlag) alert('Please reset metrics before generating new ones');
    createData();
    chartFlag = true;
    setTimeout(() => {
      createLineGraph();
      createPieChart();
    }, 1000);
  };

  const resetChart = () => {
    uniqueKey = {};
    chartFlag = false;
  };
</script>

<!-- html goes here -->

<div class="backdrop">
  <slot />
  <button on:click={start}>Start</button>
  <button on:click={stop}>Stop</button>
  <div>
    <button on:click={chart}>Generate Metrics</button>
    <button on:click={resetChart}>Reset Metrics</button>
  </div>
  {#key uniqueKey}
    {#if chartFlag}
      <Table />
    {/if}
    <div class="lineGraph">
      <LineGraph />
    </div>
    <div class="pieChart">
      <PieChart />
    </div>
  {/key}

  <!-- <PieChart /> -->
  <!-- <PieChart /> -->
  <button on:click>Back to workers</button>
</div>

<style>
  .pieChart {
    margin: auto;
    width: 25%;
  }
</style>
