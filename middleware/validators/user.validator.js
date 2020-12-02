const Joi = require('joi');
const { isValidObjectId } = require('mongoose');
const { toCustomValidationError } = require('../../utils/custom-validation-errors.util');
const { sendJsonResponse } = require('../../utils/response.util');

const putSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.number()
});

const postSchema = putSchema.concat(Joi.object({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
}));

module.exports = (req, res, next) => {
    let schema = postSchema;

    try {
        if (req.method == 'PUT') {
            if (! isValidObjectId(req.params.id)) {
                return sendJsonResponse(res, 422, {status: 'err', message: 'Invalid id'});
            }

            schema = putSchema;
        }

        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return sendJsonResponse(res, 200, toCustomValidationError(error));
        }

        next();
    }
    catch (err) { 
        console.error(err);
        sendJsonResponse(res, 500, err);
    }
};