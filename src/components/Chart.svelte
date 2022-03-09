<script>
  import Chart from 'chart.js/auto';
  import { onMount } from 'svelte';

  const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const createChart = () => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgb(55, 185, 250)',
          borderColor: 'rgb(55, 185, 250)',
          data: [0, 10, 5, 2, 20, 30, 45, 10, 9, 12, 14, 13, 3, 5, 2],
        },
      ],
    };

    const config = {
      type: 'line',
      data: data,
      options: {},
    };

    const myChart = new Chart(document.getElementById('myChart'), config);
  };
  onMount(createChart);
</script>

<canvas id="myChart" width="400" height="400" />

<style>
</style>
