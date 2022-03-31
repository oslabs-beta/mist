## App Setup

## `App.svelte`

This serves as the top level component, and our primary page for the application, rendering core components of `Worker`, the Mist title and the dark mode toggle button `Dark Button`.

## Script

In the script tag, components and theme details are imported to work with. The toggle function for dark mode is declared as well.

## Body

In the body of this .svelte file, the components are structured and setup to be rendered upon page load.

## Style

In the style tags, our theme and visual element specifications are defined.

## `main.js`

This is the entry point of our application. The `App.svelte` component is imported, instantiated, binded to the HTML document body, and exported.

# `store.js`

Here, our application's core reactive variables, and visualization data variables are declared and held.
We import the `writable` method from `svelte/store` to provide access to Svelte's store and state management functionality.
Each variable is exported from this JS file, so that it is usable in our other files and components. Variables that we want to be reactive to document activity include the writable method. Our variables that hold chart creation data points are not reactive, as they are updated via our `functions.js` file already.
