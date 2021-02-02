/* eslint no-undef: 0 */  // --> OFF
const request = require('supertest')
const app = require('../server/server')

describe('Product API', () => {
    it('should retrieve for all 25 products when no keywords specified', async () => {
        const res = await request(app)
            .get('/api/search')

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.products)).toEqual(true);
        expect(res.body.products.length).toEqual(25);
    });

    it('should retrieve 3 products when "sauce" keyword is specified', async () => {
        const res = await request(app)
            .get('/api/search?keyword=sauce')

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.products)).toEqual(true);
        expect(res.body.products.length).toEqual(17);
    });

    it('should return correct product given a valid id', async () => {
        const res = await request(app)
            .get('/api/get?id=08de1be4-8342-469e-8472-0b1763d90d46')

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toEqual(false);
        expect(res.body.product).toEqual('Cardamon Seed / Pod');
    });

    it('should return a 404 when a product is not found from the supplied id', async () => {
        const res = await request(app)
            .get('/api/get?id=3934598345987345')

        expect(res.statusCode).toEqual(404);
    });
})