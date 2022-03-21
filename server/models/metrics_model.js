const { Pool } = require('pg');

const myURI = "postgres://mowjiius:ZP2R2gX5BXNqh7CWJJQRWs_Gs4s_Vr2M@salt.db.elephantsql.com/mowjiius"

// process.env.MY_URI;

// "postgres://xolvdajb:gGvN3x4pC06M_KKhW_BvjtY6IY_POA-s@ziggy.db.elephantsql.com/xolvdajb"



const pool = new Pool({
  connectionString: myURI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
