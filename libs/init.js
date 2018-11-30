'use strict'

const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs-extra'))
const pm2 = Promise.promisifyAll(require('pm2'))
const ora = require('ora')
const path = require('path')

const ROOTPATH = process.cwd()

module.exports = {
  /**
   * Start in background mode
   */
  start: function () {
    let spinner = ora('Initializing...').start()
    return fs.emptyDirAsync(path.join(ROOTPATH, './logs')).then(() => {
      return pm2.connectAsync().then(() => {
        return pm2.startAsync({
          name: 'server',
          script: './libs/server',
          cwd: ROOTPATH,
          output: path.join(ROOTPATH, './logs/output.log'),
          error: path.join(ROOTPATH, './logs/error.log'),
          minUptime: 5000,
          maxRestarts: 5
        }).then(() => {
          spinner.succeed('server.js has started successfully.')
        }).finally(() => {
          pm2.disconnect()
        })
      })
    }).catch(err => {
      spinner.fail(err)
      process.exit(1)
    })
  },
 
  /**
   * Stop server.js process(es)
   */
  stop () {
    let spinner = ora('Shutting down server.js...').start()
    return pm2.connectAsync().then(() => {
      return pm2.stopAsync('server').then(() => {
        spinner.succeed('server.js has stopped successfully.')
      }).finally(() => {
        pm2.disconnect()
      })
    }).catch(err => {
      spinner.fail(err)
      process.exit(1)
    })
  },
  
  /**
   * Restart server.js process(es)
   */
  restart: function () {
    let self = this
    return self.stop().delay(1000).then(() => {
      self.start()
    })
  }
}
