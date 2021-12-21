const variatontPost = {
    post: (schema) => schema.required()
};

const Joi = require('joi');

const betSchemas = Joi.object({

    type: Joi.string().alter(variatontPost),
    cote: Joi.number().alter(variatontPost),
    mise: Joi.number().alter(variatontPost),
    beting_team: Joi.string().alter(variatontPost),
    gain: Joi.number(),
    user_id: Joi.number().alter(variatontPost),
    bookmaker_id: Joi.number().alter(variatontPost)
});

const postBetSchema = betSchemas.tailor('post');


exports.postBetSchema = postBetSchema;
exports.betSchemas = betSchemas;