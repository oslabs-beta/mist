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