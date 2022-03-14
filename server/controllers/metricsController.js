const db = require('../models/metrics_model');

const metricsController = {};

/*
{
        start,
        method,
        url,
        status,
	responseTime
      }

    "_id" serial PRIMARY KEY,
    "method" VARCHAR(8),
    "url" VARCHAR(100),
    "status" INTEGER,
    "response_time_ms" FLOAT,
    "session_num" INTEGER,
    "start" VARCHAR


*/
