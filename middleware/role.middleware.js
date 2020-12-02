const { sendJsonResponse } = require("../utils/response.util");

module.exports.permit = (allowedRoles = []) => {
    return (req, res, next) => {
        if (req.user.isAdmin()) {
            return next();
        }

        if (allowedRoles.includes(req.user.role)) {
            return next();
        }

        sendJsonResponse(res, 403, {status: 'err', message: 'Unauthorized access'});
    }
};