<script>
  import Login from './components/Login.svelte';
  import Workers from './components/Workers.svelte';
  import Worker from './components/Worker.svelte';

  let isLoggedIn = false;

  const login = () => {
    isLoggedIn = !isLoggedIn;
  };
</script>

<main>
  {#if !isLoggedIn}
    <Login on:click={login} />
  {/if}
  {#if isLoggedIn}
    <Workers />
  {/if}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  /* h1 {
    color: rgb(55, 185, 250);
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  } */

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
