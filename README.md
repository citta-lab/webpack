# webpack

You can refer the final complete [webpack.config.js](https://github.com/citta-lab/webpack/blob/master/final_files/webpack.config.js) file and/or [package.json](https://github.com/citta-lab/webpack/blob/master/final_files/package.json) from here.

>> If the functionality is not defined in ES6 then we cannot use babel to transpile to ES5 format, in these situations we need to use
polyfill

### Installation

We will be installing 3 main npm packages to have `webpack` work smoothly with node based projects.
#### 1.0 webpack
First one would be `webpack` itself which is needed for compiling and bundling it to single files so browsers can load it.
```javascript
npm install --save-dev webpack@4
```
#### 2.0 webpack-cli
Hence we will be using npm `package.json` scripts to run and execute webpack build, we also need webpack cli to trigger the script.
```javascript
npm install --save-dev webpack-cli@3
```
#### 3.0 webpack-dev-server
Lastly, we would like to server the webpack build asset / script files to local server for development purpose so we don't have to
load the finally build `build.js` file to local server.
```javascript
npm install --save-dev webpack-dev-server@3
```
>> main thing to notice here is that all these webpack packages are downloaded as development dependencies as we dont need to load them
while building the actual production code.  

so package.json would look like
```javascript
{
  "name": "webpack-test",
  "version": "1.0.0",
  "description": "webpack app",
  "main": "index.js",
  "author": "Mahesh",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.30.0",
    "webpack-cli": "^3.1.1",
    "webpack-dev-server": "^3.3.1"
  }
}
```

### Basic Configuration

It is recommended to use the webpack configuration file to customize the webpack based on our project needs. That being said we can create `webpack.config.js` in root of the project where `package.json` is initialized using `npm init`.

#### 1.0 Initial Skeleton
webpack configuration is a javascript object and we will be defining the predefined properties
```javascript
// file: webpack.config.js
module.export = {
    // .....configurations
}
```

#### 2.0 Basic build properties
Now we need to define where webpack needs to look for bundling and where it needs to output the single file once the building is complete. We use `node` package called `path` to define the absolute path which is needed while generating the output file. So the webpack configuration file looks like,
```javascript
// file: webpack.config.js
const path = require('path');
module.export = {
    entry: ['./src/js/index.js'],
    output: {
        // needs a absolute path, so using built in node package `path`
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js' // final build file
    },
}
```

#### 3.0 Define dev server property
We also need to let the configuration know where `webpack-dev-server` has to look for serving the files (i.e build file ), so the updated `webpack.config.js` would become like,
```javascript
const path = require('path');

module.exports = {
    entry: ['./src/js/index.js'],
    output: {
        // needs a absolute path, so using built in node package path
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
   devServer: {
       contentBase: './dist', // path defined folder dist and this should match to it can serve all the files
   }
};
```

#### 4.0 Define scripts
Lets look into package.json to execute webpack configurations by adding scripts.
```javascript
// file: package.json
"scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "start": "webpack-dev-server --mode development --open"
  },
```
`--mode`: is used to define dev or prod so we can avoid minifying and tree shaking for dev.
`--open`: will open the file right after executng start script on port `8080` as default.

### Plugin Configuration

This is dependent on `webpack-dev-server` package, we need to server `index.html` page to webpack server while using `webpack-dev-server` and we can do that using an plugin available. i.e `html-webpack-plugin`.

Note: We can also make use of this plugin to generate `index.html` file on fly by webpack instead of providing it from the template.

#### 1.0 Install
```javascript
npm install html-webpack-plugin --save-dev
```
#### 2.0 Update webpack config
```javascript
//filename: webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['./src/js/index.js'],
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
         template: './src/index.html' // mapping filename with starting point from code
     })
   ]
};
```

>> when we use `start` script webpack creates `index.html` and link the `bundle.js` as script and serve it to the server however it will not save it in the disk, so we don't see it. But we can verify that by running `development` or `build` script which will generate new `index.html` inside `dist/src/`.

### Babel Addition

To transpile all the latest javascript syntax we need to have babel, which includes 3 steps
- install babel related pakcages
- update webpack to use babel
- use .babelrc for babel configurations

#### 1.0 Basic Babel Packages
```javascript
npm install @babel/core @babel/preset-env babel-loader --save -dev
npm install @babel/polyfill --save
```
this will add core babel dependencies, babel-loader is used by webpack to load babel.

#### 2.0 Webpack Configurations
```javascript
// file: webpack.config.js
entry: ['@babel/polyfill', './src/js/index.js'],
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
```

#### 3.0 Babel Config
```javascript
// file : .babelrc
{
    "presets": [
        // collection of code transformation plugin, is applied while transforming
        ["@babel/env", {
            "targets": {
                "browsers": [
                    "last 5 versions",
                    "ie >= 8"
                ]
            }
        }]
    ]
}
```
