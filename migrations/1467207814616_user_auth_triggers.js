exports.up = function(pgm) {
  pgm.sql('CREATE TRIGGER update_timestamp ' + 
    'BEFORE UPDATE ON users ' + 
    'EXECUTE PROCEDURE update_timestamp();'
  );

  pgm.sql('CREATE TRIGGER update_timestamp ' + 
    'BEFORE UPDATE ON auth ' + 
    'EXECUTE PROCEDURE update_timestamp();'
  );
};