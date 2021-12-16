| 属性           | 说明                                                         | 类型                | 默认值      | 支持状态 |
| -------------- | ------------------------------------------------------------ | ------------------- | ----------- | -------- |
| type           | input的种类                                                  | Types               | normalInput |          |
| tips           | input框的提示类型                                            | Tips                | info        |          |
| icon           | input 的icon                                                 | string              | -           |          |
| iconWidth      | input框中icon的大小                                          | number \| string    | 16px     |          |
| loading        | input中的加载状态                                            | boolean             | false       | 暂未支持 |
| placeholder    | input 的placeholder                                          | string              | -           |          |
| disabled       | input的禁用状态                                              | boolean             | false       |          |
| size           | input的尺寸大小                                              | Size                | large       |          |
| value          | input的初始值                                                | string              | -           |          |
| id             | input的id                                                    | string              | -           |          |
| width          | input的宽度                                                  | number \| string    | 330px      |          |
| currentState   | input的当前状态                                              | CurrentState        | normal      |          |
| infoMsg        | input提示文案                                                | string \| ReactNode | -           |          |
| label          | input 是否有 label <br/>label 值为 true 时，在输入时，输入的 placeholder 就会作为 label 上移到 label 位置 | boolean             | false       |          |
| children       | input框内可能会有的button等情况                              | ReactNode           | -           |          |
| inputClassName       | 作用于input本身                              | string           | -           |          |
| className      | 作用于整个input框                                            | string              | -           |          |
| autoComplate   | 可自动填充功能                                               | string              | off         |          |
| name           | 兼容IE，实现与label的绑定                                    | string              | -           |          |



## 支持的方法

| 属性     | 说明                  | 类型                   | 默认值 |
| -------- | --------------------- | ---------------------- | ------ |
| onChange | input的change事件     | (value: string) => any | -      |
| onBlur   | input失去焦点时触发   | () => any              | -      |
| onFocus  | input获取到焦点时触发 | () => any              | -      |



## Types类型说明

| 属性        | 说明               |      |      |
| ----------- | ------------------ | ---- | ---- |
| normalInput | 普通输入框         |      |      |
| darkInput   | 暗黑色输入框       |      |      |
| lightInput  | 亮色输入框         |      |      |
| grayInput   | 灰色输入框         |      |      |
| searchInput | 带搜索图标的输入框 |      |      |

## Tips提示类型说明

| 属性    | 说明     |      |      |
| ------- | -------- | ---- | ---- |
| error   | 错误提示 |      |      |
| success | 成功提示 |      |      |
| warning | 警告提示 |      |      |
| info    | 普通提示 |      |      |

## Size尺寸说明

| 属性   | 说明 |      |      |
| ------ | ---- | ---- | ---- |
| large  |      |      |      |
| medium |      |      |      |
| small  |      |      |      |

## CurrentState状态说明

| 属性      | 说明          |      |      |
| --------- | ------------- | ---- | ---- |
| normal    | 普通input框   |      |      |
| inputing  | 正在输入中    |      |      |
| error     | input内容错误 |      |      |
| successed | input内容正确 |      |      |

- autoComplate支持属性请查阅mdn相关文档
