const loaderUtils = require("loader-utils"); // loader-utils @2.0 才有 getOptions 方法
module.exports = function (source) {
	//
	const options = loaderUtils.getOptions(this);

	source += options.message;
	this.callback(null, source);
};
