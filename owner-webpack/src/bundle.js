//
const path =require('path')
const fs =require('fs')

const parser =require('@babel/parser')

const getModuleInfo=file=>{

    const body =fs.readFileSync(file,'utf-8')
    // 借助 babel 将文件以 module 模式解析为 ast
    const ast =parser.parse(body,{
      sourceType:'module'
    })
    // console.log(ast)
    console.log(ast.program.body);
}

getModuleInfo(path.resolve(__dirname,'../example/index.js'))

