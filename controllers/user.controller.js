const User = require('../models/user.model');
const _ = require('lodash');
const bcrypt = require('bcrypt');
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
    
        user = new User(_.pick(req.body, ['name', 'email', 'password', 'phone']));
    
        // hashing password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    
        await user.save();
    
        sendJsonResponse(res, 200, _.pick(user, ['_id', 'name', 'email', 'phone']));
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
        
        sendJsonResponse(res, 200, {...user.toObject(), ...req.body});
    } catch (error) {
        console.error(error)
        sendJsonResponse(res, 500, { status: 'err', message: 'Internal server error' });
    }
}