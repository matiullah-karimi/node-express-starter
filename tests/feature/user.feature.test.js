const User = require('../../models/user.model');
const app = require('../../app');
const request = require('supertest');
const mongoose = require('mongoose');
const { roles } = require('../../config/constants');
const UserFactory = require('../../db/factories/user.factory');

beforeEach(async () => {
    await User.deleteMany({});
});

afterAll(async () => {
    await User.deleteMany({});
    mongoose.connection.close();
});

describe('POST /api/users', () => {
    it('should create a user if entered data is valid', async () => {
        let userData = {
            name: 'Test User',
            role: roles.ADMIN,
            email: 'test@starter.com',
            phone: '09999999999',
            password: 'secret',
        };

        const adminUser = await UserFactory.create();

        await request(app).post("/api/users")
            .send(userData)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminUser.generateAuthToken())
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.email).toBe(userData.email);
                expect(response.body.phone).toBe(userData.phone);
                expect(response.body.password).toBeUndefined();
            });

            const user = await User.find({email: userData.email});
            expect(user).toBeDefined();    
    });
});