## Svelte Components
Inside of the src/components directory, we hold the Svelte files that create our page's reactive and reusable components.



## `Worker.svelte`
Here, we define the core page structure of our analytics visualization, along with the connectivity to the server and database info retrieval, that gets displayed on the dashboard.

## Script
We begin by importing each modularized chart component, reactive variables from `store.js`, and data/chart creation functionality from `functions.js`. The variables `workerTimer`, `chartFlag` and `mockLogArray` are marked reactive by the `$:` syntax.

## `start`
The functionality to mark the beginning of data collection and retrieve the session number from our server/database is defined here.

## `stop`
The functionality to mark the end of data collection, and retrieve the sessionLogs data is defined here. This data is used to create the `mockLogArray` which is utilized in the creation of duration and status data for our charts. A second fetch request obtains the information to populate the `mockAvgsArray` for our previous 5 session info graph.

## `chart`
Here, the chart data is created, and each chart that displays data for the worker is created. An initial check is in place to validate that any recent data has been reset prior to another session of data collection.

## `resetChart`
The functionality for resetting chart data is located here.

## Body
The page structure of chart text, component layout, along with buttons are defined, and conditional rendering settings are created here.

## Style
Start button status color updates, and Pie Chart sizing and styling details are set.


## `DarkButton.svelte`
The toggle button for dark mode is defined, and styling for the button are establised.


## `Table.svelte`
The `mockLogArray` data for table population is imported from `store.js`. The table structure and looping mechanism through `mockLogArray` to populate the table with the number of functional metrics objects received is performed, along with general styling.

## Charts
In each of the svelte files for `ScatterChart`, `PieChart` and `BarGraph` the chart is instantiated onto a canvas element with it's relevant id, and fundamental style structure is setup.