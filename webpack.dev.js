const path = require("path");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
const webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: "development", // placed this in package.json under scripts
    // devtool: "none", //removes eval from compressed files
    // entry: "./src/index.js",
    devtool: "cheap-module-eval-source-map", //added on 10-11-22 to get exact point of error in vue devtools chrome extension instead of error in bundled app.js file
    output: {
        filename: "main.js", //was jus main.js, content hash included for caching
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        // new webpack.ProvidePlugin({// included for owl carousel otherwise interferes with bootstrap js/jquery
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     'window.jQuery': 'jquery'
        // })
    ], //creates index.htm n dist and new script with main.js that includes content hash at bottom of created index
    module: {
        rules: [
            {
                test: /\.scss$/,      // /\.css$/,
                use: [
                    "style-loader", //3. injects style into dom
                    "css-loader", //2. Turn css to common js
                    "sass-loader" //1. turns sass into css
                ],
            },
            {
                test: /\.pdf$/,       // assists with images
                // use: ["file-loader"],
                use: {
                    loader: "file-loader",
                    options: {
                        // name: "[name].[ext]"//
                        // name: "[name].[hash].[ext]",
                        // name: "videos/[name].[hash].[ext]",
                        name: "[name].[hash].[ext]",
                        //outputPath: "pdfs" //will create images folder in dist where image with image name, hash and extension will be stored as shown above

                    }
                }
            },
        ],
    },
});
