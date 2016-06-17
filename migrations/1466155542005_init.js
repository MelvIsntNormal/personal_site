exports.up = function(pgm) {
  pgm.createTable("users", {
    name: {type: 'varchar(50)', primaryKey: true},
    _created: 'timestamp',
    _updated: 'timestamp'
  });
};