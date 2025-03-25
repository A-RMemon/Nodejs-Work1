const Joi = require("joi");

const userValidate = Joi.object({
    email:Joi.string().required().email().messages({
        'string.base': `Email must be a string`,
        'string.empty': `Email cannot be empty`,
        'any.required': `Email is required`,
        'string.email': `Invalid email format`,
    }),
    password:Joi.string().required().min(5).pattern(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$`)).messages({
        'string.base': `Password must be a string`,
        'string.empty': `Password cannot be empty`,
        'any.required': `Password is required`,
        'string.min': `Password must be at least {#limit} characters`,
        'string.pattern.base': `Password must contain at least one lowercase letter, one uppercase letter`,
    }),
})

module.exports = userValidate;