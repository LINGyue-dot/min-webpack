const path = require("path");
const PluginDemo = require("./pluginDemo");
module.exports = {
	mode: "development",
	entry: {
		main: "./src/index.js",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
	},
	resolveLoader: {
		// loader路径查找顺序从左往右
		modules: ["./node_modules", "./"],
	},
	plugins: [new PluginDemo()],

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: "syncLoader",
						options: {
							message: "哈哈哈哈哈哈",
						},
					},
					{
						loader: "asyncLoader",
					},
				],
			},
		],
	},
};
