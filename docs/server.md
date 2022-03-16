# server.js overview

## `PORT`

Our port is set to localhost:3000.

## `app.post('/allData', metricsController.siftMetrics,metricsController.addMetrics,)`

After editing the **_Miniflare_** npm file, data from any requests sent to the **_Miniflare_** server will be sent in the body of a POST request to this route on the **_mist_** server. The request is directed to the metricsController where the siftMetrics method converts the data into the proper format for the database, and the addMetrics method posts the data to the user's SQL database.

## `app.get('/sessionNum', metricsController.getSessionNum)`

This function is invoked when a user presses "start" on the front-end. It routes to metricsController.getSessionNum middleware. This function responds with a string confirming that the sessionNum has been set.

## `app.get('/sessionLogs', metricsController.getSessionLogs)`

The metricsController.getSessionLogs middleware is invoked when a user presses 'stop' on the front-end. This sends a GET request to the '/sessionLogs' endpoint and a query is sent to the database. This query retrieves all the metrics associated with the current sessionNum and stores them in res.locals. Once the metrics are stored we return a response back to the frontend with our res.locals.logs json parsed.

## `app.use('/\*')`

Here we have a catch-all route handler for requests made to an unknown route.

## `app.use`

Finally, we have a error handler for any errors that occur during middleware invocations.
