const express = require('express');
const routes = express.Router();
const products = require('./products');
const index = require('./searchIndex');

routes.route('/search').get(function (req, res) {

    console.log('/search: ' + req.query.keyword);
    const pageSize = parseInt(req.query.pageSize || 25);
    const pageIndex = parseInt(req.query.pageIndex || 0);

    let filteredProducts = products.map(x => {
        return {
            id: x.id,
            product: x.product,
            price: x.price,
        }
    });

    if (req.query.keyword) {
        // query search index
        const searchResponse = index.search(req.query.keyword);
        const foundProductIds = searchResponse.map(x => x.ref);
        filteredProducts = filteredProducts.filter(p => foundProductIds.indexOf(p.id) >= 0);
    } else {
        filteredProducts.sort((a, b) => a.product.localeCompare(b.product));
    }

    res.json({
        products: filteredProducts.slice(pageSize * pageIndex, pageSize * (pageIndex + 1)),
        currentPage: pageIndex,
        totalPages: Math.ceil(filteredProducts.length / pageSize),
    });
});


routes.route('/get').get(function (req, res) {

    console.log('/get: ' + req.query.id);

    const product = products.find(x => x.id == req.query.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Not found');
    }
});

routes.route('/checkout').post(function (req, res) {

    console.log('/checkout: ' + req.body);
    console.log('An email has been sent to the customer informing them of their purchase');
    const orderId = getRandomInt(1000000);
    res.status(201).send({ 
        orderId: orderId
    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

module.exports = routes;