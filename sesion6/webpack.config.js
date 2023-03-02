module.exports = {
    mode: "production",
    entry: {
        "prac6-1": "./src/prac6-1.js"
    },
    //devtool: 'inline-source-map',
    devServer: {
        static: {
            directory: __dirname
        },
        devMiddleware: {
            writeToDisk: true
        }
    },
    performance: {
        hints: false,
        maxAssetSize: 1000000,
        maxEntrypointSize: 1000000
    }
};