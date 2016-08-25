'use strict';

const 
  express = require('express'),
  YAML = require('yamljs'),
  MMD = require('jstransformer')(require('jstransformer-mmd')),
  readDirectory = require('fs').readdirSync;

let loadPosts = directory => 
  readDirectory(directory)
    .map(filename => directory + '/' + filename)
    .map(filepath => YAML.load(filepath))
    .map((data) => Object.assign(data, {url: '/post/' + data.name}))
    .reduce((posts, currentPost) => posts.concat([currentPost]), [])
    .sort((a, b) => b.created_on - a.created_on);

let 
  app       = express(),
  port      = process.env.PORT || 8080,
  hostname  = process.env.HOSTNAME || 'localhost',
  data      = {
    post: loadPosts(__dirname + '/posts')
  },
  fileOpts  = {
    root:     __dirname + '/posts/',
    dotfiles: 'ignore'
  };

app.set('views', './layouts');
app.set('view engine', 'pug');

app.use('/styles', express.static('styles'));

app.get('/', (req, res) => {
  res.redirect(data.post[0].url);
});

app.get('/post/:name', (req, res) => {
  let context = {
    post: data.post.find((post) => post.name === req.params.name),
    appContext: {
      post: {
        list: data.post.map(post => ({
          title: post.title, 
          url: post.url
        }))
      }
    }
  };
  context.post.renderedContent = 
       context.post.renderedContent 
    || MMD.render(context.post.content).body;
  context.page = {title: context.post.title};
  res.render('post', context);
});

app.all('/*', (req, res) => {
  res.redirect('/');
});

app.listen(port, hostname, () => {
  // console.log(data.post.map((post) => [post.title, post.url, post.created_on]));
  console.log('Listening to ' + hostname + ':' + port + '...');
});