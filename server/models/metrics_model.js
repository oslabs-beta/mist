const { Pool } = require('pg');

//FIX: For production, make this an empty string where users can add this... OR as a stretch, populate from input from front-end
const myURI =
  'postgres://xolvdajb:gGvN3x4pC06M_KKhW_BvjtY6IY_POA-s@ziggy.db.elephantsql.com/xolvdajb';
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: myURI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('exectuted query', text);
    return pool.query(text, params, callback);
  },
};
