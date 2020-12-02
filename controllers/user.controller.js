const User = require('../models/user.model');
const _ = require('lodash');
const bcrypt = require('bcrypt');

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
            return sendResponse(res, 422, { status: 'err', message: 'Email has already taken' });
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