const webpack 				= require('webpack');
const HtmlWebpackPlugin 	= require('html-webpack-plugin');
const VueLoaderPlugin 		= require('vue-loader/lib/plugin');
const CopyWebpackPlugin     = require("copy-webpack-plugin");
const rules 				= require('./module@rules.js');
const util 				    = require('./util');

module.exports = {
	entry:util.resolve('../src/main.js'),
	output:{
		path:util.resolve('../dist'),
    	filename: 'static/js/bundle.js'
	},
	devtool: 'eval-source-map',
	module:{
		rules
	},
	plugins:[
		new HtmlWebpackPlugin({
			title:'Home',
			filename:'index.html',
			template:util.resolve('../public/index.html')
		}),
		// new webpack.DefinePlugin({
		// 	'process.env':{
		// 		NODE_ENV:'development',
		// 		BASE_URL:'/'
		// 	}
		// }),
		new VueLoaderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	],
	resolve:{
		extensions:['.js','.vue','.scss','.css','.json'],
		alias:{
			'vue': 'vue/dist/vue.esm.js',
			'@':util.resolve('../src')
		}
	},
	devServer:{
		historyApiFallback:{
			index:'/index.html'
		},
		progress:true,					//进度条
		inline:true,					//打包后加入一个websocket客户端
	    hot:true,						//热加载
	    contentBase: util.resolve('../src'),	//开发服务运行时的文件根目录
	    host: 'localhost',				//主机地址
	    port: 5000,						//端口号
	}
}