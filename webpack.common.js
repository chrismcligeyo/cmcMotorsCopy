const path = require("path");
// let HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    // mode: "development", // placed this in package.json under scripts
    // devtool: "none", //removes eval from compressed files
    // entry: "./src/index.js",
    //added babelpolyfillinto entry
    entry: ["@babel/polyfill", "./src/index.js"],
    // output: {
    //     filename: "main.[contentHash]js", //was jus main.js, content hash included for caching
    //     path: path.resolve(__dirname, "dist")
    // },
    // plugins: [new HtmlWebpackPlugin({
    //     template: "./src/index.html"
    // })], //creates index.htm n dist and new script with main.js that includes content hash at bottom of created index
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
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    // options: { //options set at .babelrc file
                    //     presets:["@babel/env"]
                    // }
                }
            },
            {
                test: /\.html$/,      // assists with images. uses require to  import image assets
                use: ["html-loader"],
            },
            {
                test: /\.(svg|png|jpg|gif|jpeg)$/,      // assists with images
                // use: ["file-loader"],
                use: {
                    loader: "file-loader",
                    options: {
                        // name: "[name].[ext]"//
                        // name: "[name].[hash].[ext]",
                        name: "[name].[ext]", //removed hash fromimage. when you build with hash, image does not show
                        outputPath: "images" //will create images folder in dist where image with image name, hash and extension will be stored as shown above

                    }
                }
            },
            {
                test: /\.(mp4|ogv|webm)$/,      // assists with images
                // use: ["file-loader"],
                use: {
                    loader: "file-loader",
                    options: {
                        // name: "[name].[ext]"//
                        // name: "[name].[hash].[ext]",
                        // name: "videos/[name].[hash].[ext]",
                        name: "[name].[hash].[ext]",
                        outputPath: "videos" //will create images folder in dist where image with image name, hash and extension will be stored as shown above

                    }
                }
            },
            // {
            //     test: /\.pdf$/,       // assists with images
            //     // use: ["file-loader"],
            //     use: {
            //         loader: "file-loader",
            //         options: {
            //             // name: "[name].[ext]"//
            //             // name: "[name].[hash].[ext]",
            //             // name: "videos/[name].[hash].[ext]",
            //             name: "[name].[hash].[ext]",
            //             //outputPath: "pdfs" //will create images folder in dist where image with image name, hash and extension will be stored as shown above
            //
            //         }
            //     }
            // },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({// included for owl carousel otherwise interferes with bootstrap js/jquery
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),


    ]
};
