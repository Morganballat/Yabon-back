require('dotenv').config()

const userMapper = require('../models/usersMapper')
const bcrypt = require('bcrypt')
const jwt = require('../services/jwt')
const  User  = require('../models/users')



const usersController = {

    // Controller qui va chercher tous les Users
    getAllUsers: async (req, res) => {
        const users = await userMapper.allUsers();

        res.json(users);
    },

    oneUser : async (request, response) => {
        const {id} = request.params

        try {

            const user = await userMapper.findOne(id);

            response.json(user);

        }catch(err){

            response.status(404).json(err.message);
        }
    },

    saveUser : async (request, response) => {      
        
        try {
            
            // on vient chercher le req.body qui contient le nouvelle utilisateur a enregistrer
            // et on le passe a notre constructor User
            const newUser = new User(request.body);

            // on verifie que tout les champs sont bien renseignés
            if(newUser.mail == null || 
                newUser.password == null ||
                newUser.firstname == null || 
                newUser.lastname == null || 
                newUser.role ==  null){
                    return response.status(400).json({'error' : 'Veuillez remplir tout les champs'})
                }

            // on utilse bcrypt pour hashé le mdp
            newUser.password = await bcrypt.hash(request.body.password, 10)

            // si tout est ok on l'enregistre en BDD
            await userMapper.save(newUser);

            // je renvois au client l'id du nouvel utilisateur avec le status 201
            response.status(201).json(newUser.id);
        } catch (err) {
            response.status(403).json(err.message);
        }
    },

    login : async (request, response) => {
        
       // je récupère le contenu de req.body dans un objet user
        const user = { 
            mail : request.body.mail,
            password: request.body.password
        }

        // On verifie que tout les champs sont bien renseignés
        if (user.mail == null || user.password == null){
            return response.status(400).send({'error' : 'missing parameters'})
        }

        // si tout est ok on cherche l'email dans la bdd
        const userToLog = await userMapper.login(user.mail);
        
        //On compare le mots de passe envoyer par le client avec celui en bdd
        const check = await bcrypt.compare(user.password, userToLog.password)

        // si tout es ok :
        if(check){

            // je viens chercher le role du user en bdd
            user.role = userToLog.role
            
            // verfification admin /user
            if(user.role === 'admin'){
                user.isAdmin = true
            } else {
                user.isAdmin = false
            }


            // génération du token
            const token = jwt.generateTokenForUser(userToLog, user.isAdmin)
            response.header('auth-token', token)

            
            response.status(200).json({
                accessToken : token
            })
        }else {
            response.status(400).json(`adresse mail ou mots de passe incorrect`)
        }


    },

    logout : (req, res) => {

    },

    updateUser : async (request, response) => {
        
        try  {
            const {id} = request.params;

            const userData = request.body;

            const user = await userMapper.findOne(id);

            if(user) {
                for (let field in userData){
                    if (typeof user[field] !== 'undefined'){
                        user[field] = userData[field];
                    }
                }
            }

            const newUser = new User(user);
            await userMapper.update(newUser);
            response.json(newUser);
        } catch (err) {
            response.status(404).send(err.message);
        }
        
    },

    deleteUser : async (request, response) => {

        const {id } = request.params;

        try {
            const user = await userMapper.delete(id);
            response.json(user);
        }catch (err) {
            response.status(404).json(err.message)
        }
    }
}

module.exports = usersController;
