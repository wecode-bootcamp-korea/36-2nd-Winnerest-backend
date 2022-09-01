const request = require('supertest');

const { createApp } = require('../app');
const { appDataSource } = require('../models/dataSource');
const jwt = require('jsonwebtoken');

describe('get pins', () => {
    let app;
    
    beforeAll(async () => {
        app = createApp();
        await appDataSource.initialize();
    });

    afterAll(async () => {
        await appDataSource.destroy();
    });

    test('SUCCESS : Get MAIN Pins', async () => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue({sub : 1});
        const res = await request(app)
            .get('/pins/main')
            .set({ Authorization: 'Some Random Token' })
            .send({id: 1})
        expect(res.status).toEqual(200);
    });

    test('FAIL : Invalid Access Token Error', async () => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue({sub : 1});
        const res = await request(app)
            .get('/pins/main')
            .expect({ message : 'INVALID_ACCESS_TOKEN' })
        expect(res.status).toEqual(401);
    });

    test('FAIL : User Not Defined Error', async () => {
        const jwtSpy = jest.spyOn(jwt, 'verify');
        jwtSpy.mockReturnValue({sub : null});
        const res = await request(app)
            .get('/pins/main')
            .set({ Authorization: 'Some Random Token' })
            .expect({ message : 'USER_NOT_DEFINED' })
        expect(res.status).toEqual(404);
    });
});