<script>
  import ScatterChart from './charts/ScatterChart.svelte';
  import Table from './charts/Table.svelte';
  import PieChart from './charts/PieChart.svelte';
  import BarGraph from './charts/BarGraph.svelte';
  import {
    workerTimer,
    workerName,
    chartFlag,
    mockLogArray,
    mockAvgsArray,
    sessionNum,
  } from '../store.js';
  import {
    createData,
    createScatterChart,
    createPieChart,
    createBarGraph,
  } from '../functions.js';

  $: console.log(workerTimer);
  $: console.log(`here's the chart flag: ${chartFlag}`);
  $: console.log(mockLogArray);

  let uniqueKey = {};

  // start() sets beginning point in time for worker requests to get plotted against and retrieves recording session number
  const start = async () => {
    workerTimer.start = Date.now();
    console.log(`Session Number: ${$sessionNum}`);

    // FETCH TO ROUTE WHERE WE RETRIEVE THE MAX SESSION NUMBER
    await fetch('http://localhost:3000/sessionNum', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    // ADD STORAGE OF SESSION NUMBER BELOW
  };

  // stop() sets end point of recording session and initiates fetch requests to retrieve session logs from DB
  const stop = async () => {
    workerTimer.stop = Date.now();

    await fetch('http://localhost:3000/sessionLogs', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        $workerName = data[0].worker;
        // const logs = data;
        // console.log(logs);
        for (let i = 0; i < data.length; i++) {
          // if (logs[i].session_num === $sessionNum) {
          $mockLogArray.push(data[i]);
          // }
        }
      });
    await fetch(`http://localhost:3000/averageData/${$workerName}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((data) => data.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.session_num - b.session_num)
        for (let i = 0; i < sortedData.length; i++) {
          $mockAvgsArray.push(sortedData[i]);
        }
      });
    console.log(`Your worker is ${$workerName}`);
    console.log(`Mock Log Array: ${$mockLogArray}`);
  };

  // chart() generates metrics data from fetched session logs and initiates charting functions
  const chart = () => {
    if ($chartFlag) alert('Please reset metrics before generating new ones');
    if (!$chartFlag) {
      ///////////////// COMMENTED OUT FOR TESTING //////////////////
       createData($mockLogArray, $mockAvgsArray);
      // LIVE createData() ⤴️
      // TEST createData() ⤵️
      //createData();
      $chartFlag = true;
      setTimeout(() => {
        createScatterChart();
        createPieChart();
        createBarGraph();
      }, 2000);
    }
    console.log($mockAvgsArray);
    console.log($mockLogArray);
  };

  // resetChart() resets the graph components (via uniqueKey) as well as the store, readying the app for the next recording session
  const resetChart = () => {
    uniqueKey = {};
    mockLogArray.set([]);
    mockAvgsArray.set([]);
    // TO INCREMENT SESSION NUMBER...
    $sessionNum++;
    $chartFlag = false;
    console.log($mockLogArray);
  };
</script>

<!-- html goes here -->

<div class="backdrop">
  <slot />
  <button class="startBtn" on:click={start}>Start</button>
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
      <ScatterChart />
    </div>
    <div class="pieChart">
      <PieChart />
    </div>
    <div class="barChart">
      <div class="innerBarChart">
        <BarGraph />
      </div>
    </div>
  {/key}
</div>

<style>
  .startBtn:focus {
    background-color: #868686;
  }
  .pieChart {
    margin: auto;
    width: 25%;
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>
