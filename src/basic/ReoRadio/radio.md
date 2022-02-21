# radio 说明

## 多选radio

| 属性      | 说明                                  | 类型                                           | 默认值 |
| --------- | ------------------------------------- | ---------------------------------------------- | ------ |
| id        | 支持点击radio文案实现勾选框被勾选功能 | string                                         | -      |
| options   | radio的勾选备选条例                   | IOptions[]                                     | -      |
| className | 附加在普通checkbox文案上的类          | string                                         | -      |
| onChange  | radio checked后的回调                 | (value: string) => any                         | -      |
| value     | radio被选中的值                       | string                                         | -      |
| alignment | radio的对齐方式（靠左、靠右、居中）   | justify-start \| justify-end \| justify-center | -      |

- IOptions的属性描述如下：

| 属性        | 说明                                                         | 类型                              | 默认值       |
| ----------- | ------------------------------------------------------------ | --------------------------------- | ------------ |
| value       | radio的value值                                               | string                            | -            |
| label       | radio的描述值，默认显示在radio框旁边，支持className自定义样式 | string \| undefined               | -            |
| disabled    | radio是否可点击                                              | boolean                           | false        |
| componentFn | 用户传入组件替换radio框                                      | (item: IOptions) => ReactElement; | -            |
| checked     | radio是否被checked                                           | boolean                           | 根据推算得出 |

## 单选radio

| 属性      | 说明                                      | 类型                  | 默认值 |
| --------- | ----------------------------------------- | --------------------- | ------ |
| value     | 单选radio框是否被选中                     | boolean               | -      |
| disabled  | 单选radio框是否被禁用                     | boolean \| undefined  | -      |
| children  | 单选radio框内部节点                       | ReactNode             | -      |
| className | radio框的label标签需要添加的自定义样式    | string \| undefined   | -      |
| id        | radio框是否可以通过点击文案进行选择或取消 | string \| undefined   |        |
| onChange  | 点击radio的回调                           | value: boolean => any | -      |

