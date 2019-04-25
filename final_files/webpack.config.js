const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js'],
    output: {
        // needs a absolute path, so using built in node package path
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
   devServer: {
       contentBase: './dist',
   },
   plugins : [
     new HtmlWebpackPlugin({
         filename: 'index.html',
         template: './src/index.html'
     })
   ],
   module: {
       rules: [
           {
               test:  /\.js$/, // what files to look
               exclude: /node_modules/, // what folder to exclude
               use: {
                loader: 'babel-loader'
               }
           }
       ]
   }
};
