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

    test('FAIL : Invalid Access Token Error', async () => {
        await request(app)
            .post('/board')
            .expect({ message : 'INVALID_ACCESS_TOKEN' })
            .expect(401);
    });

    test('FAIL : User Not Defined Error', async () => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue({sub : null});
        await request(app)
            .post('/board')
            .set({ Authorization: 'Some Random Token' })
            .expect({ message : 'USER_NOT_DEFINED' })
            .expect(404);
    });

    test('FAIL : KEY Value Error', async() => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue({sub : 1});
        await request(app)
            .post('/board')
            .set({ Authorization: 'Some Random Token' })
            .expect({ message : 'KEY_ERROR' })
            .expect(400);
    });

    test('SUCCESS : Created Board', async () => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue({sub : 1});
        await request(app)
            .post('/board')
            .set({ Authorization: 'Some Random Token' })
            .send({title : 'Testing Title'})
            .expect({ message : 'CREATED_BOARD' })
            .expect(201);
    })
})