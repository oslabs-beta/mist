<script>
  import { user } from '../store.js';
  import Worker from './Worker.svelte';
  import { workers, chartFlag } from '../store.js';
  import BarChart from './charts/BarChart.svelte';

  let showWorker = false;
  let currentWorker;
  const toggleWorker = (id) => {
    currentWorker = workers.filter((worker) => worker.id === id)[0];
    showWorker = true;
  };
  const exitWorker = () => {
    currentWorker = undefined;
    showWorker = false;
    $chartFlag = false;
  };
</script>

<!-- html goes here -->

{#if !showWorker}
  <h1>All Workers</h1>
  <h3>Email: {user.email} API Key: {user.apiKey}</h3>
  <h3>Here are your App level metrics</h3>
  <div class="barChart">
    <BarChart />
  </div>

  {#each workers as worker (worker.id)}
    <div>
      <h1>{worker.name}</h1>
      <button on:click={() => toggleWorker(worker.id)}>Show Worker</button>
    </div>
  {/each}
{/if}

{#if showWorker}
  <Worker on:click={() => exitWorker()}>
    <h1>{currentWorker.name}</h1>
  </Worker>
  <!-- bar chart here -->
{/if}

<style lang="scss">
  @import '../public/global.scss';
  .barChart {
    margin: auto;
    width: 60%;
  }
  h1 {
    color: #6194bc;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  h3 {
    color: #6194bc;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }
</style>
