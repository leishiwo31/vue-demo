const path    				= require('path');

exports.resolve = function(_path){
	return path.resolve(__dirname,_path);
}