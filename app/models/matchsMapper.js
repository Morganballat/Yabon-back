const db = require('../database');

const Matchs = require('./matchs');

const matchsMapper = {

    // Méthode pour récupérer tous les matchs
    allMatch: async () => {
        //Va chercher tous les matchs
        const result = await db.query(`
        SELECT *
        FROM "match";
        `);
        // On retourne sous forme d'intance de bets
        return result.rows.map(data => new Matchs(data));
    },

    //va chercher un match via sont id 
    findOne: async (id) => {
        const result = await db.query(`
        SELECT * 
        FROM match
        WHERE match.id = $1;
        `, [id]);

        if (!result.rows[0]) {
            throw new Error ("Pas de match avec l'id " + id);
        }

        return new Matchs(result.rows[0]);
    },

    // delete un match via sont id
    delete: async (id) => {
        const result = await matchsMapper.findOne(id);

        if (result) {
            await db.query(`
        DELETE FROM "match" WHERE match.id = $1;
        `, [id]);
        } else {
            throw new Error("Pas de match avec l'id " + id);
        };
    }, 

    // Crée un nouveaux match
    save: async (theMatch) => {

        const data = [
            theMatch.host_team,
            theMatch.visitor,
            theMatch.date,
            theMatch.end_game,
            theMatch.score,
            theMatch.winner_team,
            theMatch.looser_team,
            theMatch.cote,
            theMatch.sport_id,
            theMatch.bet_id
        ];

        const query = `
        INSERT INTO match(host_team, visitor, date, end_game, score, winner_team, looser_team, cote, sport_id, bet_id)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
        `;

        try {
            await db.query(query, data);
        } catch (err) {
            console.log(err)
        };
    },

    //update un match via sont id
    update: async (newMatch) => {
        try {
            await db.query(`
            UPDATE "match"
            SET host_team = $1,
                visitor = $2,
                date = $3,
                end_game = $4,
                score = $5,
                winner_team = $6,
                looser_team = $7,
                cote = $8,
                sport_id = $9,
                bet_id = $10
            WHERE id = $11;
            `, [
            newMatch.host_team, newMatch.visitor, newMatch.date,
            newMatch.end_game, newMatch.score, newMatch.winner_team,
            newMatch.looser_team, newMatch.cote, newMatch.sport_id, newMatch.bet_id,
            newMatch.id
            ]);
        } catch (error) {
            throw new Error(error);
        };
    }

};

module.exports = matchsMapper;