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
    border: 1px solid;
    border-color: #f6f6f6;
  }
  tbody {
    border: 1px solid;
    border-color: #f6f6f6;
  }
  thead {
    border: 1px solid;
    border-color: #f6f6f6;
  }
  tr th {
    border: 1px solid;
    border-color: #f6f6f6;
    color: #6194bc;
  }
  td {
    color: #6194bc;
  }
</style>
