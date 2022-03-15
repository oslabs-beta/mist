<script>
  import axios from 'axios';
  import LineGraph from './charts/LineGraph.svelte';
  import Table from './charts/Table.svelte';
  import PieChart from './charts/PieChart.svelte';
  import {
    workerTimer,
    chartFlag,
    theme,
    previousTheme,
    logArray,
    mockLogArray,
    sessionNum,
  } from '../store.js';
  import {
    testRequest,
    createData,
    createLineGraph,
    createPieChart,
    mockDBRequest,
  } from '../functions.js';

  $: console.log(workerTimer);
  $: console.log(`here's the chart flag: ${chartFlag}`);
  $: console.log(logArray);
  $: console.log(mockLogArray);

  let uniqueKey = {};

  const start = async () => {
    workerTimer.start = Date.now();
    console.log(`Session Number: ${$sessionNum}`);
    // workerTimer.start = performance.now();
    // testRequest();

    // FETCH TO ROUTE WHERE WE RETRIEVE THE MAX SESSION NUMBER
    await fetch('http://localhost:3000//sessionNum', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    // ADD STORAGE OF SESSION NUMBER BELOW
  };

  const stop = async () => {
    workerTimer.stop = Date.now();
    // workerTimer.stop = performance.now();
    // mockDBRequest();

    await fetch('http://localhost:3000/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        const logs = data.logs;
        console.log(logs);
        for (let i = 0; i < logs.length; i++) {
          if (logs[i].session_num === $sessionNum) {
            $mockLogArray.push(logs[i]);
          }
        }
      });

    console.log($mockLogArray);
  };

  const chart = () => {
    if ($chartFlag) alert('Please reset metrics before generating new ones');
    if (!$chartFlag) {
      createData($mockLogArray);
      $chartFlag = true;
      setTimeout(() => {
        createLineGraph();
        createPieChart();
      }, 2000);
    }
    console.log($mockLogArray);
  };

  const resetChart = () => {
    uniqueKey = {};
    mockLogArray.set([]);
    // TO INCREMENT SESSION NUMBER...
    $sessionNum++;
    $chartFlag = false;
    console.log($mockLogArray);
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
    {#if $chartFlag}
      <div class="table">
        <Table />
      </div>
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
