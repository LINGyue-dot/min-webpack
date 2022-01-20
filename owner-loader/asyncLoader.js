// 异步 loader ，本质就是利用 this.async()

const loaderUtils = require("loader-utils");

module.exports = function (source) {
	const asyncFn = this.async();
	setTimeout(() => {
		source += "hello";
		asyncFn(null, source);
	}, 200);
};
