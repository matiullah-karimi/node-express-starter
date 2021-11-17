const { roles } = require('../../config/constants');
const User = require('../../models/user.model');
const { hash } = require('../../utils/password.util');

describe('Testing user model functions', () => {
    it('should validate password', async () => {
        const password = 'secret';

        const user = new  User({
            name: 'Test User',
            role: roles.ADMIN,
            email: 'test@starter.com',
            phone: '09999999999',
            password: await hash(password),
        });
        
        expect(user.validPassword(password)).toBe(true);
        expect(user.validPassword(password + 123)).toBe(false);
    });

    it('should return true if user is admin', async () => {
        const password = 'secret';

        const user = new  User({
            name: 'Test User',
            role: roles.ADMIN,
            email: 'test@starter.com',
            phone: '09999999999',
            password: await hash(password),
        });
        
        expect(user.isAdmin()).toBe(true);
        expect(user.isDataEntry()).toBe(false);
        expect(user.isReviewer()).toBe(false);
    });
});