const User = require('./users');

const db = require('../database');

const userMapper = {

    // Récupére tous les users
    allUsers: async () => {
        //Va chercher tous les users
        const result = await db.query(`
        SELECT *
        FROM users.user;
        `);
        // On retourne sous forme d'intance de user
        return result.rows.map(data => new User(data));
    },

    // on viens chercher un user 
    findOne : async (id) => {
        
        const query = `SELECT * FROM users.user WHERE id=$1`;

        const result = await db.query( query, [id]);

        if (!result.rows[0]){
            throw new Error("Carton rouge ! ce compte n'éxiste pas !")
        }
        return new User(result.rows[0])
    },

    // création d'un user en bdd
    save : async (newUser) => {

        let query = `INSERT INTO users.user(
            lastname, firstname, mail, password, role)
            VALUES ($1, $2, $3, $4, $5) RETURNING id ;`

        const data = [
            newUser.lastname,
            newUser.firstname,
            newUser.mail,
            newUser.password,
            newUser.role,
        ]

      

        try {
            const {rows } = await db.query(query, data);
            
            newUser.id = rows[0].id;
        } catch (err) {

            console.trace(err)
        }

    },

    update : async (newUser) => {
        
        const query = `UPDATE users.user
        SET lastname=$1, firstname=$2, mail=$3, password=$4, role=$5
        WHERE id = $6;`;

        const data = [
            newUser.lastname,
            newUser.firstname,
            newUser.mail,
            newUser.password,
            newUser.role,
            newUser.id
        ]
        try {
            await db.query(query, data)
        } catch (err) {
            console.trace(err);
        }
    },

    login : async (mail) => {
        
        
        const query = `SELECT * FROM users.user WHERE mail = $1`
        try {

            const {rows} = await db.query(query, [mail])


            return new User(rows[0])
        
        }catch(err) {
            throw new Error("Carton rouge ! email not found !")

        }
        

    },
    
    delete : async (id) => {
        const result = await userMapper.findOne(id)
        
        
        
        if(result){
            await db.query( `DELETE FROM users.user
            WHERE id=$1 RETURNING *;`, [id]);
            return `The account of ${result.mail} was deleted`
        } else {
            throw new Error("Carton rouge ! ce compte n'éxiste pas !");
        };    
    }
}
    

module.exports = userMapper;