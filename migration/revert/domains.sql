-- Revert yabon-prono:domains from pg

BEGIN;

-- XXX Add DDLs here.

DROP DOMAIN valid_mail,
            neg_float,
            pos_float;

COMMIT;
