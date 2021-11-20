const User = require('../models/user.model');
const { hash } = require('../utils/password.util');
const { sendJsonResponse } = require('../utils/response.util');

/**
 * Create a new user
 * 
 * @param {object} req 
 * @param {object} res 
 */
module.exports.create = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
    
        if (user) {
            return sendJsonResponse(res, 422, { status: 'err', message: 'Email has already taken' });
        }
    
        user = new User(req.body);
    
        // hashing password
        user.password = await hash(user.password);
    
        await user.save();
    
        sendJsonResponse(res, 200, user.toJson());
    } catch (error) {
        console.error(error)
        sendJsonResponse(res, 500, { status: 'err', message: 'Internal server error' });
    }
}

/**
 * Returns list of users
 * 
 * @param {object} req 
 * @param {object} res 
 */
module.exports.list = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').lean();

        sendJsonResponse(res, 200, users);
    } catch (error) {
        sendJsonResponse(res, 500, error);
    }
}

/**
 * Returns a single user
 * 
 * @param {object} req 
 * @param {object} res 
 */
module.exports.show = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password').lean();

        sendJsonResponse(res, 200, user);
    } catch (error) {
        sendJsonResponse(res, 500, error);
    }
}

/**
 * Update a user
 * 
 * @param {object} req 
 * @param {object} res 
 */
module.exports.update = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
    
        if (! user) {
            return sendJsonResponse(res, 404, { status: 'err', message: 'User not found' });
        }
        
        await user.update(req.body);
        
        sendJsonResponse(res, 200, {_id: user.id, ...req.body});
    } catch (error) {
        console.error(error)
        sendJsonResponse(res, 500, { status: 'err', message: 'Internal server error' });
    }
}

/**
 * Deletes a user
 * 
 * @param {object} req 
 * @param {object} res 
 */
module.exports.delete = async (req, res) => {
    try {
        if (req.params.id == req.user.id) {
            sendJsonResponse(res, 400, {status: 'error', message: 'Cannot delete your own account'});
        }

        const user = await User.findById(req.params.id).select('-password');

        if (user) {
            await user.delete();
        }

        sendJsonResponse(res, 200, {status: 'success', message: 'User deleted successfully'});
    } catch (error) {
        sendJsonResponse(res, 500, error);
    }
}