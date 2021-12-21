-- Deploy yabon-prono:views to pg

BEGIN;

--  3 dernier paris simple
CREATE VIEW last_simple_bet AS
SELECT 
bet.id, bet.created_date, bet.type, bet.cote, bet.mise, bet.beting_team, bet.gain, bet.user_id, bet.bookmaker_id,
"match".id AS matchId, "match".host_team, "match".visitor, "match".date, "match".end_game, "match".score, "match".winner_team, "match".looser_team, "match".cote AS matchCote, "match".sport_id, "match".bet_id,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug,
sport.id AS sportId, sport.name, sport.league 
FROM bet
JOIN "match" ON match.bet_id = bet.id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
JOIN sport ON sport.id = match.sport_id
WHERE "type" = 'simple'
ORDER BY created_date LIMIT 3;


--3 dernier paris combiné
CREATE VIEW last_combine_bet AS
SELECT 
bet.id, bet.created_date, bet.type, bet.cote, bet.mise, bet.beting_team, bet.gain, bet.user_id, bet.bookmaker_id,
"match".id AS matchId, "match".host_team, "match".visitor, "match".date, "match".end_game, "match".score, "match".winner_team, "match".looser_team, "match".cote AS matchCote, "match".sport_id, "match".bet_id,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug,
sport.id AS sportId, sport.name, sport.league 
FROM bet
JOIN "match" ON match.bet_id = bet.id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
JOIN sport ON sport.id = match.sport_id
WHERE "type" = 'combiné'
ORDER BY created_date LIMIT 3;

-- dernier paris en cours

CREATE VIEW all_last_bet_incoming AS
SELECT 
bet.id, bet.created_date, bet.type, bet.cote, bet.mise, bet.beting_team, bet.gain, bet.user_id, bet.bookmaker_id,
"match".id AS matchId, "match".host_team, "match".visitor, "match".date, "match".end_game, "match".score, "match".winner_team, "match".looser_team, "match".cote AS matchCote, "match".sport_id, "match".bet_id,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug,
sport.id AS sportId, sport.name, sport.league 
FROM bet
JOIN "match" ON match.bet_id = bet.id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
JOIN sport ON sport.id = match.sport_id
WHERE "score" IS NULL;


-- tout les derniers paris resolu
CREATE VIEW all_last_bet_resolved AS
SELECT 
bet.id, bet.created_date, bet.type, bet.cote, bet.mise, bet.beting_team, bet.gain, bet.user_id, bet.bookmaker_id,
"match".id AS matchId, "match".host_team, "match".visitor, "match".date, "match".end_game, "match".score, "match".winner_team, "match".looser_team, "match".cote AS matchCote, "match".sport_id, "match".bet_id,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug,
sport.id AS sportId, sport.name, sport.league 
FROM bet
JOIN "match" ON match.bet_id = bet.id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
JOIN sport ON sport.id = match.sport_id
WHERE "score" IS NOT NULL;

-- le dernier paris en cours
CREATE VIEW last_bet AS
SELECT 
bet.id, bet.created_date, bet.type, bet.cote, bet.mise, bet.beting_team, bet.gain, bet.user_id, bet.bookmaker_id,
"match".id AS matchId, "match".host_team, "match".visitor, "match".date, "match".end_game, "match".score, "match".winner_team, "match".looser_team, "match".cote AS matchCote, "match".sport_id, "match".bet_id,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug,
sport.id AS sportId, sport.name, sport.league 
FROM bet
JOIN "match" ON match.bet_id = bet.id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
JOIN sport ON sport.id = match.sport_id
WHERE "score" IS NULL
ORDER BY created_date LIMIT 1;


--le dernier paris resolu
CREATE VIEW last_bet_resolved AS
SELECT 
bet.id, bet.created_date, bet.type, bet.cote, bet.mise, bet.beting_team, bet.gain, bet.user_id, bet.bookmaker_id,
"match".id AS matchId, "match".host_team, "match".visitor, "match".date, "match".end_game, "match".score, "match".winner_team, "match".looser_team, "match".cote AS matchCote, "match".sport_id, "match".bet_id,
bookmaker.id AS bookmakerId, bookmaker.brand, bookmaker.slug,
sport.id AS sportId, sport.name, sport.league 
FROM bet
JOIN "match" ON match.bet_id = bet.id
JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
JOIN sport ON sport.id = match.sport_id
WHERE "score" IS NOT NULL
ORDER BY score LIMIT 1;


CREATE VIEW march_review AS
SELECT sum(bet.gain) FROM bet
WHERE created_date > '2021-03-01 00:00'  AND created_date < '2021-03-31 23:59' ;

COMMIT;
