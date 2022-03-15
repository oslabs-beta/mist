<script>
  import { user } from '../store.js';
  $: console.log(user);
</script>

<!-- html goes here -->
<h1>Login</h1>
<form on:submit>
  <input type="text" placeholder="Email" bind:value={user.email} />
  <input type="text" placeholder="API Key" bind:value={user.apiKey} />
</form>
<button on:click>Login</button>

<style type="text/scss">
  h1 {
    color: #6194bc;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>
