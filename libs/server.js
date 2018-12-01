#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var http = require('http');

// ----------------------------------------
// Start HTTP server
// ----------------------------------------
app.set('port', config.port)
var server = http.createServer(app)

server.listen(config.port, config.host)

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('Listening on port ' + config.port + ' requires elevated privileges!')
      return process.exit(1)
    case 'EADDRINUSE':
      console.error('Port ' + config.port + ' is already in use!')
      return process.exit(1)
    default:
      throw error
  }
})

server.on('listening', () => {
  console.log('HTTP/WS server started successfully! [RUNNING]')
})