var express = require('express');

var 
  app       = express(),
  port      = process.env.PORT || 8080,
  hostname  = process.env.HOSTNAME || 'localhost';

app.use('/styles', express.static('styles'));

app.get('/', function(req, res) {
  res.send('Home');
});

app.get('/post/:post', function(req, res) {
  var name = req.params.post + '.html';
  var opts = {
    root:     __dirname + '/posts/',
    dotfiles: 'ignore'
  };

  res.sendFile(name, opts);
});

app.listen(port, hostname, function() {
  console.log('Listening to ' + hostname + ':' + port + '...');
});