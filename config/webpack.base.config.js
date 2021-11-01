const MiniCssExtractPlugin  = require('mini-css-extract-plugin');
const util 				    = require('./util');

const rules = [
	{
		test: /\.js$/,
		include: util.resolve('../src'),
		exclude: /node_modules/,
		use: [process.env.NODE_ENV==='production'?'happypack/loader?id=happyBabel':'babel-loader']
	},
	{
		test:/\.vue$/,
		include: util.resolve('../src'),
		exclude: /node_modules/,
		use:['vue-loader'],
	},
	{
    	test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    	use:[
    		{
    			loader: 'url-loader',
    			options:{
    				esModule:false,
    				limit:10*1024,
    				name:'static/images/[name]-[hash:15].[ext]'
    			}
    		}
    	]
  	},
  	{
        test: /\.(eot|woff|woff2?|ttf|svg)$/,
        use: [
        	{
            	loader: "url-loader",
            	options: {
              		name: "static/fonts/[name]-[hash:15].[ext]",
              		limit: 5*1024,
            	}
          	}
        ]
    },
	{
		test:/\.scss$/,
		include:util.resolve('../src'),
		exclude:/node_modules/,
		use:[
			process.env.NODE_ENV==='production'?MiniCssExtractPlugin.loader:{loader:'style-loader'},
			{ loader:'css-loader', options:{ sourceMap:process.env.NODE_ENV==='production'?false:true } },
			{ loader:'sass-loader',options:{ sourceMap:process.env.NODE_ENV==='production'?false:true } },
			{
                loader: 'sass-resources-loader',
                options: {
                	sourceMap:process.env.NODE_ENV==='production'?false:true,
                    resources: [util.resolve('../src/static/css/mixins.scss')]
                }
            }
		],
	},
	{
		test:/\.less$/,
		include:util.resolve('../src'),
		exclude:/node_modules/,
		use:[
			process.env.NODE_ENV==='production'?MiniCssExtractPlugin.loader:{loader:'style-loader'},
			{ loader:'css-loader', options:{ sourceMap:process.env.NODE_ENV==='production'?false:true } },
			{ loader:'less-loader',options:{ sourceMap:process.env.NODE_ENV==='production'?false:true } },
		]
	},
	{
		test:/\.css$/,
		include: util.resolve('../src'),
		exclude: /node_modules/,
		use:[
			process.env.NODE_ENV==='production'?MiniCssExtractPlugin.loader:{loader:'style-loader'},
			{
				loader:'css-loader',
				options:{
					sourceMap:true
				}
			}
		],
	}
];
module.exports = rules;