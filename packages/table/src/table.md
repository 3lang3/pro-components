---
title: ProTable - 高级表格
order: 0
group:
  path: /
nav:
  title: 组件
  path: /components
---

# ProTable - 高级表格

ProTable 的诞生是为了解决项目中需要写很多 table 的样板代码的问题，所以在其中做了封装了很多常用的逻辑。这些封装可以简单的分类为预设行为与预设逻辑。

依托于 ProForm 的能力，ProForm 拥有多种形态，可以切换查询表单类型，设置变形成为一个简单的 Form 表单，执行新建等功能。

## 何时使用

当你的表格需要与服务端进行交互或者需要多种单元格样式时，ProTable 是不二选择。

## 代码演示

### 查询表格

<code src="./demos/single.tsx" background="#f5f5f5" height="500px"/>

### 降级为普通表格

<code src="./demos/normal.tsx" background="#f5f5f5" height="400px"/>

### 轻量筛选替换查询表单

<code src="./demos/lightfilter.tsx" background="#f5f5f5"  height="400px"/>

### 无 ToolBar 的表格

<code src="./demos/no-title.tsx" background="#f5f5f5" height="350px"/>

### 嵌套表格

<code src="./demos/table-nested.tsx" background="#f5f5f5"  height="400px"/>

### 表格批量操作

<code src="./demos/batchOption.tsx" background="#f5f5f5" height="420px"/>

### 通过 formRef 来操作查询表单

<code src="./demos/form.tsx" background="#f5f5f5"  height="320px"/>

### RTL (النسخة العربية)

RTL means right-to-left.

<code src="./demos/rtl_table.tsx" background="#f5f5f5" height="500px"/>

### 受控的表格设置栏

可以默认隐藏某些栏，但是在操作栏中可以选择

<code src="./demos/columnsStateMap.tsx" background="#f5f5f5" height="300px"/>

### 表格轮询网络数据

<code src="./demos/pollinga.tsx" background="#f5f5f5" height="360px"/>

### 搜索表单自定义

当内置的表单项无法满足我们的基本需求，这时候我们就需要来自定义一下默认的组件，我们可以通过 `fieldProps` 和 `renderFormItem` 配合来使用。

`fieldProps` 可以把 props 透传，可以设置 select 的样式和多选等问题。

`renderFormItem` 可以完成重写渲染逻辑，传入 item 和 props 来进行渲染，需要注意的是我们必须要将 props 中的 `value` 和 `onChange` 必须要被赋值，否则 form 无法拿到参数。

```tsx | pure
renderFormItem: (_, { type, defaultRender, ...rest }, form) => {
  if (type === 'form') {
    return null;
  }
  const status = form.getFieldValue('state');
  if (status !== 'open') {
    return <Input {...rest} placeholder="请输入" />;
  }
  return defaultRender(_);
};
```

`renderFormItem` 的定义, 具体的值可以打开控制台查看。

```tsx | pure
 renderFormItem?: (
    item: ProColumns<T>,
    config: {
      value?: any;
      onChange?: (value: any) => void;
      onSelect?: (value: any) => void;
      type: ProTableTypes;
      defaultRender: (newItem: ProColumns<any>) => JSX.Element | null;
    },
    form: FormInstance,
  ) => JSX.Element | false | null;
```

<code src="./demos/linkage_form.tsx" background="#f5f5f5" height="310px"/>

### 表单操作自定义

<code src="./demos/search_option.tsx" background="#f5f5f5" height="310px"/>

### Toolbar 自定义

使用 `toolbar`属性扩展配置工具栏渲染。

<code src="./demos/listToolBar.tsx" background="#f5f5f5" height="450px"/>

### 表格主体自定义

<code src="./demos/renderTable.tsx" background="#f5f5f5" height="500px"/>

### 国际化相关的配置

ProTable 内置了国际化的支持，作为一个文本量比较少的组件，我们可以自行实现国际化，成本也很低。

这里是全量的文本

```typescript | pure
const enLocale = {
  tableFrom: {
    search: 'Query',
    reset: 'Reset',
    submit: 'Submit',
    collapsed: 'Expand',
    expand: 'Collapse',
    inputPlaceholder: 'Please enter',
    selectPlaceholder: 'Please select',
  },
  alert: {
    clear: 'Clear',
  },
  tableToolBar: {
    leftPin: 'Pin to left',
    rightPin: 'Pin to right',
    noPin: 'Unpinned',
    leftFixedTitle: 'Fixed the left',
    rightFixedTitle: 'Fixed the right',
    noFixedTitle: 'Not Fixed',
    reset: 'Reset',
    columnDisplay: 'Column Display',
    columnSetting: 'Settings',
    fullScreen: 'Full Screen',
    exitFullScreen: 'Exit Full Screen',
    reload: 'Refresh',
    density: 'Density',
    densityDefault: 'Default',
    densityLarger: 'Larger',
    densityMiddle: 'Middle',
    densitySmall: 'Compact',
  },
};

// 生成 intl 对象
const enUSIntl = createIntl('en_US', enUS);

// 使用
<IntlProvider value={enUSIntl}>
  <ProTable />
</IntlProvider>;
```

<code src="./demos/intl.tsx" background="#f5f5f5" height="320px"/>

### 使用自带 keyWords 搜索的 table

<code src="./demos/search.tsx" background="#f5f5f5" height="200px"/>

### 值类型示例

#### valueType - 日期类

<code src="./demos/valueTypeDate.tsx" background="#f5f5f5" height="350px"/>

#### valueType - 数字类

<code src="./demos/valueTypeNumber.tsx" background="#f5f5f5" height="350px"/>

#### valueType - 样式类

<code src="./demos/valueType.tsx" background="#f5f5f5" height="680px"/>

#### valueType - 选择类

<code src="./demos/valueType_select.tsx" background="#f5f5f5" heigh="462px"/>

## API

ProTable 在 antd 的 Table 上进行了一层封装，支持了一些预设，并且封装了一些行为。这里只列出与 antd Table 不同的 api。

### ProTable

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| request | 获取 `dataSource` 的方法 | `(params?: {pageSize: number;current: number;[key: string]: any;},sort,filter) => Promise<RequestData<T>>` | - |
| params | 用于 request 查询的多余参数，一旦变化会触发重新加载 | object | - | - |
| postData | 对通过 `request` 获取的数据进行处理 | `(data: T[]) => T[]` | - |
| defaultData | 默认的数据 | `T[]` | - |
| actionRef | Table action 的引用，便于自定义触发 | `React.MutableRefObject<FormInstance>` \| `((actionRef: ActionType) => void)` | - |
| formRef | 可以获取到查询表单的 form 实例，用于一些灵活的配置 | `React.MutableRefObject<ActionType>` \| `((actionRef: ActionType) => void)` | - |
| toolBarRender | 渲染工具栏，支持返回一个 dom 数组，会自动增加 margin-right | `(action: UseFetchDataAction<RequestData<T>>) => React.ReactNode[]` | - |
| onLoad | 数据加载完成后触发,会多次触发 | `(dataSource: T[]) => void` | - |
| onRequestError | 数据加载失败时触发 | `(e: Error) => void` | - |
| tableClassName | 封装的 table 的 className | string | - |
| tableStyle | 封装的 table 的 style | CSSProperties | - |
| options | table 工具栏，设为 false 时不显示 | `{{ fullScreen: boolean \| function, reload: boolean \| function,setting: true }}` | `{ fullScreen: true, reload:true, setting: true}` |
| search | 是否显示搜索表单，传入对象时为搜索表单的配置 | [search config](#search) | true |
| dateFormatter | 转化 moment 格式数据为特定类型，false 不做转化 | `"string"` \| `"number"` \| `false` | `"string"` |
| beforeSearchSubmit | 搜索之前进行一些修改 | `(params:T)=>T` | - |
| onSizeChange | table 尺寸发生改变 | `(size: 'default' \| 'middle' \| 'small' \| undefined) => void` | - |
| columnsStateMap | columns 的状态枚举 | `{[key: string]: { show:boolean, fixed: "right" \| "left"} }` | - |
| onColumnsStateChange | columns 状态发生改变 | `(props: {[key: string]: { show:boolean, fixed: "right" \| "left"} }) => void` | - |
| type | pro-table 类型 | `"form"` | - |
| form | antd form 的配置 | `FormProps` | - |
| onSubmit | 提交表单时触发 | `(params: U) => void` | - |
| onReset | 重置表单时触发 | `() => void` | - |
| columnEmptyText | 空值时的显示，不设置 则默认显示 `-` | `string` \| `false` | false |
| tableRender | 自定义渲染表格函数 | `(props: ProTableProps<T, U>, defaultDom: JSX.Element, domList: { toolbar: JSX.Element \| undefined; alert: JSX.Element \| undefined; table: JSX.Element \| undefined;}) => React.ReactNode` | - |
| toolbar | 透传 ListToolBar 配置项 | `ListToolBarProps` | - |
| tableExtraRender | 自定义表格的主体函数 | `(props: ProTableProps<T, U>, dataSource: T[]) => React.ReactNode;` | - |
| manualRequest | 是否需要手动触发首次请求, 配置为 `true` 时不可隐藏搜索表单 | `boolean` | false |

#### Search 搜索表单

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| filterType | 过滤表单类型 | `'query'` \| `'light'` | `'query'` |
| searchText | 查询按钮的文本 | string | 查询 |
| resetText | 重置按钮的文本 | string | 重置 |
| submitText | 提交按钮的文本 | string | 提交 |
| labelWidth | 标签的宽度 | number | 98 |
| span | 配置查询表单的列数 | `'number'` \| [`'ColConfig'`](#ColConfig) | defaultColConfig |
| collapseRender | 收起按钮的 render | `(collapsed: boolean,showCollapseButton?: boolean,) => React.ReactNode` | - |
| defaultCollapsed | 默认是否收起 | boolean | false |
| collapsed | 是否收起 | boolean | - |
| onCollapse | 收起按钮的事件 | `(collapsed: boolean) => void;` | - |
| optionRender | 操作栏的 render | `((searchConfig,formProps) => React.ReactNode[])`\|`false` | - |

#### ColConfig

```tsx | pure
const defaultColConfig = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};
```

#### ActionRef 手动触发

有时我们要手动触发 table 的 reload 等操作，可以使用 actionRef。

```tsx | pure
interface ActionType {
  reload: (resetPageIndex?: boolean) => void;
  fetchMore: () => void;
  reset: () => void;
}

const ref = useRef<ActionType>();

<ProTable actionRef={ref} />;

// 刷新
ref.current.reload();

// 刷新并清空
ref.current.reloadAndRest;

// 重置到默认值
ref.current.reset();

// 清空选中项
ref.current.clearSelected();
```

### Columns 列定义

> 请求远程数据比较复杂，详细可以看[这里](/components/field#远程数据)。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 与 antd 中基本相同，但是支持通过传入一个方法 | `ReactNode \| ((config: ProColumnType<T>, type: ProTableTypes) => ReactNode)` | - |
| tooltip | 会在 title 之后展示一个 icon，hover 之后提示一些信息 | string | - |
| renderText | 类似 table 的 render，但是必须返回 string，如果只是希望转化枚举，可以使用 [valueEnum](#valueEnum) | `(text: any,record: T,index: number,action: UseFetchDataAction<RequestData<T>>) => string` | - |
| render | 类似 table 的 render，第一个参数变成了 dom,增加了第四个参数 action | `(text: React.ReactNode,record: T,index: number,action: UseFetchDataAction<RequestData<T>>) => React.ReactNode \| React.ReactNode[]` | - |
| ellipsis | 是否自动缩略 | boolean | - |
| copyable | 是否支持复制 | boolean | - |
| valueEnum | 值的枚举，会自动转化把值当成 key 来取出要显示的内容 | [valueEnum](#valueenum) | - |
| valueType | 值的类型 | `money` \| `option` \| `date` \| `dateTime` \| `time` \| `text`\| `index`\|`indexBorder` | `text` |
| hideInSearch | 在查询表单中不展示此项 | boolean | - |
| hideInTable | 在 Table 中不展示此列 | boolean | - |
| hideInForm | 在 Form 模式下 中不展示此列 | boolean | - |
| filters | 表头的筛选菜单项，当值为 true 时，自动使用 valueEnum 生成 | `boolean` \| `object[]` | false |
| order | 查询表单中的权重，权重大排序靠前 | number | - |
| renderFormItem | 渲染查询表单的输入组件 | `(item,props:{value,onChange}) => React.ReactNode` | - |
| fieldProps | 查询表单的 props，会透传给表单项 | `{ [prop: string]: any }` | - |
| search | 配置列的搜索相关，false 为隐藏 | `boolean` \| `{ transform: (value: any) => any }` | true |
| search.transform | 转化值的 key, 一般用于事件区间的转化 | `(value: any) => any` | - |

### valueType 值类型

ProTable 封装了一些常用的值类型来减少重复的 `render` 操作，配置一个`valueType` 即可展示格式化响应的数据。

现在支持的值如下

| 类型 | 描述 | 示例 |
| --- | --- | --- |
| money | 转化值为金额 | ¥10,000.26 |
| date | 日期 | 2019-11-16 |
| dateRange | 日期区间 | 2019-11-16 2019-11-18 |
| dateTime | 日期和时间 | 2019-11-16 12:50:00 |
| dateTimeRange | 日期和时间区间 | 2019-11-16 12:50:00 2019-11-18 12:50:00 |
| time | 时间 | 12:50:00 |
| option | 操作项，会自动增加 marginRight，只支持一个数组,表单中会自动忽略 | `[<a>操作a</a>,<a>操作b</a>]` |
| text | 默认值，不做任何处理 | - |
| select | 选择 | - |
| textarea | 与 text 相同， form 转化时会转为 textarea 组件 | - |
| index | 序号列 | - |
| indexBorder | 带 border 的序号列 | - |
| progress | 进度条 | - |
| digit | [格式化](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)数字展示，form 转化时会转为 inputNumber | - |
| percent | 百分比 | +1.12 |
| code | 代码块 | `const a = b` |
| avatar | 头像 | 展示一个头像 |
| password | 密码框 | 密码相关的展示 |

#### 传入 function

只有一个值并不能表现很多类型，`progress` 就是一个很好的例子。所以我们支持传入一个 function。你可以这样使用：

```tsx |pure
const columns = {
  title: '进度',
  key: 'progress',
  dataIndex: 'progress',
  valueType: (item: T) => ({
    type: 'progress',
    status: item.status !== 'error' ? 'active' : 'exception',
  }),
};
```

#### 支持的返回值

#### progress

```js
return {
  type: 'progress',
  status: 'success' | 'exception' | 'normal' | 'active',
};
```

#### money

```js
return { type: 'money', locale: 'en-Us' };
```

#### percent

```js
return { type: 'percent', showSymbol: true | false, precision: 2 };
```

valueEnum 需要传入一个枚举，ProTable 会自动根据值获取响应的枚举，并且在 from 中生成一个下拉框。看起来是这样的：

```ts | pure
const valueEnum = {
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
  },
};

// 也可以设置为一个function
const valueEnum = (row) =>
  row.isMe
    ? {
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      }
    : {
        open: {
          text: '等待解决',
          status: 'Error',
        },
        closed: {
          text: '已回应',
          status: 'Success',
        },
      };
```

> 这里值得注意的是在 from 中并没有 row，所以传入了一个 null，你可以根据这个来判断要在 from 中显示什么选项。

### valueEnum

当前列值的枚举

```typescript | pure
interface IValueEnum {
  [key: string]:
    | React.ReactNode
    | {
        text: React.ReactNode;
        status: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
      };
}
```

### 批量操作

与 antd 相同，批量操作需要设置 `rowSelection` 来开启，与 antd 不同的是，pro-table 提供了一个 alert 用于承载一些信息。你可以通过 `tableAlertRender`和 `tableAlertOptionRender` 来对它进行自定义。设置或者返回 false 即可关闭。

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tableAlertRender | 自定义批量操作工具栏左侧信息区域, false 时不显示 | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => React.ReactNode)`\|`false` | - |
| tableAlertOptionRender | 自定义批量操作工具栏右侧选项区域, false 时不显示 | `({ selectedRowKeys: Key[], selectedRows: T[], onCleanSelected: ()=>void }) => React.ReactNode)`\|`false` | - |

### 搜索表单

ProTable 会根据列来生成一个 Form，用于筛选列表数据，最后的值会根据通过 `request` 的第一个参数返回，看起来就像。

```jsx | pure
<ProTable request={(params,sort,filter)=>{ all params}}>
```

按照规范，table 的表单不需要任何的必选参数，所有点击搜索和重置都会触发 `request`来发起一次查询。

Form 的列是根据 `valueType` 来生成不同的类型。

> valueType 为 index indexBorder option 和没有 dataIndex 和 key 的列将会忽略。

| 类型 | 对应的组件 |
| --- | --- |
| text | [Input](https://ant.design/components/input-cn/) |
| textarea | [Input.TextArea](https://ant.design/components/input-cn/#components-input-demo-textarea) |
| date | [DatePicker](https://ant.design/components/date-picker-cn/) |
| dateTime | [DatePicker](https://ant.design/components/date-picker-cn/#components-date-picker-demo-time) |
| time | [TimePicker](https://ant.design/components/time-picker-cn/) |
| dateTimeRange | [RangePicker](https://ant.design/components/time-picker-cn/#components-time-picker-demo-range-picker) |
| dateRange | [RangePicker](https://ant.design/components/time-picker-cn/#components-time-picker-demo-range-picker) |
| money | [InputNumber](https://ant.design/components/input-number-cn/) |
| digit | [InputNumber](https://ant.design/components/input-number-cn/) |
| option | 不展示 |
| index | 不展示 |
| progress | 不展示 |

### 列表工具栏

#### ToolBar - 基本使用

<code src="./demos/ListToolBar/basic.tsx" background="#f0f2f5"/>

#### ToolBar - 无标题

没有标题的情况下搜索框会前置。

<code src="./demos/ListToolBar/no-title.tsx" background="#f0f2f5"/>

#### ToolBar - 双行布局

双行的情况下会有双行的布局形式。

<code src="./demos/ListToolBar/multipleLine.tsx" background="#f0f2f5"/>

#### ToolBar - 带标签

标签需配合 `multipleLine` 为 `true` 时使用。

<code src="./demos/ListToolBar/tabs.tsx" background="#f0f2f5"/>

#### ToolBar- 标题下拉菜单

<code src="./demos/ListToolBar/menu.tsx" background="#f0f2f5"/>

#### ListToolBarProps

列表和表格的工具栏配置属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `ReactNode` | - |
| subTitle | 子标题 | `ReactNode` | - |
| description | 描述 | `ReactNode` | - |
| search | 查询区 | `ReactNode` \| `SearchProps` | - |
| actions | 操作区 | `ReactNode[]` | - |
| settings | 设置区 | `(ReactNode \| Setting)[]` | - |
| filter | 过滤区，通常配合 `LightFilter` 使用 | ReactNode | - |
| multipleLine | 是否多行展示 | boolean | false |
| menu | 菜单配置 | `ListToolBarMenu` | - |
| tabs | 标签页配置，仅当 `multipleLine` 为 true 时有效 | `ListToolBarTabs` | - |

SearchProps 为 antd 的 [Input.Search](https://ant.design/components/input-cn/#Input.Search) 的属性。

#### Setting

| 参数    | 说明         | 类型                  | 默认值 |
| ------- | ------------ | --------------------- | ------ |
| icon    | 图标         | ReactNode             | -      |
| tooltip | tooltip 描述 | string                | -      |
| key     | 操作唯一标识 | string                | -      |
| onClick | 设置被触发   | `(key: string)=>void` | -      |

#### ListToolBarMenu

| 参数      | 说明           | 类型                                  | 默认值     |
| --------- | -------------- | ------------------------------------- | ---------- |
| type      | 类型           | 'inline' \| 'dropdown'                | 'dropdown' |
| activeKey | 当前值         | string                                | -          |
| items     | 菜单项         | `{ key: string; label: ReactNode }[]` | -          |
| onChange  | 切换菜单的回调 | `(activeKey)=>void`                   | -          |

#### ListToolBarTabs

| 参数      | 说明       | 类型                                | 默认值     |
| --------- | ---------- | ----------------------------------- | ---------- |
| activeKey | 当前选中项 | string                              | -          |
| items     | 菜单项     | `{ key: string; tab: ReactNode }[]` | -          |
| onChange  | 类型       | 'inline' \| 'dropdown'              | 'dropdown' |
