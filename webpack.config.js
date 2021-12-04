const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'client', 'index.tsx'),
    },
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'public', 'javascript'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.[jt]sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/i,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: "local",
                                localIdentName: "[name]__[local]___[hash:base64:5]"
                            },
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions:{                                
                                ident: 'postcss',
                                plugins: () => [
                                    require('postcss-flexbugs-fixes'),
                                    autoprefixer({
                                        browsers: [
                                            '>1%',
                                            'last 4 versions',
                                            'Firefox ESR',
                                            'not ie < 9', // React doesn't support IE8 anyway
                                        ],
                                        flexbox: 'no-2009',
                                    }),
                                    require('postcss-modules-values'),
                                ]
                            }
                        },
                    }
                ]
            }
        ]
    }
}