'use strict';

const 
  express = require('express'),
  YAML = require('yamljs'),
  MMD = require('jstransformer')(require('jstransformer-mmd')),
  readDirectory = require('fs').readdirSync;

function loadPosts() {
  let directory = __dirname + '/posts';

  return readDirectory(directory)
    .map(filename => ({ 
      file: directory + '/' + filename, 
      filename: filename
    }))
    .map((options) => Object.assign(YAML.load(options.file), {
      url: options.filename.slice(0, -4)
    }))
    .reduce((posts, currentPost) => posts.concat([currentPost]), [])
    .sort((a, b) => a.created_on - b.created_on);
}

let 
  app       = express(),
  port      = process.env.PORT || 8080,
  hostname  = process.env.HOSTNAME || 'localhost',
  data      = {
    post: loadPosts()
  },
  fileOpts  = {
    root:     __dirname + '/posts/',
    dotfiles: 'ignore'
  };

app.set('views', './layouts');
app.set('view engine', 'pug');

app.use('/styles', express.static('styles'));

app.get('/', (req, res) => {
  res.sendFile('index.html', fileOpts);
});

app.get('/post/:post', (req, res) => {
  let context = {
    post: data.post.find((post) => post.url === req.params.post),
    appContext: {
      post: {
        list: data.post.map(post => ({
          title: post.title, 
          url: '/post/' + post.url
        }))
      }
    }
  };
  context.post.renderedContent = 
       context.post.renderedContent 
    || MMD.render(context.post.content).body;
  context.page = {title: context.post.title};
  console.log(context);
  res.render('post', context);
});

app.all('/*', (req, res) => {
  res.redirect('/');
});

app.listen(port, hostname, () => {
  console.log(data.post.map((post) => [post.title, post.url, post.created_on]));
  console.log('Listening to ' + hostname + ':' + port + '...');
});