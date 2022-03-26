const express = require('express');
const cors = require('cors');
const { Miniflare, Log, LogLevel } = require('miniflare');
const path = require('path');

const mistMiniflare = new Miniflare({
  scriptPath: path.resolve(__dirname, '../../sample-worker-2/index.js'),
  port: 8788,
});

// THIS WORKS
async function serverCreator() {
  const server = await mistMiniflare.startServer();
  console.log('Listening on :8788');
  return server;
}

const server = serverCreator();

module.exports = mistMiniflare;
