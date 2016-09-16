'use strict';

const // Imports
  express       = require('express'),
  YAML          = require('yamljs'),
  MMD           = require('jstransformer')(require('jstransformer-mmd')),
  stylus        = require('express-stylus'),
  readDirectory = require('fs').readdirSync,
  join          = require('path').join;

let loadPosts = directory => 
  readDirectory(directory)
    .map(filename => join(directory, filename))
    .map(filepath => YAML.load(filepath))
    .map((data) => Object.assign(data, {url: `/post/${data.name}`}))
    .reduce((posts, currentPost) => posts.concat([currentPost]), [])
    .sort((a, b) => b.created_on - a.created_on);

let 
  app         = express(),
  port        = process.env.PORT || 8080,
  hostname    = process.env.HOSTNAME || 'localhost',
  environment = process.env.ENVIRONMENT || 'production',

  paths       = {
    post: join('.', 'posts'),
    style: {
      source: join('.', 'assets', 'styles'),
      dest:   join('.', 'public', 'styles'),
    },
    view: join('.', 'layouts'),
    public: join('.', 'public')
  },

  data        = {
    post: loadPosts(paths.post)
  },

  stylusOpts  = {
    src:        paths.style.source,
    dest:       paths.style.dest,
    force:      environment === 'development',
    compress:   environment ==! 'development',
    sourcemap:  environment === 'development'
  };


app.set('views', paths.view);
app.set('view engine', 'pug');

app.use('/styles', stylus(stylusOpts));

app.get('/', (req, res) => {
  res.redirect(data.post[0].url);
});

app.get('/post/:name', (req, res) => {
  let
    post = data.post.find(post => post.name === req.params.name),
    postList = data.post.map(post => ({
      title: post.title, 
      url: post.url
    })),
    context = {
      post: post,
      page: {title: post.title},
      appContext: {
        post: {
          list: postList
        }
      }
    };

  post.renderedContent = post.renderedContent || MMD.render(post.content).body;

  res.render('post', context);
});

app.use(express.static(paths.public));

app.listen(port, hostname, () => {
  console.log(`Listening to ${hostname}:${port}...`);
});