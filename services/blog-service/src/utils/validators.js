const Joi = require('joi')

module.exports.blogSchema = Joi.object({
    title: Joi.string()
    .required()
    .messages({
        'any.required': 'email is a required field'
    }),

    content: Joi.string()
    .required()
    .messages({
        'any.required': 'password field is required'
    }),

    author: Joi.string()
    .email({ minDomainSegments: 2, tlds: {allow: ['com', 'net']} })
    .required()
    .messages({
        'string.email': 'please provide the correct email formart',
        'any.required': 'email is a required field'
    })
})


module.exports.newUserSchema = Joi.object({
    firstName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
        'string.base': `firstName should be of type: 'text'`,
        'string.empty': `firstName can not be empty`,
        'string.min': 'firstName should contain at least 3 characters',
        'string.max': 'firstName should contain at most 30 charcters',
        'any.required': 'firstName is a required field'
    }),

    lastName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
        'string.base': `lastName should be of type: 'text'`,
        'string.empty': 'lastName can not be empty',
        'string.min': 'lastName should contain at least 3 characters',
        'string.max': 'lastName should contain at most 30 charcters',
        'any.required': 'lastName is a required field'
    }),

    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: {allow: ['com', 'net']} })
    .required()
    .messages({
        'string.email': 'please provide the correct email formart',
        'any.required': 'email is a required field'
    })
})