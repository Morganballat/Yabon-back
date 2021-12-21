-- Deploy yabon-prono:create-table to pg

BEGIN;


CREATE TABLE "user"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    lastname text NOT NULL,
    firstname text NOT NUll,
    mail valid_mail NOT NULL UNIQUE,
    "password" text NOT NULL UNIQUE,
    "role" text NOT NULL

);

CREATE TABLE sport (
    
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    league text NOT NULL
);

CREATE TABLE bookmaker (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand text NOT NULL UNIQUE,
    slug text NOT NULL
);

CREATE TABLE bet(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_date timestamptz,
    "type" text NOT NULL, 
    cote pos_float NOT NULL,
    mise pos_float NOT NULL,
    beting_team text NOT NULL,
    gain float, 
    "user_id" int NOT NULL REFERENCES "user"(id),
    bookmaker_id int NOT NULL REFERENCES bookmaker(id) ON DELETE CASCADE
);

CREATE TABLE match(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    host_team text NOT NULL,
    visitor text NOT NULL,
    "date" timestamptz NOT NULL,
    end_game timestamptz NOT NULL,
    score text,
    winner_team text,
    looser_team text,
    cote pos_float NOT NULL,
    sport_id int REFERENCES sport(id) ON DELETE CASCADE,
    bet_id int REFERENCES bet(id) ON DELETE CASCADE

);


-- XXX Add DDLs here.
COMMIT;
