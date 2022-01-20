class PluginDemo {
	constructor() {
		console.log("plugin init");
	}
	// apply 执行的时候可以操作 webpack 打包的各个时间点
	apply(compiler) {
		compiler.hooks.compile.tap("PluginDemo", compilation => {
			console.log(compilation);
		});

		// 生成到 output 目录之前 （异步）
		compiler.hooks.emit.tapAsync("PluginDemo", (compilation, fn) => {
			console.log(compilation);
			compilation.assets["index.md"] = {
				// 文件内容
				source: function () {
					return "this is a demo for plugin";
				},
				// 文件尺寸
				size: function () {
					return 45;
				},
			};
			fn();
		});
	}
}

module.exports = PluginDemo;
