const { Pool } = require('pg');
const dotenv = require('dotenv')
dotenv.config();

const myURI = process.env.MY_URI;

const pool = new Pool({
  connectionString: myURI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
