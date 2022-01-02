const path = require('path')

const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    
    mode: "development",

    output: {
        clean: true,
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js'
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
            }
        ]
    },

    optimization: {},

    plugins: [
        new HtmlWebpackPlugin({
            title: 'WebpackApp',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets", to: "assets/"}
            ]
        })
    ]
}