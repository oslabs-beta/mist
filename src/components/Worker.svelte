<script>
  import LoadingModal from './LoadingModal.svelte';
  import ScatterChart from './charts/ScatterChart.svelte';
  import Table from './charts/Table.svelte';
  import PieChart from './charts/PieChart.svelte';
  import BarGraph from './charts/BarGraph.svelte';
  import {
    workerTimer,
    workerName,
    chartFlag,
    genMet,
    loading,
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

  // $: console.log(workerTimer);
  // $: console.log(`here's the chart flag: ${chartFlag}`);
  // $: console.log(mockLogArray);

  // uniqueKey is used to remount charts after data is reset
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
  };

  // stop() sets end point of recording session and initiates fetch requests to retrieve session logs from DB
  const stop = async () => {
    workerTimer.stop = Date.now();
    $loading = !$loading;
    setTimeout(async () => {
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
          const sortedData = data.sort((a, b) => a.session_num - b.session_num);
          for (let i = 0; i < sortedData.length; i++) {
            $mockAvgsArray.push(sortedData[i]);
          }
        });
      $genMet = !$genMet;
      $loading = !$loading;
      console.log(`Your worker is ${$workerName}`);
      console.log(`Mock Log Array: ${$mockLogArray}`);
    }, 5000);
  };

  // chart() generates metrics data from fetched session logs and initiates charting functions
  const chart = () => {
    if ($chartFlag) alert('Please reset metrics before generating new ones');
    if (!$chartFlag) {
      $loading = !$loading;
      ///////////////// COMMENTED OUT FOR TESTING //////////////////
      createData($mockLogArray, $mockAvgsArray);
      // LIVE createData() ⤴️
      // TEST createData() ⤵️
      //createData();

      setTimeout(() => {
        $chartFlag = true;
        createScatterChart();
        createPieChart();
        createBarGraph();
        $loading = !$loading;
      }, 2000);
    }
  };

  // resetChart() resets the graph components (via uniqueKey) as well as the store, readying the app for the next recording session
  const resetChart = () => {
    $genMet = !$genMet;
    uniqueKey = {};
    mockLogArray.set([]);
    mockAvgsArray.set([]);
    $sessionNum++;
    $chartFlag = false;
    // console.log(`mockLogArray: ${$mockLogArray}`);
    // console.log(`mockAvgsArray: ${$mockAvgsArray}`);
    // console.log(`sessionNum: ${$sessionNum}`);
  };
</script>

<div class="backdrop">
  <slot />
  <button class="startBtn" on:click={start}>Start</button>
  <button on:click={stop}>Stop</button>
  {#if $genMet}
    <button on:click={chart}>Generate Metrics</button>
    <button on:click={resetChart}>Reset Metrics</button>
  {/if}
</div>
<div>
  {#if $loading}
    <LoadingModal />
  {/if}
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
  .table {
    margin-bottom: 3em;
  }
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
