<script>
  // const workers = [
  //   { id: 1, name: 'Worker 1' },
  //   { id: 2, name: 'Worker 2' },
  //   { id: 3, name: 'Worker 3' },
  // ];
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
{/if}

<style>
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>
