const dataSource = require('./products.json');
// load the product data from the json data-source
module.exports = dataSource;

// .map(x => {
//     return {
//         id: x.id,
//         price: parseFloat(x.price),
//         product: x.product
//     }
// });