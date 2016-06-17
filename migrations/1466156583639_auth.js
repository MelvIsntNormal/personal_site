exports.up = function(pgm) {
  pgm.createType('auth_service', [
    '_self',
    'twitter',
    'google'
  ]);

  pgm.createTable('auth', {
    user_name: {type: 'string', notNull: true, references: 'users(name)'},
    auth_service: {type: 'auth_service'},
    token: 'varchar',
    meta: 'json'
  });

  pgm.addConstraint('auth', 'pk_auth', 'PRIMARY KEY (user_name, auth_service)');
};