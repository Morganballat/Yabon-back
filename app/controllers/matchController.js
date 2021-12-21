const { request } = require('express');
const Matchs = require('../models/matchs');
const matchsMapper = require('../models/matchsMapper'); 

const matchsController = {

    getAllMatchs: async (req, res) => {
        const matchs = await matchsMapper.allMatch();

        res.json(matchs);
    },


    getOneMatch: async (req, res) => {
        const { id } = req.params;

        try {
            const match = await matchsMapper.findOne(id);

            res.json(match);
        } catch (err) {

            res.statu(404).json(err.message);
        }
    },

    saveMatch: async (req, res) => {

        const theMatch = new Matchs(req.body);

        try {
            await matchsMapper.save(theMatch);


            res.json(theMatch);
        } catch {
            res.status(403).json(err.message)
        };
    },
    
    // Controller qui suprime un match va sont id 
    deleteMatch: async (req, res) => {

        const { id } = req.params;

        try {
            const match = await matchsMapper.delete(id);

            res.json(match);
        } catch (err) {

            res.status(404).json(err.message);
        };
    },

    updateMatch: async (req, res) => {

        const { id } = req.params;
        const data = req.body;

        try {

            const match = await matchsMapper.findOne(id);

            if (match) {
                // je vérifie les champs qui sont renseignés dans le body
                //et je compléte ce qui n'est pas présent 
                for (field in data) {
                    if (typeof match[field] !== 'undefined') {
                        match[field] = data[field];
                    }
                };

                const newMatch = new Matchs(match);
                await matchsMapper.update(newMatch);
                res.json(newMatch);
            };
        } catch (err) {
            res.status(404).json(err.message);
        };

    }

    
};

module.exports = matchsController; 