merge = require 'object-merge'

defaultConfig = {}

module.exports = merge defaultConfig, require './environment'

