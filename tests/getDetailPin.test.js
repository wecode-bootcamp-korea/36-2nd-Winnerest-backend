const request = require('supertest');

const { createApp } = require('../app');
const { appDataSource } = require('../models/dataSource');

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
        await request(app)
            .get('/pins/1')
            .expect(200);
    });
})