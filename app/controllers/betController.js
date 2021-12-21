const { request } = require('express');

const betsMapper = require('../models/betsMapper'); 

const Bets = require('../models/bets');


const betsController = {

    // Controller qui récupére tous les  bets 
    getAllBets: async (req, res) => {
        const bets = await betsMapper.allBet();

        res.json(bets);
    },

    // Controller qui récupére tous les simple bets
    getAllSimpleBets: async (req, res) => {

        const simpleBets = await betsMapper.allSimpleBets();

        res.json(simpleBets);
    },

    // Controller qui récupére tous les combine bets
    getAllCombineBets: async (req, res) => {

        const combineBets = await betsMapper.allCombineBets();

        res.json(combineBets);
    },

    getAllLastBetsPlayed: async (req, res) => {

        const allLastBetsPlayed = await betsMapper.allLastBetsPlayed();

        res.json(allLastBetsPlayed);
    },

    getLastBetPlayed: async (req, res) => {

        const lastBetPlayed = await betsMapper.lastBetPlayed();

        res.json(lastBetPlayed);
    },

    getAllLastBetsIncoming: async (req, res) => {

        const allLastBetsIncoming = await betsMapper.allLastBetsIncoming();

        res.json(allLastBetsIncoming);
    },

    getLastBetIncoming: async (req, res) => {

        const lastBetIncoming = await betsMapper.lastBetIncoming();

        res.json(lastBetIncoming);
    },

    // Controller qui récupére un bet via sont id
    getOneBet: async (req, res) => {
        const { id } = req.params;

        try {
            const bet = await betsMapper.findOne(id);

            res.json(bet);
        } catch (err) {

            res.status(404).json(err.message);
        };
    },

    getOneSimpleBet: async (req, res) => {

        const { id } = req.params;

        try {
            const simpleBet = await betsMapper.findOneSimpleBet(id);

            res.json(simpleBet);
        } catch (err) {

            res.status(404).json(err.message);
        };
    },

    getOneCombineBet: async (req, res) => {

        const { id } = req.params;

        try {
            const combineBet = await betsMapper.findOneCombineBet(id);

            res.json(combineBet);
        } catch (err) {

            res.status(404).json(err.message);
        };
    },

    getLastCombineBet: async (req, res) => {


        const lastCombineBet = await betsMapper.lastCombineBet();

        res.json(lastCombineBet);

    },

    getLastSimpleCombineBet: async (req, res) => {

        const lastSimpleBet = await betsMapper.lastSimpleBet();

        res.json(lastSimpleBet);
    },

    getBestBet: async (req, res) => {

        const betBest = await betsMapper.betBest();

        res.json(betBest);
    },

    getBadestBet: async (req, res) => {

        const badestBet = await betsMapper.badestBet();

        res.json(badestBet);
    },

    // Controller qui crée un bet
    saveBet: async (req, res) => {

        const theBet = new Bets(req.body);

        try {
            await betsMapper.save(theBet);


            res.json(theBet);
        } catch {
            res.status(403).json(err.message)
        };
    },

    // Controller qui suprime un bet va sont id 
    deleteBet: async (req, res) => {

        const { id } = req.params;

        try {

            const bet = await betsMapper.delete(id);
            res.json(bet);
            
        } catch (err) {

            res.status(404).json(err.message);
        };

    }, 

    updateBet: async (req, res) => {

        const { id } = req.params;
        const data = req.body;

        try {

        const bet = await betsMapper.findOne(id);

        if (bet) {
            // je vérifie les champs qui sont renseignés dans le body
            //et je compléte ce qui n'est pas présent 
            for ( field in data){
                if (typeof bet[field] !== 'undefined'){
                    bet[field] = data[field];
                }
            };

            const newBet = new Bets(bet);
            await betsMapper.update(newBet);
            res.json(newBet);
        };
        } catch (err){
            res.status(404).json(err.message);
        };

    }
};

module.exports = betsController;