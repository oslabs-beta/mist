const express = require('express');
const cors = require('cors');
const { Miniflare, Log, LogLevel } = require('miniflare');
const path = require('path');
const dotenv = require('dotenv')
dotenv.config();


const workerName = process.env.WORKER_NAME;

const mistMiniflare = new Miniflare({
  scriptPath: path.resolve(__dirname, `../../${workerName}/index.js`),
  port: 8788,
});

async function serverCreator() {
  const server = await mistMiniflare.startServer();
  console.log('Listening on :8788');
  return server;
}

serverCreator();

module.exports = mistMiniflare;