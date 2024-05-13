const webpack = require('webpack')

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('Prod'),
            'process.env.path': JSON.stringify('http://localhost:3000')
        }),
    ],
}