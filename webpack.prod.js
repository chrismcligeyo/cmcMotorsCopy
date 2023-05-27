const path = require("path");
const zlib = require("zlib");
const common = require("./webpack.common");
const {merge} = require("webpack-merge");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin"); //when gives error of CleanWebPackPlugin not a constructor add {}
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin"); //when gives error of not a constructor remove {},
const TinypngPlugin = require("tinypng-plugin-webpack-full-featured");
//const CompressionPlugin = require("compression-webpack-plugin");
module.exports = merge(common, {
    mode: "production",  // placed this in package.json under scripts
    // devtool: "none", //removes eval from compressed files
    // entry: "./src/index.js",
    output: {
        filename: "main.[contentHash].js", //was jus main.js, content hash included for caching
        path: path.resolve(__dirname, "dist")
    },
    optimization: {//added for optimizecsassetplugin
        minimizer: [
            new OptimizeCssAssetsPlugin(),//minimizescssfiles,but when added unminifies js files.without it js filesare minimized automatically using js minifier(terser) in prod mode.optimize css overwrites(terser) so you have to manually add it back in as shown below
            new TerserPlugin(),
            new HtmlWebpackPlugin({// minify html in production
                template: "./src/index.html",
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true

                }
            })

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.[contentHash].css"
        }),
        new CleanWebpackPlugin(),

        new TinypngPlugin({
            from: path.resolve(__dirname, './src/assets/imgs'),
            extentions: ['png', 'jpeg', 'jpg'],
            silent: false,
            cache: true,
        }),
        new TinypngPlugin({
            from: path.resolve(__dirname, './src/assets/video'),
            extentions: ['jpg'],
            silent: false,
            cache: true,
        }),
        // new CompressionPlugin({
        //     filename: path.resolve(__dirname, './src/assets/video/alfones_bg_video.webm'),
        //     algorithm: "brotliCompress",
        //     test: /\.webm$/,
        //     compressionOptions: {
        //         params: {
        //             [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        //         },
        //
        // },
        //     threshold: 10240,
        //     minRatio: 0.8,
        //
        // }),
        //
        // new CompressionPlugin({
        //     filename: path.resolve(__dirname, './src/pertinent_pdfs/Alfones-Football-Club.pdf'),
        //     algorithm: "brotliCompress",
        //     test: /\.pdf$/,
        //     compressionOptions: {
        //         params: {
        //             [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        //         },
        //
        //     },
        //     threshold: 10240,
        //     minRatio: 0.8,
        //
        // }),
    ],
    // plugins: [new HtmlWebpackPlugin({
    //     template: "./src/index.html"
    // })], //creates index.htm n dist and new script with main.js that includes content hash at bottom of created index
    module: {
        rules: [
            {
                test: /\.scss$/,      // /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, //3.extract css into files
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
                        outputPath: "pertinent_pdfs" //will create images folder in dist where image with image name, hash and extension will be stored as shown above

                    }
                }
            },
        ],
    },
});
