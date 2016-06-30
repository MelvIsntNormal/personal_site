exports.up = function(pgm) {
  pgm.createType('auth_service', [
    '_self',
    'twitter',
    'google'
  ]);

  pgm.createTable('auth', {
    user_id: {type: 'integer', notNull: true, references: 'users(id)'},
    auth_service: {type: 'auth_service', notNull: true},
    token: {type: 'varchar', notNull: true},
    meta: 'json',
    _created: {type: 'timestamp', default: pgm.func('now()')},
    _updated: {type: 'timestamp', default: pgm.func('now()')}
  });

  pgm.addConstraint('auth', 'pk_auth', 'PRIMARY KEY (user_id, auth_service)');
};