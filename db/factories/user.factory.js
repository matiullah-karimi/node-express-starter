const faker = require('faker');
const { roles } = require('../../config/constants');
const User = require('../../models/user.model');
const { hash } = require('../../utils/password.util');

class UserFactory {}

UserFactory.prototype.create = async (params = {name: '', email: '', password: '', phone: '', role: ''}, count = 1) => {
    if (count == 0) return;

    let users = [];

    for(let i = 0; i < count; i++) {
       users.push(await User.create({
            name: params.name || faker.name.findName(),
            email: params.email || faker.internet.email(),
            phone: params.phone || faker.phone.phoneNumber(),
            role: params.role || roles.ADMIN,
            password: await hash(params.password || faker.internet.password())
        }));
    }
    
    return count == 1 ? users[0] : users;
};


module.exports = new UserFactory();