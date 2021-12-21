const Bets = require('./bets'); 

const db = require('../database');

const betsMapper = {

    // Méthode pour récupérer tous les bets
    allBet: async () => {
        //Va chercher tous les bets
        const result = await db.query(`
        SELECT *
        FROM bet
        JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
        JOIN "match" ON "match".bet_id = bet.id
        JOIN sport ON sport.id = "match".sport_id;
        `);
        // On retourne sous forme d'intance de bets
        return result.rows.map(data => new Bets(data));
    },

    // Méthode pour récupérer tous les simple bets 
    allSimpleBets: async () => {

        const result = await db.query(`
        SELECT * 
        FROM bet
        JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
        JOIN "match"ON "match".bet_id = bet.id
        JOIN sport ON sport.id = "match".sport_id
        WHERE bet.type = 'simple';
        `);

        return result.rows.map(data => new Bets(data));
    },

    // Méthode pour récupérer tous les bets combiné 
    allCombineBets: async () => {

        const result = await db.query(`
        SELECT * 
        FROM bet
        JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
        JOIN "match"ON "match".bet_id = bet.id
        JOIN sport ON sport.id = "match".sport_id
        WHERE bet.type = 'combiné';
        `);

        return result.rows.map(data => new Bets(data));
    },

    allLastBetsPlayed: async () => {

        const result = await db.query(`
        SELECT *
        FROM all_last_bet_resolved;
        `);

        return result.rows.map(data => new Bets(data));
    },

    lastBetPlayed: async () => {

        const result = await db.query(`
        SELECT *
        FROM last_bet_resolved
        `);

        return result.rows.map(data => new Bets(data));
    },

    allLastBetsIncoming: async () => {

        const result = await db.query(`
        SELECT *
        FROM all_last_bet_incoming;
        `)

        return result.rows.map(data => new Bets(data));
    },

    lastBetIncoming: async () => {

        const result = await db.query(`
        SELECT *
        FROM all_last_bet_incoming;
        `);

        return result.rows.map(data => new Bets(data));
    },

    findOne: async (id) => {
        //Va chercher un bet précis (id) dans la table bet
        const result = await db.query(`
        SELECT *
        FROM bet
        JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
        JOIN "match"
        ON "match".bet_id = bet.id
        JOIN sport ON sport.id = "match".sport_id
        WHERE bet.id = $1;
        `,[id]);

        if (!result.rows[0]) {
            throw new Error ("Pas de bet avec l'id " + id);
        }

        return new Bets(result.rows[0]);
    },

    findOneSimpleBet: async (id) => {

        const result = await db.query(`
        SELECT *
        FROM bet
        JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
        JOIN "match"
        ON "match".bet_id = bet.id
        JOIN sport ON sport.id = "match".sport_id
        WHERE bet.type = 'simple'
        AND bet.id = $1;
        `, [id]);

        if (!result.rows[0]) {
            throw new Error("Pas de bet avec l'id " + id);
        }

        return new Bets(result.rows[0]);
    },

    findOneCombineBet: async (id) => {

        const result = await db.query(`
        SELECT *
        FROM bet
        JOIN bookmaker ON bookmaker.id = bet.bookmaker_id
        JOIN "match"
        ON "match".bet_id = bet.id
        JOIN sport ON sport.id = "match".sport_id
        WHERE bet.type = 'combiné'
        AND bet.id = $1;
        `, [id]);

        if (!result.rows[0]) {
            throw new Error("Pas de bet avec l'id " + id);
        }

        return new Bets(result.rows[0]);
    },

    lastCombineBet: async () => {

        const result =  await db.query(`
            SELECT *
            FROM last_combine_bet;
        `);

        return result.rows.map(data => new Bets(data));
    },

    lastSimpleBet: async () => {

        const result = await db.query(`
            SELECT *
            FROM last_simple_bet;
        `);

        return result.rows.map(data => new Bets(data));
    },

    betBest: async () => {

        const result = await db.query(`
        SELECT * FROM bet
        WHERE "gain"
        IS NOT NULL
        ORDER BY "gain"
        DESC LIMIT 1
        `);

        return result.rows.map(data => new Bets(data));
    },

    badestBet: async () => {

        const result = await db.query(`
        SELECT * FROM bet
        WHERE "gain"
        IS NOT NULL
        ORDER BY "gain"
        LIMIT 1;
        `);

        return result.rows.map(data => new Bets(data));
    },

    save: async (theBet) => {

        const data = [
            theBet.type,
            theBet.cote,
            theBet.mise,
            theBet.beting_team,
            theBet.user_id,
            theBet.bookmaker_id

        ];

        const query = `
        INSERT INTO bet(type, cote, mise, beting_team, user_id, bookmaker_id)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *;
        `;

        try {
            await db.query(query, data);
        } catch (err) {
            console.log(err)
        };
    },

    delete: async (id) => {

        const result = await betsMapper.findOne(id);
        
        if (result) {
            await db.query(`
            DELETE FROM "bet" WHERE bet.id = $1;
            `, [id]);
        } else {
            throw new Error("Pas de bet avec l'id " + id);
        };
    },

    update: async(newBet) => {
        try {
            await db.query(`
            UPDATE bet
            SET type = $1,
                cote = $2,
                mise = $3,
                beting_team = $4,
                user_id = $5,
                bookmaker_id = $6
            WHERE id = $7;
            `,[newBet.type ,newBet.cote, newBet.mise, newBet.beting_team, newBet.user_id,newBet.bookmaker_id, newBet.id]);
        } catch (error) {
            throw new Error(error);
        };
    }
}; 

module.exports = betsMapper; 