## functions.js

## Imports

First, the Chart functionality from `chart.js` is imported.
Next, the variables required to generate data are imported from the store.js file.

## `createData`

The function that is defined here generates the data required for population of the scatter chart, pie chart and bar graph. The chart data is also reset via the reassignment of data variables to 0.
Note - this function is not invoked here, but instead in `Worker.svelte`
The `createData` function takes in parameters of logs and avgLogs which contain the backend data we require.
We use the duration data to generate y-axis plot points for length of duration on the scatter chart.
We use the status code data to categorize our y-axis plot points in the scatter chart, and additionally for the population of our Pie Chart data that provides a breakout summary of function Successes and Failures.
We use the `avgLogs` data to generate the average duration of the functions we ran analytics on, for each of the previous 5 sessions.

## `createScatterChart`

This function uses the data variables (succs, errs, labels) to define the dataset and styling details to be used in the chart configuration.
Constant `config` utilizes Chart.js documentation guidelines to create the configuration and chart details such as axes, labels, gridlines and sizing.
Constant `scatterChart` creates the chart and connects it to the document element `scatterChart`.

## `createPieChart`

This function uses the data variables (pieData, pieLabels) to define the dataset and styling details that are used in the chart configuration. The configuration details based on Chart.js documentation guidelines are defined in const `config`. Const `doughnutChart` creates the chart and connects it to the document element `doughnutChart`.

# `createBarGraph`

This function uses the data variables (sessNums, sessAvgs) to define the dataset and styling details that are used in the chart configuration. The configuration details based on Chart.js documentation guidelines are defined in const `config`. Const `barGraph` creates the chart and connects it to the document element `barGraph`.
