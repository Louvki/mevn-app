const path = require('path');


module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://192.168.99.100:5000'
                target: 'http://localhost:5000'
            }
        }
    }
}