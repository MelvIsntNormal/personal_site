# Imports
{ async, await } = require 'asyncawait'
express = require 'express'
config = require './config'
pgp = do require 'pg-promise'


devfeatures = async (app) ->
  controllers = require('./app/controller')(express.Router)

  app.all '/api', (req, res, next) ->
    req.forAPI = true
    do next

  for base, controller of controllers
    app.use "(/api)?/#{base}", controller 

do async ->
  console.log "Environment: #{config.env}"
  {port, hostname, database: { url }} = config
  app = do express
  dbc = pgp url
  

  app.set 'view engine', 'pug'
  app.set 'views', process.cwd() + "/app/view"
  app.use '/static', express.static 'public'

  app.get '/', async (req, res) ->
    res.render 'index'

  app.get '/static/app.css', async (req, res) ->
    res.sendFile "#{__dirname}/public/app.css"

  if config.env is 'development' then devfeatures app

  app.get '/*', (req, res) -> res.redirect '/'
  
  app.listen port, hostname, ->
    console.log "App listening to #{hostname}:#{port}..."