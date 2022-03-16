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
    // testRequest,
    createData,
    createLineGraph,
    createPieChart,
    // mockDBRequest,
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

    //////// COMMENTED OUT FOR TESTING
    // FETCH TO ROUTE WHERE WE RETRIEVE THE MAX SESSION NUMBER
    await fetch('http://localhost:3000/sessionNum', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    // ADD STORAGE OF SESSION NUMBER BELOW
  };

  const stop = async () => {
    workerTimer.stop = Date.now();
    // workerTimer.stop = performance.now();
    // mockDBRequest();

    //////// COMMENTED OUT FOR TESTING
    await fetch('http://localhost:3000/sessionLogs', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        // const logs = data;
        // console.log(logs);
        for (let i = 0; i < data.length; i++) {
          // if (logs[i].session_num === $sessionNum) {
          $mockLogArray.push(data[i]);
          // }
        }
      });

    console.log(`Mock Log Array: ${$mockLogArray}`);
  };

  const chart = () => {
    if ($chartFlag) alert('Please reset metrics before generating new ones');
    if (!$chartFlag) {
      ////////// COMMENTED OUT FOR TESTING
      createData($mockLogArray);
      // createData();
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
  <button on:click>Back to main page</button>
</div>

<style>
  .pieChart {
    margin: auto;
    width: 25%;
  }
</style>
