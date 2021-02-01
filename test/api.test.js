/* eslint no-undef: 0 */  // --> OFF
const request = require('supertest')
const app = require('../server/server')

describe('Product API', () => {
    it('should retrieve for all 25 products when no keywords specified', async () => {
        const res = await request(app)
            .get('/api/products/search')

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body.length).toEqual(25);
    });

    it('should retrieve 3 products when "testing" keyword is specified', async () => {
        const res = await request(app)
            .get('/api/products/search?keyword=testing')

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toEqual(true);
        expect(res.body.length).toEqual(3);
    });

    it('should return correct product given a valid id', async () => {
        const res = await request(app)
            .get('/api/products/get?id=9780012752159')

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toEqual(false);
        expect(res.body.Title.TitleText).toEqual('SEMICONDUCTORS & SEMIMETALS V21D');
    });

    it('should return a 404 when a product is not found from the supplied id', async () => {
        const res = await request(app)
            .get('/api/products/get?id=3934598345987345')

        expect(res.statusCode).toEqual(404);
    });
})