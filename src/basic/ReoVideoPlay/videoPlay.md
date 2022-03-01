# videoPlay 播放按钮

| 属性      | 说明                    | 类型                     | 默认值 |
| --------- | ----------------------- | ------------------------ | ------ |
| type      | 播放按钮的类型          | play \| replay           | play   |
| onClick   | 点击videoPlay的回调函数 | () => any                | -      |
| className | 播放按钮的样式自定义    | string                   | -      |
| size      | 播放按钮的尺寸          | large \| medium \| small | large  |

- size 为medium时，在768以下，尺寸会变成small的配置

## 基本示例

```react
<ReoVideoPlay size={'small'} className={/*xxx*/} type={'play'} onClick={() => { /*xxx*/ }}/>
```

