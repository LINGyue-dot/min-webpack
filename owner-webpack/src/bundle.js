//
const path = require("path");
const fs = require("fs");

const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

const file = path.resolve(__dirname, "../example/index.js");

/**
 * 生成该文件的 绝对路径的依赖、es5 code
 * @param {*} file
 */
const getModuleInfo = file => {
	console.log(file);
	const body = fs.readFileSync(file, "utf-8");
	// 借助 babel 将文件以 module 模式解析为 ast
	const ast = parser.parse(body, {
		sourceType: "module",
	});

	const deps = {};
	// 遍历 ast 将相对路径改为绝对路径
	traverse(ast, {
		ImportDeclaration({ node }) {
			const dirname = path.dirname(file);
			const absPath = path.join(dirname, node.source.value);
			// 生成相对路径与绝对路径的 map
			deps[node.source.value] = absPath;
		},
	});

	// es6 to es5
	const { code } = babel.transformFromAst(ast, null, {
		presets: ["@babel/preset-env"],
	});

	const moduleInfo = { file, deps, code };
	return moduleInfo;
};

// 递归生成依赖图
const parseModules = file => {
	//
	const depsGraph = {};

	const entry = getModuleInfo(file);
	const temp = [entry];
	for (let i = 0; i < temp.length; i++) {
		const item = temp[i];
		const deps = item.deps;
		if (deps) {
			// 递归获取
			for (const key in deps) {
				if (deps.hasOwnProperty(key)) {
					temp.push(getModuleInfo(deps[key]));
				}
			}
		}
	}

	temp.forEach(moduleInfo => {
		depsGraph[moduleInfo.file] = {
			deps: moduleInfo.deps,
			code: moduleInfo.code,
		};
	});
	return depsGraph;
};
// parseModules(file);

const bundle = file => {
	const depsGraph = JSON.stringify(parseModules(file));
	//
	return `(function(graph){
    function require(file){
      var exports ={};
      // 
      function absRequire(relPath){
        return require(graph[file].deps[relPath]) // deps 是以相对路径为属性名
      }

      (function(require,exports,code){
        eval(code)
      })(absRequire,exports,graph[file].code)
      return exports
    }
    require('${file}')
  })(${depsGraph})`;
};

const content = bundle(file);
// write in dist/bundle.js
if (!fs.existsSync("./dist")) fs.mkdirSync("./dist");
fs.writeFileSync("./dist/bundle.js", content);
