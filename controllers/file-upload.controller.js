const { sendJsonResponse } = require("../utils/response.util");
const fs = require('fs');

/**
 * Uploads file to the server
 * 
 * @param {any} req 
 * @param {any} res 
 */
module.exports.upload = (req, res) => {
    try {
        sendJsonResponse(res, 200, {
            container: req.file.path,
            name: req.file.originalname,
            fileName: req.file.filename,
            mime: req.file.mimetype,
            size: req.file.size
        });
        
    } catch (error) {
        console.error(error)
        sendJsonResponse(res, 500, error);
    }

};

/**
 * Deletes file from server
 * 
 * @param {any} req 
 * @param {any} res 
 */
module.exports.delete = (req, res) => {
    const path = './uploads/' + req.params.fileName;

    try {
        if (! fs.existsSync(path)) {
            return sendJsonResponse(res, 404, {status: 'err', message: 'File not found'});
        }
        
        fs.unlinkSync(path);

        sendJsonResponse(res, 200, {status: 'success', message: 'File deleted successfully'});
    } catch (error) {
        sendJsonResponse(res, 500, error);
    }
};

module.exports.download = (req, res) => {
    const path = './uploads/' + req.params.fileName;
    
    try {
        if (! fs.existsSync(path)) {
            return sendJsonResponse(res, 404, {status: 'err', message: 'File not found'});
        }

        res.writeHead(200, { "Content-Type": "image/jpg" });
        res.end(fs.readFileSync(path), "binary");
    } catch (error) {
        sendJsonResponse(res, 500, error);
    }
};