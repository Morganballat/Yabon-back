-- Revert yabon-prono:schema-postgres from pg

BEGIN;

-- XXX Add DDLs here.
DROP DOMAIN users.valid_name;

ALTER TABLE users.user SET SCHEMA public;

DROP SCHEMA users;




COMMIT;
