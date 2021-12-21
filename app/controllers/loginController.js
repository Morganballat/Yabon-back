const userMapper = require('../models/usersMapper');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');
const  User  = require('../models/users');


const loginController = {


    register : async (req, res) => {

        const UserToSave = await userMapper.login







        
    },

    login : (req, res) => {

    },

    logout : (req, res) => {

    },

};

module.exports = loginController;
