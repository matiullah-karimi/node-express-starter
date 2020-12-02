const Joi = require('joi');
const { toCustomValidationError } = require('../../utils/custom-validation-errors.util');
const { sendJsonResponse } = require('../../utils/response.util');

const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    passwordConfirmation: Joi.ref('password'),
    phone: Joi.number()
});

module.exports = (req, res, next) => {
    try {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return sendJsonResponse(res, 200, toCustomValidationError(error));
        }

        next();
    }
    catch (err) { 
        sendJsonResponse(res, 500, err);
    }
};