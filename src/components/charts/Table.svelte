<script>
  import { mockLogArray } from '../../store';
  // ROLE: creates table displaying recorded session log
</script>

<table class="styled-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>METHOD</th>
      <th>URL</th>
      <th>STATUS</th>
      <th>RESPONSE TIME /MS</th>
      <th>SESSION NUMBER</th>
      <th>START TIME</th>
      <th>WORKER NAME</th>
    </tr>
  </thead>
  <tbody>
    {#each $mockLogArray as row}
      <tr>
        {#each Object.entries(row) as [key, cell]}
          {#if key === 'start'}
            <td>{new Date(Number(cell)).toLocaleTimeString()}</td>
          {:else}
            <td>{cell}</td>
          {/if}
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .styled-table {
    border-collapse: collapse;
    margin: auto;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }

  .styled-table thead tr {
    background-color: #6194bc;
    color: #ffffff;
    text-align: left;
  }

  .styled-table th,
  .styled-table td {
    padding: 12px 15px;
  }

  .styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }
</style>
