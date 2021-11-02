const path    				= require('path');

exports.resolve = function(_path){
	return path.resolve(__dirname,_path);
}

exports.happyBabel = function(){
	return {
		loader:'babel-loader',
		options:{
			cacheDirectory:true,
			presets:[[
				'env',{
					modules:false,
				}
			]]
		}
	}
};