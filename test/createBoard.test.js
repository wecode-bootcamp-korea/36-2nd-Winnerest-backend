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
        const res = await request(app)
            .post('/board')
            .expect({ message : 'INVALID_ACCESS_TOKEN' })
        expect(res.status).toEqual(401);
    });

    test('FAIL : User Not Defined Error', async () => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue({sub : null});
        const res = await request(app)
            .post('/board')
            .set({ Authorization: 'Some Random Token' })
            .expect({ message : 'USER_NOT_DEFINED' })
        expect(res.status).toEqual(404);
    });

    test('FAIL : KEY Value Error', async() => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue({sub : 1});
        const res = await request(app)
            .post('/board')
            .set({ Authorization: 'Some Random Token' })
            .expect({ message : 'KEY_ERROR' })
        expect(res.status).toEqual(400);
    });

    test('SUCCESS : Created Board', async () => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue({sub : 1});
        const res = await request(app)
            .post('/board')
            .set({ Authorization: 'Some Random Token' })
            .send({title : 'Testing Title'})
            .expect({ message : 'CREATED_BOARD' })
        expect(res.status).toEqual(200);
    })
})