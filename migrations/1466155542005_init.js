var file = require('fs').readFileSync

exports.up = function(pgm) {
  pgm.sql(file('./config/db/on_update_timestamp.sql'));

  pgm.createTable("users", {
    name: {type: 'varchar(50)', primaryKey: true},
    _created: {type: 'timestamp', default: 'now'},
    _updated: {type: 'timestamp', default: 'now'}
  });

  pgm.sql('CREATE TRIGGER update_timestamp ' + 
    'BEFORE UPDATE ON users ' + 
    'EXECUTE PROCEDURE update_timestamp();'
  );
};