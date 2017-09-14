var webpack = require('webpack'),
    path = require('path');
 
module.exports = {
    debug: true,
    entry: {
        main: './server.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js'
    },
    module: {
        loaders: []
    }
};
