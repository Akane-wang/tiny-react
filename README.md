# 基础组件库
 - 基础组件库使用方式见 awesome-frontend-architecture 项目的基础组件模块的 markdown


# 发包过程
- 修改代码并提交到分支
- 修改版本号
  - npm version v0.1.0      # 版本号变成 0.1.0，即显式设置版本号。
  - npm version patch       # 版本号从 0.1.0 变成 0.1.1，即修订版本号加一。
  - npm version minor       # 版本号从 0.1.1 变成 0.2.0，即子版本号加一。
  - npm version major       # 版本号从 0.2.0 变成 1.0.0，即主版本号加一。
- 发布到npm仓库
  - npm publish [--access=public]
  - 带前缀的包名默认是私有的，因此如果发布带前缀的包名的公有包，需要使用`npm publish --access=public`
  - 带前缀的包名且要发布私有包，直接`npm publish`即可

# 无法访问npm.reolink.dev
- 该npm.reolink.dev下的页面已经被禁止，因此，若想查看数据，需执行`npm info [packgename]`
# 发包前测试过程
## tgz方案
- build一个预备打包的dist
- npm pack，打包成一个tgz文件
- 在测试项目中`npm install【打包出来的文件的路径 + 打包出来的文件名】`即可正确安装使用
## npm-link
- 在当前项目下使用 npm link 创建一个全局的链接
 - 首先，包文件夹中的 npm 链接将在全局文件夹{ prefix }/lib/node _ modules/< package > 中创建一个符号链接，该符号链接指向执行 npm link 命令的包。它还将包中的任何箱子链接到{ prefix }/bin/{ name }。请注意，npm link 使用全局前缀(参见 npm 前缀 -g 的值)。
- 去目标目录下使用npm link 【当前包名】
  - 提示链接成功即可使用

## 下载该包不成功
- 可能情况：
  - 1.检查是否登录
    - npm registry
