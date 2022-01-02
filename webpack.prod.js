const path = require('path')

const CopyPlugin           = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin    = require("html-webpack-plugin");
const CssMinimizer         = require('css-minimizer-webpack-plugin')
const terser               = require('terser-webpack-plugin')

module.exports = {
    
    mode: "production",

    output: {
        clean: true,
        path: path.resolve(__dirname, 'docs'),
        filename: 'index.[contenthash].js'
    },
    

    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/i,
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /style.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new terser()
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'WebpackApp',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets/"}
            ]
        })
    ]
}