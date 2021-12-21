-- Deploy yabon-prono:remove-user to pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE users.user SET SCHEMA public;

COMMIT;
