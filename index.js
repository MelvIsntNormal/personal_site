var express = require('express');

var 
  app       = express(),
  port      = process.env.PORT || 8080,
  hostname  = process.env.HOSTNAME || 'localhost',
  fileOpts  = {
    root:     __dirname + '/posts/',
    dotfiles: 'ignore'
  };

app.use('/styles', express.static('styles'));

app.get('/', function(req, res) {
  res.sendFile('hello-world.html', fileOpts);
});

app.get('/post/:post', function(req, res) {
  var name = req.params.post + '.html';
  res.sendFile(name, fileOpts);
});

app.all('/*', function(req, res) {
  res.redirect('/');
});

app.listen(port, hostname, function() {
  console.log('Listening to ' + hostname + ':' + port + '...');
});