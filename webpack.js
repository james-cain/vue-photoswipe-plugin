const { join } = require('path')
const webpack = require('webpack');
const webpackConfig = require('webpack-chain');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const styleLoader = process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'vue-style-loader';
const baseConfig = new webpackConfig();

const resolve = (dir) => join(__dirname, '..', dir);
console.log(resolve('./dist'))
console.log(resolve('./src'))
baseConfig
    .entry('index')
        .add('./src/index.js')
        // .end()
baseConfig
    .output
        .path(resolve('./vue-animate-page/dist'))
        .publicPath('/dist/')
        .filename('vue-animate-page.min.js')
        .library('animatePage')
        .libraryTarget('umd');

baseConfig
    .resolve
        .alias.set('vue$', 'vue/dist/vue.esm.js');

baseConfig.module.rule('lint')
    .test(/\.(js|vue)$/)
    .pre()
    .include
        .add(resolve('src'))
        .add(resolve('test'))
        .end()
    .use('eslint')
        .loader('eslint-loader')
        .options({
            formatter: require('eslint-friendly-formatter')
        });

baseConfig.module.rule('js')
    .test(/\.js$/)
    .use('babel')
        .loader('babel-loader')
        .end()
    .exclude.add(/node_modules/);

baseConfig.module.rule('vue')
    .test(/\.vue$/)
    .include
        .add(/src/)
        .end()
    .exclude
        .add(/node_modules/)
        .end()
    .use('vue')
        .loader('vue-loader')
        .options({
            compilerOptions: {
                preserveWhitespace: false
            }
        })
        // .options({
        //     loaders: {
        //         css: [
        //             process.env.NODE_ENV !== 'production' ? 'css-loader' : MiniCssExtractPlugin.loader
        //             // 'css-loader'
        //         ],
        //         less: [
        //             process.env.NODE_ENV !== 'production' ? 'css-loader' : MiniCssExtractPlugin.loader,
        //             // 'css-loader',
        //             'less-loader'
        //         ]
        //     }
        // })

baseConfig.module.rule('css')
    .test(/\.css$/)
        .use('extract-css-loader')
            .loader(styleLoader)
            .end()
        .use('css-loader')
            .loader('css-loader')
            .end();

baseConfig.module.rule('less')
    .test(/\.less$/)
        .use('extract-css-loader')
            .loader(styleLoader)
            .end()
        .use('css-loader')
            .loader('css-loader')
            .end()
        .use('less-loader')
            .loader('less-loader')
            .end();

baseConfig.module.rule('img')
    .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    .use('url')
        .loader('url-loader')
        .options({
            limit: 10000,
            name: resolve('static/[name].[hash:7].[ext]')
        })
        .end()
    .exclude.add(resolve('src/icons'));

baseConfig.module.rule('font')
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
    .use('url')
        .loader('url-loader')
        .options({
            limit: 10000,
            name: resolve('static/media/[name].[hash:7].[ext]')
        });

baseConfig.externals({
    vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
    }
});

baseConfig.devtool('#source-map');

baseConfig.mode(process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
    baseConfig.plugin('define').use(webpack.DefinePlugin, [{
        'process.env': {
            NODE_ENV: 'production'
        }
    }]);
    baseConfig.plugin('mini-css').use(MiniCssExtractPlugin, [{
        filename: 'vue-animate-page.min.css'
    }])
    baseConfig.plugin('optimize-css').use(OptimizeCSSAssetsPlugin);
    // baseConfig.plugin('paralle-uglify-js').use(ParallelUglifyPlugin, [{
    //     cacheDir: '.cache/',
    //     uglifyJS: {
    //         output: {
    //             comments: false,
    //             beautify: false
    //         },
    //         compress: {
    //             warnings: false,
    //             drop_console: true,
    //             collapse_vars: true
    //         }
    //     }
    // }]);
    baseConfig.plugin('vue-loader').use(VueLoaderPlugin);
}

module.exports = baseConfig.toConfig();
