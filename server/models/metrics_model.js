const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// const myURI = process.env.MY_URI;
const myURI = 'postgres://mowjiius:ZP2R2gX5BXNqh7CWJJQRWs_Gs4s_Vr2M@salt.db.elephantsql.com/mowjiius';

const pool = new Pool({
  connectionString: myURI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
