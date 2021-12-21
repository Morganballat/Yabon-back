const { request } = require('express');

const sportsMapper = require('../models/sportsMapper');

const Sports = require('../models/sports');

const sportsController = {

    // Controller qui va chercher tous les sports 
    getAllSports: async (req, res) => {
        const sports = await sportsMapper.allSports();

        res.json(sports);
    },

    // Controller qui va cherche un sort via sont id
    getOneSport: async (req, res) => {
        const { id } = req.params;

        try {
            const sport = await sportsMapper.findOne(id);

            res.json(sport);
        } catch (err) {

            res.status(404).json(err.message);
        }
    },

    // Controller qui ajoute un sport 
    saveSport: async (req, res) => {

        const theSport = new Sports(req.body);

        try {
            await sportsMapper.save(theSport);


            res.json(theSport);
        } catch {
            res.status(403).json(err.message)
        };
    },

    // Controller qui modofie un sport via sont id
    updateSport: async (req, res) => {

        const { id } = req.params;
        const data = req.body;

        try {

        const sport = await sportsMapper.findOne(id);

        if (sport) {
            // je vérifie les champs qui sont renseignés dans le body
            //et je compléte ce qui n'est pas présent 
            for ( field in data){
                if (typeof sport[field] !== 'undefined'){
                    sport[field] = data[field];
                }
            };

            const newSport = new Sports(sport);
            await sportsMapper.update(newSport);
            res.json(newSport);
        };
        } catch (err){
            res.status(404).json(err.message);
        };

    },

    // Controller qui suprime un sport va sont id 
    deleteSport: async (req, res) => {

        const { id } = req.params;

        try {

            const sport = await sportsMapper.delete(id);
            res.json(sport);

        } catch (err) {

            res.status(404).json(err.message);
        };

    },
};

module.exports = sportsController;