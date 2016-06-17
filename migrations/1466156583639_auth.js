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
    meta: 'json',
    _created: {type: 'timestamp', default: 'now'},
    _updated: {type: 'timestamp', default: 'now'}
  });

  pgm.addConstraint('auth', 'pk_auth', 'PRIMARY KEY (user_name, auth_service)');
  pgm.sql('CREATE TRIGGER update_timestamp ' + 
    'BEFORE UPDATE ON auth ' + 
    'EXECUTE PROCEDURE update_timestamp();'
  );
};