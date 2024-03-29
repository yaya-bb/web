// 引入一个包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const { cleanWebpackPlugin, CleanWebpackPlugin } = require('clean-webpack-plugin');
// webpack中的所有配置信息都应该卸载module.exports中
module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",
  // 指定打包文件所在目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后文件的文件
    filename: "bundle.js",
    // 告诉webpack不使用箭头
    environment: {
      arrowFunction: false
    }
  },
  mode: 'development', // 设置mode
  // 指定webpack打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定的是规则生效的文件
        // 去匹配所有以ts为结尾的文件
        test: /\.ts$/,
        // 用ts-loader去处理以ts结尾的文件
        // 要使用的loader
        // 写在后面先执行
        use: [
          // 配置babel
          {
            // 指定加载器
            loader: "babel-loader",
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 要兼容的目标浏览器
                    targets: {
                      "chrome": "104"
                    },
                    // 指定corejs的版本
                    "corejs": "3",
                    // 使用corejs的方式 "usage"表示按需加载
                    "useBuiltIns": "usage"
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
        // 要排除的文件
        exclude: /node_modules/
      }
    ]
  },
  // 配置webpack插件
  plugins: [
    // 为先把dist目录清空，然后再去添加文件
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: '使用webpack打包ts'
    })
  ],
  // 用来设置引用模块
  resolve: {
    extensions: ['.js', '.ts']
  }

}