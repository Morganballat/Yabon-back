const { request } = require('express');

const bookmakersMapper = require('../models/bookmakersMapper');

const Bookmakers = require('../models/bookmakers');

const bookmakersController = {

    // Controller qui va chercher tous les bookmakers
    getAllBookmakers: async (req, res) => {
        const bookmakers = await bookmakersMapper.allBookmakers();

        res.json(bookmakers);
    },

    // Controller qui va cherche un bookmaker via sont id
    getOneBookmaker: async (req, res) => {
        const { id } = req.params;

        try {
            const bookmaker = await bookmakersMapper.findOne(id);

            res.json(bookmaker);
        } catch (err) {

            res.status(404).json(err.message);
        }
    },

    // Controller qui ajoute un bookmaker 
    saveBookmaker: async (req, res) => {

        const theBookmaker = new Bookmakers(req.body);

        try {
            await bookmakersMapper.save(theBookmaker);


            res.json(theBookmaker);
        } catch {
            res.status(403).json(err.message)
        };
    },

    // Controller qui modofie un bookmaker via sont id
    updateBookmaker: async (req, res) => {

        const { id } = req.params;
        const data = req.body;

        try {

            const bookmaker = await bookmakersMapper.findOne(id);

            if (bookmaker) {
                // je vérifie les champs qui sont renseignés dans le body
                //et je compléte ce qui n'est pas présent 
                for (field in data) {
                    if (typeof bookmaker[field] !== 'undefined') {
                        bookmaker[field] = data[field];
                    }
                };

                const newBookmaker = new Bookmakers(bookmaker);
                await bookmakersMapper.update(newBookmaker);
                res.json(newBookmaker);
            };
        } catch (err) {
            res.status(404).json(err.message);
        };

    },

    deleteBookmaker: async (req, res) => {

        const { id } = req.params;

        try {
            const bookmaker = await bookmakersMapper.delete(id);
            res.json(bookmaker);

        } catch (err) {

            res.status(404).json(err.message);
        };
    },
};

module.exports = bookmakersController;