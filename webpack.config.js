var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './app/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/, use: 'babel-loader', exclude: '/node_modules/'
            },
            {
                test: /\.css$/, use: ['style-loader', 'css-loader'] 
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts', '.json']
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ],
    devServer: {
        historyApiFallback: true
    }
}