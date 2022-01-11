const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

function resolve(dir) {
	return path.join(__dirname, dir);
}

const config = {
	mode: "development",
	entry: "./src/index.js",
	output: {
		filename: "bundle.js",
		path: path.join(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.css/,
				use: "css-loader",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new CleanWebpackPlugin(),
	],
	devServer: {
		contentBase: path.resolve(__dirname, "public"), // 静态文件目录
		compress: true, // 是否启动 gzip
		port: 8080,
	},

	resolve: {
		module: [resolve("src"), "node_modules"], // 解析文件时候优先查找 src 下文件
		extensions: [".ts", ".js", ".ts", ".json"], // 自动添加后缀
	},

	// loader 查找
	resolveLoader: {
		modules: ["node_modules", resolve("loader")],
	},
};

module.exports = (env, argv) => {
	console.log("argv.mode=", argv.mode);
	return smp.wrap(config);
};
