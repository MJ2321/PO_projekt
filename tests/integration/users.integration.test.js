const userModel = require('../../app/models/users'); 
const request = require('supertest');
const app = require('../../app/app');

describe('User API', () => {
    beforeEach(async () => {
        await request(app).delete('/users'); 
    });    

    it('create and fetch user', async () => {
        const response = await request(app)
            .post('/users')
            .send({ name: 'Wojciech', lastname: 'Oczkowski' });
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('Wojciech');

        const getResponse = await request(app).get('/users');
        expect(getResponse.statusCode).toBe(200);
        expect(getResponse.body.length).toBe(1);
    });

    it('fetch user by ID', async () => {
        const user = userModel.addUser('Wojciech', 'Oczkowski');

        const response = await request(app).get(`/users/${user.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Wojciech');
    });

    it('return 404 if user doesnt exist', async () => {
        const response = await request(app).get('/users/999');
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('User not found');
    });

    it('update user', async () => {
        const user = userModel.addUser('Wojciech', 'Oczkowski');

        const response = await request(app)
            .patch(`/users/${user.id}`)
            .send({ name: 'Wojciech', lastname: 'Oczkowski' });
        expect(response.statusCode).toBe(204);

        const updatedUser = userModel.getUserById(user.id);
        expect(updatedUser.lastname).toBe('Oczkowski');
    });

    it('delete user', async () => {
        const user = userModel.addUser('Wojciech', 'Oczkowski');

        const response = await request(app).delete(`/users/${user.id}`);
        expect(response.statusCode).toBe(204);

        const getResponse = await request(app).get('/users');
        expect(getResponse.body.length).toBe(3);
    });

    it('return 404 if editing non existing user', async () => {
        const response = await request(app)
            .patch('/users/999')
            .send({ name: 'NonExistent', lastname: 'User' });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('User not found');
    });

    it('return 400 if invalid user data on post', async () => {
        const response = await request(app).post('/users').send({ name: 'OnlyName' });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid data');
    });
});
