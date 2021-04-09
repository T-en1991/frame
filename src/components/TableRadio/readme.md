# table-radio 组件文档

表格单选组件

## 组件功能

表格单选组件，支持双向数据绑定

## 组件参数

| 参数名 | 类型                  | 说明 | 默认值 | 是否必填 |
| ------ | --------------------- | ---- | ------ | -------- |
| option | [Object] 表格渲染数据 | []   | 否     |

| 参数名  | 类型                  | 说明 | 默认值 | 是否必填 |
| ------- | --------------------- | ---- | ------ | -------- |
| tColumn | [Object] 表头渲染数据 | []   | 是     |

## 依赖关系

el-table el-radio （不用引入）

## v-mode

绑定数据格式 {}

# slot

支持 slot="seach" slot="pagination" 自行拓展业务

# <code>

<table-radio :option="bindData" :tColumn="tColumn" v-model="chooseData">
    <div slot="seach"></div>
    <div slot="pagination"></div>
</table-radio>
