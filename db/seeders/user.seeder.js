const { hash } = require('../../utils/password.util')

const User = require("../../models/user.model");

module.exports.seed = async () => {
    const user = await User.findOne({ email: 'admin@starter.com' });
    
    if (user) {
        console.log('User already exists...');
        return;
    };
    
    await new User({
        name: 'Admin',
        role: 'Admin',
        email: 'admin@starter.com',
        phone: '09999999999',
        password: await hash(process.env.ADMIN_PASSWORD),
    }).save();

    console.log('Admin user created successfully');
}