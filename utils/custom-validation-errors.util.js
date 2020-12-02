module.exports.toCustomValidationError = (error) => {
    const errors = [];

    error.details.forEach(err => errors.push({[err.context.key]: err.message}));

    return errors;
}