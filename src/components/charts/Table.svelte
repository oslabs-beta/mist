<script>
  import { mockLogArray } from '../../store';
  console.log(`table component mockLogArray: ${$mockLogArray}`);
  for (let i = 0; i < $mockLogArray.length; i++) {
    console.log($mockLogArray[i]);
  }
  // {
  //     _id: 1,
  //     method: 'POST',
  //     url: 'http://localhost:8080/penguins',
  //     status: 200,
  //     response_time_ms: 1.74,
  //     session_num: 1,
  //     start: '2022-03-08T17:00:00+0000',
  //   },
</script>

<!-- <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>METHOD</th>
      <th>URL</th>
      <th>STATUS</th>
      <th>RESPONSE TIME /MS</th>
      <th>SESSION NUMBER</th>
      <th>START TIME</th>
    </tr>
  </thead>
  <tbody>
    {#each $mockLogArray as row}
      <tr>
        {#each Object.values(row) as cell}
          <td>{cell}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table> -->

<!-- Styled version -->
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
    </tr>
  </thead>
  <tbody>
    {#each $mockLogArray as row}
      <tr>
        {#each Object.values(row) as cell}
          <td>{cell}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  /* ORIGINAL TABLE STYLE */

  /* table {
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
    border-top: 1px solid;
    border-bottom: 1px solid;
    border-color: #f6f6f6;
  } */

  /* UPDATED STYLING */

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

  /* .styled-table tbody tr:nth-of-type(even) {
    background-color: #c4c4c4;
    /* alternating light blue row background */
  /* } */

  /* .styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #6194bc;
  } */
</style>
