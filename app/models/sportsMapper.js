const Sports = require('./sports');

const db = require('../database');

const sportsMapper = {

    // Récupére tous les sport
    allSports: async () => {
        //Va chercher tous les sports
        const result = await db.query(`
        SELECT *
        FROM sport;
        `);
        // On retourne sous forme d'intance de sports
        return result.rows.map(data => new Sports(data));
    },
    
    // Récupere un sport via sont id
    findOne: async (id) => {
        //Va chercher un sport précis (id) dans la table sport
        const result = await db.query(`
        SELECT *
        FROM sport
        WHERE sport.id = $1;
        `, [id]);

        if (!result.rows[0]) {
            throw new Error("Pas de sport avec l'id " + id);
        }

        return new Sports(result.rows[0]);
    },

    // Ajoute un sport 
    save: async (theSport) => {

        const data = [
            theSport.name,
            theSport.league
        ];

        const query = `
        INSERT INTO sport (name, league)
        VALUES($1, $2)
        RETURNING *;
        `;

        try {
            await db.query(query, data);
        } catch (err) {
            console.log(err)
        };
    },

    // Modifie un sport
    update: async (newSport) => {
        try {
            await db.query(`
            UPDATE sport
            SET name = $1,
                league = $2
            WHERE id = $3;
            `, [newSport.name, newSport.league, newSport.id, ]);
        } catch (error) {
            throw new Error(error);
        };
    }, 

    delete: async (id) => {

        const result = await sportsMapper.findOne(id);

        if (result) {
            await db.query(`
            DELETE FROM "sport" WHERE sport.id = $1;
            `, [id]);
        } else {
            throw new Error("Pas de sport avec l'id " + id);
        };
    }
    

};

module.exports = sportsMapper;