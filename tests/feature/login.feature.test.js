const User = require('../../models/user.model');
const { hash } = require('../../utils/password.util');
const app = require('../../app');
const request = require('supertest');
const mongoose = require('mongoose');

beforeEach(async () => {
    await User.deleteMany({});
});

afterAll(async () => {
    await User.deleteMany({});
    mongoose.connection.close();
});

describe('POST /api/login', () => {
    it('should log the user in if valid credentials are entered', async () => {
        const user = await User.create({
            name: 'Test User',
            role: 'Admin',
            email: 'test@starter.com',
            phone: '09999999999',
            password: await hash('secret'),
        });

        await request(app).post("/api/login")
            .send({ email: user.email, password: 'secret' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body.status).toBe('ok');
                expect(response.body.token).toBeDefined();
            });
    });

    it('should return 401 if invalid credentials are entered', async () => {
        const user = await User.create({
            name: 'Test User',
            role: 'Admin',
            email: 'test@starter.com',
            phone: '09999999999',
            password: await hash('secret'),
        });

        await request(app).post("/api/login")
            .send({ email: user.email, password: 'wrongpassword' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then((response) => {
                expect(response.body.status).toBe('fail');
            });
    });

    it('should return 422 if email or password field is empty', async () => {
        await request(app).post("/api/login")
            .send({ email: '', password: '' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422);
    });
});