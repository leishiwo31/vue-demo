const webpack 				= require('webpack');
const HtmlWebpackPlugin 	= require('html-webpack-plugin');
const VueLoaderPlugin 	    = require('vue-loader/lib/plugin');
const AddAssetHtmlCdnPlugin = require("add-asset-html-cdn-webpack-plugin");
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');
const CopyWebpackPlugin     = require("copy-webpack-plugin");
const rules 				= require('./webpack.base.config.js');
const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const util 				    = require('./util');
const HappyPack				= require('happypack');
const os 					= require('os');
const happyThreadPool 		= HappyPack.ThreadPool({ size: os.cpus().length });
const path    				= require('path');
const DllReferencePlugin    = require("webpack/lib/DllReferencePlugin");


const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const smw 					= new SpeedMeasureWebpackPlugin();

module.exports = {
	entry:{
		vendor:util.resolve('../src/main.js'),
	},
	devtool:'none',
	output:{
		path:util.resolve('../dist'),
    	publicPath: '/',
		chunkFilename: 'static/js/[name].[chunkhash:10].chunk.min.js',
    	filename: 'static/js/[name].[chunkhash:10].min.js'
	},
	module:{
		rules
	},
	plugins:[
		new DllReferencePlugin({
      		// manifest 就是之前打包出来的 json 文件
      		manifest: path.join(__dirname, "../config/dll", "main.manifest.json"),
    	}),
		new HappyPack({
	    	id: 'happyBabel',
	    	threadPool: happyThreadPool,
	    	loaders: ['babel-loader?cacheDirectory=true'],
	    	verbose:true
	    }),
		new BundleAnalyzerPlugin({
            generateStatsFile: true, // 是否生成stats.json文件
        }),
		new HtmlWebpackPlugin({
			title:'Home',
			filename:'index.html',
			template:util.resolve('../public/index.html'),
		}),
		new OptimizeCSSAssetsPlugin({
	    	assetNameRegExp:/\.css$/g,
	    	cssProcessor:require("cssnano"),		//引入cssnano配置压缩选项
	       	cssProcessorPluginOptions:{
	        	preset:['default',{discardComments:{removeAll:true}}]
	    	},
	       	canPrint:true,		//是否将插件信息打印到控制台
	    }),
		new MiniCssExtractPlugin({
        	filename: "static/css/[name].[chunkhash:10].css",
    	}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin(
			[
				{
					from:'./public',
					to:'./',
				}
			],
			{
				ignore:['*.html']
			}
		),
		new VueLoaderPlugin(),
		new AddAssetHtmlCdnPlugin(true, {
      		'vue': "https://lib.baomitu.com/vue/2.6.12/vue.min.js",
    	}),
	],
	externals: {
    	'vue': 'Vue'
  	},
  	resolve:{
		extensions:['.js','.vue','.scss','.css','.json'],
		alias:{
			'vue': 'vue/dist/vue.esm.js',
			'@':util.resolve('../src')
		}
	},
}