<script>
  import user from '../store.js';
</script>

<!-- html goes here -->
<h1>Login!!!</h1>
<form>
  <input type="text" placeholder="email" bind:value={user.email} />
  <input type="text" placeholder="api key" bind:value={user.apiKey} />
</form>
<button on:click>Login</button>

<style>
</style>
