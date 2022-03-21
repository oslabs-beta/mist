# mist

1. User Set-Up
2. Interpreting metrics
3. FAQ
4. Future Wish-List + Contact Us


## PART 1 - User Set-Up

Add steps here for downloading and setting up miniflare

- install miniflare as a dev dependancy by running 'npm install -D miniflare' in your CLI
- run `npx miniflare` to start your localhost:8787
- make a .env file and store your postgress link to a variable called 'MY_URI'. Then in the metrics_model file reference it by using 'process.env.MY_URI'.

### Database

TODO: Make sure status is converted to an integer before sending to database
TODO: Make sure response_time_ms is converted to an integer

1. Create a new postgres SQL database-- we recommend elephantSQL
2. Copy the link for that database.
3. Open up the ***mist*** directory in your terminal.
4. Run the following command: `psql -d <url from elephantSQL> -f db_template.sql`
   Ensure that your url is a string.
5. Run a query to ensure that the table is present.

Run in terminal once in the ***mist*** directory:
psql -d <url from elephantSQL> -f db_template.sql

### Code that goes in miniflare node modules to alter them

`node_modules/@miniflare/core/(dist/src)/index.js`
ADDED ON LINE 979:
NEED SOME ERROR HANDLING FOR OUR FETCH THAT DOESN'T DISRUPT MINIFLARE WHEN NOT USING MIST

```js
  const workerName = 'YOUR WORKER NAME HERE'
  const response = await fetch('http://localhost:3000/allData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      start,
      method,
      url,
      status,
      responseTime,
      workerName
    })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.log('Error: ', error))
```

## PART 2 - Interpreting Metrics

### Servers:

mist
- localhost:8080 `npm run dev`
- localhost:3000 `node server/server.js`

user's (your) worker-based application

- localhost:8787 `npx miniflare`



## PART 3 - FAQ

### Metrics
    
### Requests
    
### Subrequests
Like the real workers runtime, Miniflare limits you to 50 subrequests per request. Each call to fetch(), each URL in a redirect chain, and each call to a Cache API method (put()/match()/delete()) counts as a [subrequest](https://miniflare.dev/core/standards).
    
### Logs
    
### Status
    

## Future Wish-List + Contact Us

- Modularize server, routing, controllers for Flare
- Update .env file with [secrets](https://towardsdatascience.com/keep-your-code-secure-by-using-environment-variables-and-env-files-4688a70ea286) 
- 