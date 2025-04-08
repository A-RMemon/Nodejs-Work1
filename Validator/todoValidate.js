const Joi = require("joi");

const todoValidate = Joi.object({
    title: Joi.string().required().messages({
        "string.base": "Title must be a string",
        "string.empty": "Title cannot be empty",
        "any.required": "Title is required"
    })
})
module.exports = todoValidate