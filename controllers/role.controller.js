const { roles } = require("../config/constants");
const { sendJsonResponse } = require("../utils/response.util");

module.exports.list = (req, res) => {
    return sendJsonResponse(res, 200, Object.values(roles));
};