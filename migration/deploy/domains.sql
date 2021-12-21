-- Deploy yabon-prono:domains to pg

BEGIN;

--DOMAIN Pos_float (float > 0) 
CREATE DOMAIN pos_float
    AS float
        CHECK (
            VALUE > 0
        );

--DOMAIN neg_float (float < 0)
CREATE DOMAIN neg_float
    AS float
        CHECK (
            VALUE < 0
        );

--DOMAIN valid_mail (regex = )
CREATE DOMAIN valid_mail
    AS text
        CHECK (
            VALUE ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'
        );


COMMIT;
