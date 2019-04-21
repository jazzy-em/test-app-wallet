const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('config');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const urlPrefix = '';
const publicPath = urlPrefix ? '/' + urlPrefix + '/' : '/';

module.exports = {
    entry: {
        app: ['./src/index.js']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: publicPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.svg$/,
                exclude: /\.inline\.svg$/,
                use: 'svg-react-loader'
            },
            {
                test: /\.png$/,
                use: 'file-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'css-hot-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            context: path.resolve(__dirname, './src/'),
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[folder]-[name]--[local]--[hash:base64:5]',
                        }
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            }
        ]
    },

    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            inject: 'body',
            urlPrefix: urlPrefix
        }),
        new MiniCssExtractPlugin({filename: isProduction ? 'styles-[hash].css' : 'styles.css'}),
        new webpack.HotModuleReplacementPlugin()
    ],
    performance: {
        hints: false
    },
    devtool: isProduction ? 'none' : 'inline-source-map',
    devServer: {
        publicPath: publicPath,
        hot: true,
        port: 8083,
        proxy: {
            '**': {
                limit: '50mb',
                target: 'http://localhost:' + config.get('port'),
                bypass: function (req, res, opt) {
                    // don't proxy HTTP requests that originate from a browser
                    if (req.headers.accept.indexOf('html') !== -1 && req.url.indexOf('/callback') === -1) {
                        return publicPath;
                    }
                }
            }
        }
    }
};