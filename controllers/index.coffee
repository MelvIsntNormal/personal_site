{ readdirSync } = require 'fs'

module.exports = (Router) ->
  controllers = {}
  files = readdirSync(__dirname).filter (name) -> name != 'index.coffee'
  for file in files
    [base, router] = require("./#{file}") do Router
    controllers[base] = router
  return controllers