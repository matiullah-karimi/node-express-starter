const sendJsonResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
    res.end();
}

global.sendJsonResponse = sendJsonResponse;
module.exports.sendJsonResponse = sendJsonResponse;