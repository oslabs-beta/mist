<script>
  import Worker from './components/Worker.svelte';
  import DarkButton from './components/DarkButton.svelte';
  import { theme, previousTheme } from './store';

  $: console.log($theme, $previousTheme);

  // let isLoggedIn = false;

  // const login = () => {
  //   isLoggedIn = !isLoggedIn;
  // };
  function toggle() {
    $previousTheme = $theme;
    window.document.body.classList.toggle('dark-mode');
    if ($theme === 'Misty') {
      $theme = 'Dark and Stormy';
    } else {
      $theme = 'Misty';
    }
  }
</script>

<p>{$theme}</p>
<DarkButton on:click={() => toggle()} />

<main>
  <!-- {#if !isLoggedIn}
    <Login on:click={login} />
  {/if}
  {#if isLoggedIn} -->
  <h1>M I S T</h1>
  <Worker />
  <!-- {/if} -->
</main>

<style>
  p {
    color: #6194bc;
  }
  h1 {
    color: #6194bc;
  }
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  :global(body) {
    background-color: #e0e0e0;
    color: #0084f6;
    transition: background-color 0.3s;
  }
  :global(body.dark-mode) {
    background-color: #030620;
    color: #bfc2c7;
  }
</style>
