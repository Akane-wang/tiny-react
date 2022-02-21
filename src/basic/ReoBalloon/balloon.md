# 气泡框说明

| 属性       | 说明                                      | 类型                             | 默认值     |
| ---------- | ----------------------------------------- | -------------------------------- | ---------- |
| type       | 目前支持的balloon类型，简单提示\|详细提示 | singleLine\| multiLine(多行) | singleLine |
| placement  | 气泡框的整体相对于目标的位置以及气泡框的箭头相对于气泡框的位置 | PlaceMent                    | topLeft |
| className | 气泡的样式                                 | string                       | -          |
| children | 气泡的相对目标                             | ReactNode                    | -          |
| content   | 气泡组件本身内容(气泡弹窗)                 | ReactNode                    | -          |
| trigger | 触发行为,传入为trigger时，移动端改为click | `hover`|`focus` |`click` | `hover` |
| backgroundColor | content的背景主题色 | string |rgba(0,0,0,0.8) |

-  气泡被遮挡时自动调整位置（优化）
-  trigger 支持其他类型
