# miniflare.js

In this file, we create a new instance of miniflare using the [miniflare API](https://miniflare.dev/get-started/api).

With the scriptPath, we point to the worker that requires testing. Currently this does not need to be updated in this file, but can be configured in the user's .env file. In order to test different Workers you must change the value of the WORKER_NAME constant to the name of the file you are testing each time you test a different Worker. The port is also configured to initiate on local host 8788.
Look at README Future Wish-List if you wish to contribute.

Once the mistMiniflare object is configured, serverCreator is invoked when running our OpenTelemtry instance and it is wrapping our miniflare server with tracing.js this ensures that we get the metrics to the backend.

Here is the command: `node --require './server/tracing.js' server/miniflare`
