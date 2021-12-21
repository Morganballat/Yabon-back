-- Revert yabon-prono:create-table from pg

BEGIN;

DROP TABLE  match,
            bet,
            bookmaker,
            sport,
            "user";



COMMIT;
