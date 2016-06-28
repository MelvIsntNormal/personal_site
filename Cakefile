config = require './config'
MigrationsRunner = require 'node-pg-migrate/lib/runner'

migrate = (direction = 'up', count = Infinity) ->
  options = 
    database_url: config.database.url
    dir: __dirname + '/migrations'
    migrations_table: 'pgmigrations'
    direction: direction
    count: count
  (new MigrationsRunner(options)).run (err) ->
    if err?
      console.log err.stack
      process.exit 1
    console.log 'Migrations Completed!'
    process.exit 0

task 'migrate', '', -> do migrate