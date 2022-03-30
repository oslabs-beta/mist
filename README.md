# Notes

In server, every time we run the mistMiniflare.startServer(), it install node modules.
Running the tracer: node --require './server/tracing.js' server/miniflare

# mist

1. About mist
2. mist Set-Up
3. mist Usage
4. FAQ
5. Future Wish-List + Contact Us

## PART 1 - About mist


## PART 2 - mist Set-Up

### Option A - Using the npm package mist-analytics


### Option B - Using the GitHub repository

1. Clone this repo into your local machine in the same directory where the worker you want to test is located. `git clone https://github.com/oslabs-beta/mist.git`
2. Install the dependencies `npm install`
3. Create an ENV file in the same level as models folder
    - Then create a constant called MY_URI in ENV and set its value equal to your postgresSQL database link (see next step).
    - in metrics_model.js you must require dotenv and then invoke it.
      - Ex: const dotenv = require('dotenv') dotenv.config();
    - After invoking dotenv.config you will be able to set constant myURI equal to the env constant MY_URI.
4. Set up a postgreSQL database-- we recommend using elephantSQL-- and link it to the SQL schema
    - Copy the link to your empty database
    - Paste that link into the ENV file and save it as myURI
    - Open up the ***mist*** directory in your terminal
    - Run the following command: `psql -d <url from elephantSQL> -f db_template.sql`
5. Run the following scripts to start up the app:
    - `npm run dev` to start the GUI on localhost:8080
    - `node server/server.js` to start the server listening on your worker
    - `node --require './server/tracing.js' server/miniflare` to start your worker

## PART 3 - mist Usage
1. Once all servers are running and your worker function is ready to be tested, navigate to `localhost:8080`. Here, to initiate the metric recording session click the `Start` button.
2. Next, navigate to `localhost:8787` and fire off your worker function that is being tested and allow for 5 seconds to elapse for data collection, prior to firing off the function again. Repeat this the number of times you would like to gather data for that worker function firing.
3. Once you have fired off all function invocations for that session, navigate back to `localhost:8080` and click the `Stop` button to end the session. 
4. In order to then display your session data, click the `Generate Metrics` button and the charts will display your metrics!
5. After you are finished analyzing this session data, click the `Reset Metrics`. 
Check out our Medium article for more information.
- Once your app is running and you 

### Metrics

### Requests

### Logs

### Status


## PART 4 - FAQ

## Future Wish-List + Contact Us

- Modularize server, routing, controllers for Flare
- Update .env file with [secrets](https://towardsdatascience.com/keep-your-code-secure-by-using-environment-variables-and-env-files-4688a70ea286)
-
 node --require './server/tracing.js' server/miniflare


 ## PART 5 - Future Wish-List + Contact Us