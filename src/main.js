// ROLE: This is the entry point of our application. The `App.svelte` component is imported, instantiated, binded to the HTML document body, and exported.
import App from './App.svelte';

const app = new App({
  target: document.body,
});

export default app;
