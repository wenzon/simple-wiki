#!/usr/bin/env node
'use strict'

// ===========================================
// Wiki.js
// 1.0.0
// Licensed under AGPLv3
// ===========================================

const init = require('./libs/init')

require('yargs') // eslint-disable-line no-unused-expressions
  .usage('Usage: node $0 <cmd> [args]')
  .command({
    command: 'start',
    alias: ['boot', 'init'],
    desc: 'Start wiki.js process',
    handler: argv => {
      init.start()
    }
  })
  .command({
    command: 'stop',
    alias: ['quit', 'exit'],
    desc: 'Stop wiki.js process',
    handler: argv => {
      init.stop()
    }
  })
  .command({
    command: 'restart',
    alias: ['reload'],
    desc: 'Restart wiki.js process',
    handler: argv => {
      init.restart()
    }
  })
  .recommendCommands()
  .demandCommand(1, 'You must provide one of the accepted commands above.')
  .help()
  .version()
  .epilogue('No such command!')
  .argv
