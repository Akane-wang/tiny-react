# link 链接说明

| 属性              | 说明                          | 类型             | 默认值              |
| ----------------- | ----------------------------- | ---------------- | ------------------- |
| transition        | 鼠标hover时icon会否向右挪动   | boolean          | icon ? true : false |
| icon              | icon-name               | tring            | -                   |
| iconWidth | 自定义图标的大小 | string \| number | 0.12rem |
| href              | 链接的href地址                | string           | -                   |
| className         | 作用在整体上的自定义css类 | string           | -                   |
| classInnerName    | 作用在children上的自定义css类 | string           | -                   |
| fontSize          | 链接的字体大小                | string \| number | 16px                |
| children          | 链接内容                      | React.ReactNode  | -                   |
| color | 初始时icon, text, border的颜色 | string           | \#00ADE5            |
| hoverColor | hover时icon, text, border的颜色 | string | color的颜色 |
| title             | hover时给出的文案提示         | string           | -                   |
| target            | 显示链接资源的位置            | Target           | -                   |
| underline | 是否有下划线 | boolean | true |



## target打开链接方式说明

| 属性    | 说明                                                         |      |      |
| ------- | ------------------------------------------------------------ | ---- | ---- |
| _self   | 当前页面加载。                                               |      |      |
| _blank  | 新窗口打开。                                                 |      |      |
| _parent | 加载响应到当前框架的父框架或HTML5浏览器上下文的父浏览器上下文；若无parent框架或浏览器上下文，则此选项的行为方式与_self相同 |      |      |
| _top    | 加载响应进入顶层浏览器上下文，若无parent框架或上下文，此选项的行为方式相同于_self |      |      |

- 具体解说见mdn
