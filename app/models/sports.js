const db = require('../database');

class Sports {

    id;
    name;
    league;

    constructor(data) {
        for (const prop in data){
            this[prop] = data[prop];
        };
    };
};

module.exports = Sports;