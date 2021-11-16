const bcrypt = require('bcrypt');

/**
 * Generates hashed password from plain text password
 * @param {string} password 
 * @returns {string} hashed password
 */
module.exports.hash = async (password) => {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
};

/**
 * Compares hashed password with plain text password and returns true if they match
 * @param {string} plainPassword 
 * @param {string} hashedPassword 
 * @returns {boolean}
 */
module.exports.compare = (plainPassword, hashedPassword) => {
    const validPassword = bcrypt.compareSync(plainPassword, hashedPassword);

    return validPassword == true;
}