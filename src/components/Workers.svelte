<script>
  import { user } from '../store.js';
  import Worker from './Worker.svelte';
  import { workers } from '../store.js';
  let showWorker = false;
  let currentWorker;
  const toggleWorker = (id) => {
    currentWorker = workers.filter((worker) => worker.id === id)[0];
    showWorker = true;
  };
  const exitWorker = () => {
    currentWorker = undefined;
    showWorker = false;
  };
</script>

<!-- html goes here -->

{#if !showWorker}
  <h1>All Workers</h1>
  <h3>Email: {user.email} API Key: {user.apiKey}</h3>
  <h3>Here are your App level metrics</h3>
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

<style>
  h1 {
    color: rgb(55, 185, 250);
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  h3 {
    color: rgb(55, 185, 250);
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }
</style>
