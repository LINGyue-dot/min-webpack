## min-webpack

### 基本流程

* 读取入口文件内的内容
* 分析入口文件，递归读取模块的依赖文件，生成依赖图
* 根据依赖图，生成可运行代码


### 读取文件
*利用 node 的 fs 模块*

`fs.readFileSync` 读取到该文件内容的字符串


*处理单文件*

分析内容借助 `@babel/parser` 生成 ast 

ast 结点结构如下
````js

  Node {
    type: 'ImportDeclaration', // import 声明
    start: 0,
    end: 26,
    loc: SourceLocation {
      start: [Position],
      end: [Position],
      filename: undefined,
      identifierName: undefined
    },
    specifiers: [ [Node] ],
    source: Node {
      type: 'StringLiteral',
      start: 16,
      end: 26,
      loc: [SourceLocation],
      extra: [Object],
      value: './add.js'
    }
  },

````
借助 `@babel/traverse` 遍历 ast 将相对路径转化为绝对路径
借助 `@babel/core @babel/preset-env` 将 es6 语法转为 es5 语法


### 递归生成依赖图
即上已经可以处理单文件，并且可以得到单文件所 import 引入的文件，所以只需对该文件的 import 的文件递归调用，并将其每个文件的分析加入到依赖图中即可。
依赖图是一个相对路径为名的对象




# Refrence

https://juejin.cn/post/6844904146827476999#heading-7