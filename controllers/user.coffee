module.exports = (UserController) ->

  UserController.get '/', (req, res) ->
    res.send 'Hello, User!'

  return ['user', UserController]