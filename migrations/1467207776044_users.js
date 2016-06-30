exports.up = function(pgm) {
  pgm.createTable("users", {
    id: {type: 'serial', primaryKey: true},
    name: {type: 'varchar(50)', notNull: true},
    _created: {type: 'timestamp', default: pgm.func('now()')},
    _updated: {type: 'timestamp', default: pgm.func('now()')}
  });
};