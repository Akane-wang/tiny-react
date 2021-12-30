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