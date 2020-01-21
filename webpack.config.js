var webpack = require("webpack");
var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");

const VENDOR_LIBS = [
    'react', 'react-dom', 'react-router-dom'
];

var APP_DIR = path.join(__dirname, 'src');
var BUILD_DIR = path.join(__dirname, 'dist');
module.exports = {
    // entry: APP_DIR + '/index.js',
    entry: {
        bundle: APP_DIR + '/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        // path: BUILD_DIR,
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    devServer: {
        contentBase: BUILD_DIR,
        compress: true,
        port: 9000,
        disableHostCheck: false,
        open: true,
        hot: true
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // defaultVendors: {
                //     filename: '[name].bundle.js'
                // },
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    babelrc: false,
                    presets: ["@babel/env", "@babel/react"],
                    plugins: ["@babel/plugin-proposal-class-properties",
                            "syntax-dynamic-import"]
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                loader: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpeg|png|gif|svg)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins : [
        new htmlWebpackPlugin({
            template: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
        // new webapck.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'manifest']
        // })
        
        //ADD hot modules replacement plugin as well
    ]
}