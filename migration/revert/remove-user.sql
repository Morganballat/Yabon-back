-- Revert yabon-prono:remove-user from pg

BEGIN;

-- XXX Add DDLs here.
ALTER TABLE public.user SET SCHEMA users.user;

COMMIT;
