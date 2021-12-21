-- Deploy yabon-prono:insertion to pg

BEGIN;

INSERT INTO public."user"
		(lastname, firstname, mail, "password", "role")
        VALUES 
		    ('julien', 'levieux', 'levieux-julien@gmail.com', 'bliblirpz', 'admin'),
		    ('wladimir','cornet','wladimir-cornet@gmail.com','mugenrpz','user');

INSERT INTO public.sport
		("name", league)
		VALUES
			('football','ligue 1'),
			('football','ligue 2');

INSERT INTO public.bookmaker
		(brand, slug)
		VALUES
			('unibet','https://unibet.fr/pari-sportif-poker'),
			('betclic','https://www.betclic.fr/');
			
INSERT INTO public.bet
		( created_date, "type", cote, mise, beting_team, gain, user_id, bookmaker_id)
		VALUES 
			('2021-03-02 15:00', 'combiné', '2.85','10','troyes clermont', 28.5,'1','1'),
			('2021-03-02 18:00', 'combiné', '10.87', '15', 'guingamp grenoble', 163.5, '1', '2'),
			('2021-03-03 13:00', 'simple', '1.70', '5', 'brest', 8.5, '1', '2'),
			('2021-03-03 12:00', 'simple', '1.57', '20', 'lyon', 31.4, '1', '2');
			
INSERT INTO public.match
		(host_team, visitor, "date", "end_game",score, winner_team, looser_team, cote, sport_id, bet_id)
		VALUES
			('brest','troyes','2021-03-02 20:00','2021-03-02 22:00','2-3','troyes','brest','1.50','2','1'),
			('clermont','grenoble','2021-03-02 20:00','2021-03-02 22:00', '3-1', 'clermont', 'grenoble','1.90','2','1'),
			('guingamp','nice','2021-03-02 20:00','2021-03-02 22:00','2-1', 'guingamp', 'nice', '3.75','2','2'),
			('grenoble','angers','2021-03-02 20:00','2021-03-02 22:00','1-0','grenoble', 'angers', '2.90', '2', '2'),
			('brest','montpelier','2021-03-03 19:00', '2021-03-02 21:00','1-0', 'brest', 'monptelier', '1.70','1','3'),
			('lyon','marseille','2021-03-03 19:00', '2021-03-02 21:00','2-0','lyon', 'marseille', '1.57', '1', '4');

COMMIT;
