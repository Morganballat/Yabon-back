const variatontPost = {
    post: (schema) => schema.required()
};

const Joi = require('joi');

const sportSchemas = Joi.object({

    name: Joi.string().alter(variatontPost),
    league: Joi.string().alter(variatontPost)
});

const postSportSchemas = sportSchemas;

exports.postSportSchemas = postSportSchemas;
exports.sportSchemas = sportSchemas;