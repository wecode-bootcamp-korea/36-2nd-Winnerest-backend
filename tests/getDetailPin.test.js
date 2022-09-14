const request = require('supertest');

const { createApp } = require('../app');
const { appDataSource } = require('../models/dataSource');
const jwt = require('jsonwebtoken');

describe('CREATED_BOARD', () => {
    let app;

    beforeAll(async () => {
        app = createApp();
        await appDataSource.initialize();
    });

    afterAll(async () => {
        await appDataSource.destroy();
    })

    test('SUCCESS : GET DETAIL PIN INFO', async () => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue({sub : 1});
        await request(app)
            .get('/pins/1')
            .set({Authorization : 'Some Random Token'})
            .send({id: 1})
            .expect(200);
    });
})