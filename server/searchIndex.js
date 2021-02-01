
const lunr = require('lunr');
const products = require('./products');

// pull pertinent details out of the products data-set that we wish to store in the search index
const docs = products.map(x => {
    return {
        id: x.id,
        product: x.product,
    }
});

// create a search index using Lunr
const idx = lunr(function () {
    this.ref('id');
    this.field('product');

    docs.forEach(function (doc) {
        this.add(doc)
    }, this);
});

module.exports = idx;
