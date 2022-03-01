# Tab说明

## TabPane属性说明

| 属性            | 说明                               | 类型                                     | 默认值 | 必填 |
| --------------- | ---------------------------------- | ---------------------------------------- | ------ | ---- |
| className       | tabPane样式定制，加给整体的类            | string                                   | -      | N    |
| tabsClassName | 整个tabBar模块的类 | string | - |  |
| color           | tabBar的颜色                                                 | string                                                       | -      |  |
| hoverColor      | hover时tabBar的颜色                                          | string                                                       | -      |  |
| activeColor     | 当tabBar为选中状态时tabBar的颜色                             | string                                                       | -      |      |
| children        | 传入的children必须是以<TabItem value={} text={}>tabItemChildren</TabItem>这样的形式，单个或者数组 | React.ReactElement<ITabItem> \|Array<React.ReactElement<ITabItem>> | -      |      |
| active | 当前激活 tab 面板的 key            | string                                   | -      |      |
| onChange | tab 被点击的回调                   | function(key: string)：any | -      |      |
| tabPosition | 页签位置，可选值有 `top`  `bottom` | top \|bottom                             | top    |      |
| animated        | 是否使用动画切换 Tabs(仅下划线在下时有用)  | booean                                   | false  |      |
| tabAlignment    | tab标签整体相对于pane容器的布局      | left \| center \| right                  | left   |      |
| tabBarGutter    | tabs 之间的间隙                    | string \| number                         | -      |      |
| fullContentArea | tab的范围占满版心(true) 或 占满全屏                          | boolean                                                      | false |      |
| backgroundColor | pane的tab的背景色                 | string                                   | -      |      |
| boxShadow       | pane的tab整体的阴影                  | boolean                                  | -      |      |

## TabItem属性说明

| 属性                   | 说明                                    | 类型            | 默认值 | 必填 |
| ---------------------- | --------------------------------------- | --------------- | ------ | ---- |
| text                   | tabName                                 | string          | -      |      |
| value                  | tab的key                                | string          | -      |      |
| tabClassName           | 给tab的bar增加类                        | string          | -      | N    |
| className              | tabItem的children增加类                 | string          | -      | N    |
| textAlignmentClassName | children的布局类（left /right /center） | string          | -      | N    |
| children               | 被点击页面显示的内容                    | React.ReactNode | -      | N    |

## 注意：

- tabBar的字体配置，可通过tabClassName处理

```react
    <!-- Image组件 -->
    interface ISrc {
        src: string;
    }
    const Image = (props: ISrc): React.ReactElement => {
        return (
            <img src={getStaticPath(props.src)}/>
        );
    };

    <!-- tab组件 -->
    <ReoTab active={'3d'}>
        <TabItem value={'3d'} text="3d">
            <div>
                <Image src='/wp-content/assets/finance/test/1.jpg'></Image>
            </div>
        </TabItem>
        <TabItem value={'4d'} text="4d">
            <Image src='/wp-content/assets/reolink-duo-4g-two-lens.jpg' className={'className'}></Image>
        </TabItem>
        <TabItem value={'5d'} text="5d">
            <img src={getStaticPath('/wp-content/assets/reolink-duo-sd-card-pc.png')}></img>
        </TabItem>
    </ReoTab>
```
