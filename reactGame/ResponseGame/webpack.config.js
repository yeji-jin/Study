const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'React-game',
    mode: 'development', //실서비스 production
    devtool: 'eval', //빠르게
    resolve : {
        extensions: ['.jsx', '.js'],
    },
    entry:{ //입력
        app: ['./client'],
    },
    module:{
        rules:[{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [ 
                    [ "@babel/preset-env", {
                        targets: {
                            browsers: ['> 1% in KR', 'last 2 chrome versions'], //browserslist
                        },
                        debug: true,
                    }],
                '@babel/preset-react'],
                plugins: [ '@babel/plugin-proposal-class-properties' , "react-refresh/babel" ],
            }
        }]
    },
    plugins: [
        new RefreshWebpackPlugin()
    ],
    output:{ //출력
        path: path.join(__dirname , 'dist'), //(현재폴더 , ./dist)
        filename: 'app.js'
    },
    devServer: {
        devMiddleware: { publicPath: '/dist'},
        static: { directory: path.resolve(__dirname) },
        hot: true, 
    } 

}