var file = require('fs').readFileSync

exports.up = function(pgm) {
  pgm.sql(file('./config/db/on_update_timestamp.sql'));
};

exports.down = function(pgm){}