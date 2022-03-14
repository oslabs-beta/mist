# mist

<!--
NOTE: Do some more research into this function
ROLE: This function works so and so
TEST: -> WORKS
-->

## User Set-Up

Add steps here for downloading and setting up miniflare

- install globally(perhaps locally?)
- run miniflare {nameOfWorkerFile.js}
- set-up cors(?)
- if your workers are traditional "service-workers", you're all set. If you are working with the more modern [modules format](https://miniflare.dev/core/modules), you want to enable it in miniflare with: $ miniflare --modules
  .

## Servers:

mist

- localhost:8080 `npm run dev`
- localhost:3000 `node server/server.js`

sample-worker

- localhost:8787 `miniflare index.js`
  ... or possibly `npx miniflare` to run with node changes

## Metrics

### requests

### subrequests

Like the real workers runtime, Miniflare limits you to 50 subrequests per request. Each call to fetch(), each URL in a redirect chain, and each call to a Cache API method (put()/match()/delete()) counts as a [subrequest](https://miniflare.dev/core/standards).

### logs

### status

## .toml configuration

How does the dev set-up their `.toml` file? Do some more digging!

## Future To-Do

- Modularize server, routing, controllers for Flare

## Database

TODO: Make sure status is converted to an integer before sending to database
TODO: Make sure response_time_ms is converted to an integer

1. Create a new postgres SQL database-- we recommend elephantSQL
2. Copy the link for that database.
3. Open up the _mist_ directory in your terminal.
4. Run the following command: psql -d <url from elephantSQL> -f db_template.sql
   Ensure that your url is a string.
5. Run a query to ensure that the table is present.

Run in terminal once in the _mist_ directory:
psql -d <url from elephantSQL> -f db_template.sql

## Code that goes in miniflare node modules to alter them

node_modules/@miniflare/core/(dist/src)/index.js
ADDED ON LINE 979:
NEED SOME ERROR HANDLING FOR OUR FETCH THAT DOESN'T DISRUPT MINIFLARE WHEN NOT USING MIST

const response = await fetch('http://localhost:3000/allData', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(
{
start,
method,
url,
status,
responseTime
}
)
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => console.log('Error: ', error))
