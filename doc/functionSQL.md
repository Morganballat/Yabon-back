```sql

-- fonction sql return random int
CREATE FUNCTION random_int(min int, max int) RETURNS int AS $$

    SELECT (round(random() * (max - min)) + min)::int;

$$ LANGUAGE sql;

-- call the function
SELECT * FROM random_int(1,5);


-- Generate a list of date timestamptz with 60 minutes interval between 2 dates
SELECT generate_series(
	'2020-10-10 09:00'::timestamptz,
	'2021-01-11 09:00'::timestamptz,
	'60 minutes'	
)



-- function Insert SPORT


CREATE FUNCTION insert_sport ( lbl text, lge text) RETURNS sport AS $$
	INSERT INTO sport("name", league)
	VALUES ( lbl, lge) 
	RETURNING *;
$$ LANGUAGE sql;

SELECT insert_sport('football','ligua Espagnol');
```

