-- Deploy yabon-prono:schema-postgres to pg

BEGIN;

-- XXX Add DDLs here.
CREATE SCHEMA users;

ALTER TABLE "user" SET SCHEMA users;

CREATE DOMAIN users.valid_name AS text CHECK (VALUE ~ '^[a-zA-Z-]{2,20}$');




COMMIT;
