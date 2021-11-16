const { hash, compare } = require("../../utils/password.util");

describe('Testing password utility functions', () => {
    test('should generate hashed password from plain text', async () => {
        const password = 'secret';
        const hashedPassword = await hash(password);
        const isValid = compare(password, hashedPassword);
        
        expect(hashedPassword.length).toBe(60);
        expect(isValid).toBe(true);
    });
});