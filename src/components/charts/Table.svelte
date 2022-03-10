<script>
  import { logArray } from '../../store';
  console.log(logArray);
  for (let i = 0; i < logArray.length; i++) {
    console.log(logArray[i]);
  }
</script>

<table>
  <thead>
    <tr>
      <th>Status</th>
      <th>Elapsed Time</th>
      <th>URI</th>
      <th>Request Time</th>
    </tr>
  </thead>
  <tbody>
    {#each $logArray as row}
      <tr>
        {#each Object.values(row) as cell}
          <td>{cell}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    border: 2px solid;
    border-color: black;
  }
  tbody {
    border: 2px solid;
    border-color: black;
  }
  thead {
    border: 2px solid;
    border-color: black;
  }
  tr th {
    border: 2px solid;
    border-color: black;
  }
</style>
