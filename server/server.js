const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Sends static files  from the public path directory
app.use(express.static('public'));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

// listen on port - Google App Engine populates the PORT env variable
const port = process.env.PORT || 4000;
app.listen(port);

console.log('App listening on port ' + port);


// load the product API routes...
const productRoutes = require('./productRoutes');
app.use('/api/products', productRoutes);

// Access-control stuff
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port)
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Pass to next layer of middleware
    next()
});

// Server index.html page when request to the root is made
app.get('/', function (req, res) {
    res.sendfile('./public/index.html')
});

module.exports = app;

