# textarea 说明

| 属性         | 说明                                                         | 类型                                | 默认值 | 支持状态 |
| ------------ | ------------------------------------------------------------ | ----------------------------------- | ------ | -------- |
| value        | textarea的值                                                 | string                              | -      |          |
| label        | placeholder是否可以作为label往上挪动                         | boolean                             | false  |          |
| resize       | 文本区域调整大小的方式                                       | Resize                              | none   |          |
| tips         | textarea提示，infoMsg                                        | error \| success \| warning \| info | -      |          |
| placeholder  | placeholder                                                  | string                              | -      |          |
| disabled     | textarea是否被禁用                                           | boolean                             | false  |          |
| infoMsg      | 状态提示文案                                                 | string \| ReactNode                 | -      |          |
| className    | 作用于整个textarea                                           | string                              | -      |          |
| required     | 表示textarea必须被填写,标出星号（只是给出星号，不会做校验，需要用户自己校验，并传入tips和infoMsg） | boolean                             | false  |          |
| autoComplate | 实现自动填充功能                                             | string                              | off    |          |
| width        | textarea的宽度                                               | string \| number                    | 6.8rem |          |
| height       | textarea的高度                                               | string \| number                    | 1.2rem |          |
| onChange     | 改变内容时触发                                               | (value: string) => any              | -      |          |
| onBlur       | 失焦时触发                                                   | onBlur?: () => any;                 | -      |          |

## Resize 说明

| 属性       | 描述                                                         | 支持状态     |
| ---------- | ------------------------------------------------------------ | ------------ |
| none       | 元素不能被用户缩放。                                         |              |
| both       | 允许用户在水平和垂直方向上调整元素的大小。                   |              |
| horizontal | 允许用户在水平方向上调整元素的大小。                         |              |
| vertical   | 允许用户在垂直方向上调整元素的大小                           |              |
| block      | 根据写入模式和方向值，元素显示一种机制，允许用户在块方向上水平或垂直调整元素的大小。 | 实验中的属性 |
| inline     | 根据写入模式和方向值，元素显示一种机制，允许用户在行内方向上水平或垂直调整元素的大小。 | 实验中的属性 |

