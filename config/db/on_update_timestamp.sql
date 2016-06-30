CREATE OR REPLACE FUNCTION update_timestamp() RETURNS trigger AS $update_timestamp$
BEGIN
  NEW._updated := now();
  RETURN NEW;
END;
$update_timestamp$ LANGUAGE plpgsql