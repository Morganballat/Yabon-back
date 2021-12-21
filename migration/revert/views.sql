-- Revert yabon-prono:views from pg

BEGIN;

-- XXX Add DDLs here.

DROP VIEW march_review CASCADE;

DROP VIEW  last_bet_resolved CASCADE;

DROP VIEW last_bet CASCADE;

DROP VIEW all_last_bet_resolved CASCADE;

DROP VIEW all_last_bet_incoming;


DROP VIEW last_combine_bet CASCADE;


DROP VIEW last_simple_bet CASCADE;


COMMIT;
