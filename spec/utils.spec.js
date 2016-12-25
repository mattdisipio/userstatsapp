var path = require('path');

global.rootRequire = function (name) {
	var temp = path.join(__dirname, '\\' + '..\\src\\server\\' + name)
	return require(temp);
};
