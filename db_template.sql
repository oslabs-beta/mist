-- NOTE: This is from the 10SB database set-up
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


/*  */
--FIX: CHANGE RESPONSE TIME TO FLOAT

CREATE TABLE public.metrics (
    "_id" serial PRIMARY KEY,
    "method" VARCHAR(8),
    "url" VARCHAR(100),
    "status" INTEGER,
    "response_time_ms" FLOAT,
    "session_num" INTEGER,
    "start" VARCHAR
);

-- postgres://xolvdajb:gGvN3x4pC06M_KKhW_BvjtY6IY_POA-s@ziggy.db.elephantsql.com/xolvdajb