const variatontPost = {
    post: (schema) => schema.required()
};

const Joi = require('joi');

const matchSchemas = Joi.object({

    host_team: Joi.string().alter(variatontPost),
    visitor: Joi.string().alter(variatontPost),
    date: Joi.date().alter(variatontPost),
    end_game: Joi.date().alter(variatontPost),
    score: Joi.string(),
    winner_team: Joi.string(),
    looser_team: Joi.string(),
    cote: Joi.number().alter(variatontPost),
    sport_id: Joi.number().alter(variatontPost),
    bet_id: Joi.number().alter(variatontPost)
});

const postMatchSchema = matchSchemas.tailor('post');

exports.postMatchSchema = postMatchSchema;
exports.matchSchemas = matchSchemas; 