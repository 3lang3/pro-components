import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { LightFilter, ProFormDatePicker } from '@ant-design/pro-form';
import ProTable, { ProColumns } from '@ant-design/pro-table';

export interface TableListItem {
  key: number;
  name: string;
  containers: number;
  creator: string;
}
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
  });
}

const columns: ProColumns<TableListItem>[] = [
  {
    title: '应用名称',
    dataIndex: 'name',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '容器数量',
    dataIndex: 'containers',
    align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    valueEnum: {
      all: { text: '全部' },
      付小小: { text: '付小小' },
      曲丽丽: { text: '曲丽丽' },
      林东东: { text: '林东东' },
      陈帅帅: { text: '陈帅帅' },
      兼某某: { text: '兼某某' },
    },
  },
  {
    title: '操作',
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="link">链路</a>,
      <a key="warn">报警</a>,
      <a key="more">
        <EllipsisOutlined />
      </a>,
    ],
  },
];

export default () => {
  return (
    <ProTable<TableListItem>
      columns={columns}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
        return Promise.resolve({
          data: tableListDataSource,
          success: true,
        });
      }}
      toolbar={{
        title: '标签',
        multipleLine: true,
        filter: (
          <LightFilter>
            <ProFormDatePicker name="startdate" label="响应日期" />
          </LightFilter>
        ),
        tabs: {
          items: [
            {
              key: 'tab1',
              tab: '标签一',
            },
            {
              key: 'tab2',
              tab: '标签二',
            },
          ],
        },
      }}
      rowKey="key"
      search={false}
    />
  );
};
