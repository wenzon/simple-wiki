'use strict'

const fs = require('fs')

/**
 * Load Application Configuration
 */
module.exports = {
  
  init() {
	let configPath = '../config.json'
	let str = fs.readFileSync(configPath, 'utf8')
	return JSON.parse(str);
  }
}
