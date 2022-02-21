# checkbox说明

## 多选checkbox

| 属性      | 说明                                                         | 类型                          | 默认值 |
| --------- | ------------------------------------------------------------ | ----------------------------- | ------ |
| ghost     | 填充方式为fill *(false， 对应fillChecked：被check时背景变色)* / stroke *(true，对应strokeChecked : 被check时边框变色，背景不变;)* | boolean                       | false  |
| options   | checkbox的勾选备选条例                                       | IOption[]                     | []     |
| className | 附加在普通checkbox文案上的css类                              | string                        | -      |
| onChange  | checked后的回调                                              | (checkedArr: string[]) => any | -      |
| value     | checked的值（支持多选）                                      | string[]                      | []     |
| alignment | checkbox和children的布局方式<br/>居中对齐 \| 靠右对齐 \| 靠左对齐 | left \| right\| center        | left   |
| children  | checkbox的内容                                               | ReactNode                     | -      |

- checkbox为多选时，IOption的属性描述如下：

| 属性        | 说明                                                         | 类型                             | 默认值 |
| ----------- | ------------------------------------------------------------ | -------------------------------- | ------ |
| value       | checkbox的value值                                            | string                           | -      |
| label       | checkbox的描述值，默认显示在checkbox框旁边，支持className自定义样式 | string                           | -      |
| disabled    | checkbox是否可点击                                           | boolean                          | -      |
| componentFn | 用户传入组件替换checkbox框                                   | (item: IOption) => ReactElement; | -      |

## 单选checkbox

| 属性      | 说明                                                         | 类型                      | 默认值 |
| --------- | ------------------------------------------------------------ | ------------------------- | ------ |
| ghost     | 填充方式为fill *(false， 对应fillChecked：被check时背景变色)* / stroke *(true，对应strokeChecked : 被check时边框变色，背景不变;)* | boolean                   | false   |
| value     | checked是否被选中                                            | boolean                   | false  |
| children  | checkbox的children内容                                       | React.ReactNode           | null   |
| className | 自定义children类,附加于children                              | string                    | -      |
| disabled  | checkbox是否可点击                                           | boolean                   | -      |
| onChange  | checked后的回调                                              | (checked: boolean) => any | -      |
| alignment | checkbox和children的布局方式<br/>居中对齐 \| 靠右对齐 \| 靠左对齐 | center\|right\|left       | -      |

##  基础使用

### 单选框

```react
const [checked, setChecked] = useState(false);// 声明传入value

<SingleCheckbox value={checked} onChange={value => setChecked(value)}>已经被选中</SingleCheckbox> // 调用组件修改value
```

```react
const [checked, setChecked] = useState(false);// 声明传入value

<SingleCheckbox value={checked} onChange={value => setChecked(value)} ghost>已经被选中</SingleCheckbox> // 调用组件修改value
// ghost设置被check时的显示类型，实心/空心
```

### 复选框

