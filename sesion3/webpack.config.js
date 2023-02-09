1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
module.exports = {
    mode: "production",
    entry: {
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
        maxAssetSize: 1000000,
        maxEntrypointSize: 1000000
    }
};