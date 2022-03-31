# metricsController.js

Here, the middleware is defined.

## `metricsController`

Controller holds all of our middleware (getSessionNum, getSessionLogs, siftMetrics and addMetrics). The key 'sessionNum' has a value that is equal to the current session number and defaults to 1.

## `getSessionNum`

This middleware is invoked when a dev presses "start" on the front-end. Our **database query** looks up the highest stored sessionNum, which corresponds to the last recorded session, and incremenets that integer by 1. A session is defined as data collected from when a dev clicks **start** until they click **stop**. The sessionNum is stored in our metricsController and is defaulted to one for new devs. This property will be used later by siftMetrics.

## `getSessionLogs`

This middleware is invoked when a dev presses "stop" on the front-end of **_mist_**. A query is sent to the database that selects all logs from the current session. This data is saved in an array of objects on res.locals.logs.

## `siftMetricsTel`

This middleware destructures the method, URL, status, and response time data from the object that is sent over via an OPTL tracer. These data points are saved in a 'metrics' object; response time is converted into a unit-less number before being saved. This controller also captures the current session number and the time that the request hits the controller and saves both data points in the metrics object.

## `addMetrics`

The addMetrics middleware is triggered after the metricsController.siftMetrics middleware executes and saves metrics data in an object called 'metrics' in 'res.locals.metrics'. Once we are in the addMetrics middleware, res.locals.metrics is destructured and the data that we gathered is injected into an SQL query and saved in the user database.

## `getAverageData`

The getAverageData middleware is triggered once we generate metrics on the frontend. It sends the average response times of workers for the previous five sessions.
