-- Revert yabon-prono:insertion from pg

BEGIN;

DELETE FROM  public.match;

DELETE FROM public.bet;

DELETE FROM public.bookmaker;

DELETE FROM public.sport;

DELETE FROM public.user;

COMMIT;
