const Joi = require('joi')

module.exports.userRegistrationSchema = Joi.object({
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
    }),

    password: Joi.string()
    .min(8)
    .required()
    .messages({
        'any.required': 'password field is required',
        'string.min': 'password should contain at least 8 characters'
    })
})

module.exports.userLoginSchema = Joi.object({
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: {allow: ['com', 'net']} })
    .required()
    .messages({
        'string.email': 'please provide the correct email formart',
        'any.required': 'email is a required field'
    }),

    password: Joi.string()
    .min(8)
    .required()
    .messages({
        'any.required': 'password field is required',
        'string.min': 'password should contain at least 8 characters'
    })
})

module.exports.updateUserSchema = Joi.object({
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