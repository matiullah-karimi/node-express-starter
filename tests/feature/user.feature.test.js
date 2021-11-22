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

            const user = await User.findOne({email: userData.email});
            expect(user).toBeDefined();    
    });

    it('should return 401 if user is not authenticated', async () => {
        let userData = {
            name: 'Test User',
            role: roles.ADMIN,
            email: 'test@starter.com',
            phone: '09999999999',
            password: 'secret',
        };

        await request(app).post("/api/users")
            .send(userData)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401);

            const user = await User.findOne({email: userData.email});
            expect(user).toBeNull();    
    });

    it('should return 403 if user does not have the Admin role', async () => {
        let userData = {
            name: 'Test User',
            role: roles.REVIEWER,
            email: 'test@starter.com',
            phone: '09999999999',
            password: 'secret',
        };

        const reviewer = await UserFactory.create({role: roles.REVIEWER});

        await request(app).post("/api/users")
            .send(userData)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + reviewer.generateAuthToken())
            .expect('Content-Type', /json/)
            .expect(403);

            const user = await User.findOne({email: userData.email});
            expect(user).toBeNull();    
    });

    it('should return 422 if user does not have the Admin role', async () => {
        let userData = {};

        const adminUser = await UserFactory.create({role: roles.ADMIN});

        await request(app).post("/api/users")
            .send(userData)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + adminUser.generateAuthToken())
            .expect('Content-Type', /json/)
            .expect(422)
            .then(response => {
                expect(Object.keys(response.body)).toEqual(['name', 'email', 'phone', 'role', 'password'])
            });

            const count = await User.countDocuments({});
            expect(count).toBe(1);    
    });
});

describe('GET /api/users', () => {
    it('should return a paginated list of users', async () => {
        const users = await UserFactory.create({role: roles.ADMIN}, 12);
        const adminUser = await UserFactory.create({role: roles.ADMIN});

        await request(app).get("/api/users")
        .set('Authorization', 'Bearer ' + adminUser.generateAuthToken())
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.docs.length).toBe(10);
            expect(response.body.totalDocs).toBe(users.length);
            expect(response.body.totalPages).toBe(2);
            expect(response.body.page).toBe(1);
        });
    });
});

