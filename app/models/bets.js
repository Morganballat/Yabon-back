const db = require('../database');

class Bets {

    id;
    create_date;
    type;
    cote;
    mise;
    beting_team;
    gain;
    user_id;
    bookmaker_id;

    constructor(data) {
        for (const prop in data){
            this[prop] = data[prop];
        };
    };
};

module.exports = Bets; 