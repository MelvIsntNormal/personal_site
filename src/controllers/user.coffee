module.exports = (Router) ->
  UserController = do Router

  UserController.get '/', (req, res) ->
    res.send 'Hello, User!'

  return ['user', UserController]