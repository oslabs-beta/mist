<script>
  import { onMount } from 'svelte';
  import { createBarChart } from '../../functions.js';
  // onMount(createBarChart);
</script>

<canvas id="barChart" />

<style>
  #barChart {
    /* width: 75% !important; */
    height: 700px !important;
  }
</style>
