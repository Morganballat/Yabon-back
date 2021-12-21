-- Revert yabon-prono:role from pg

BEGIN;

-- XXX Add DDLs here.
--REVOKE ALL ON bet, match, sport, bookmaker FROM yabon_admin;

--DROP ROLE yabon_admin;


COMMIT;
