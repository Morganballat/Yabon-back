const db = require('../database'); 

class Matchs {

    id;
    host_team;
    visitor;
    date;
    end_game;
    score;
    winner_team;
    looser_team;
    cote;
    sport_id;
    bet_id;

    constructor(data) {
        for (const prop in data){
            this[prop] = data[prop];
        }
    };
};

module.exports = Matchs;