// src/pages/Manufacturer/components/ManufacturerTable.tsx
import { Table, Tag, Space, Button, Typography, Card } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import type { Manufacturer, Model, Series, ActiveTab } from '../types/manufacturer.types'

const { Text } = Typography

interface ManufacturerTableProps {
  data: Manufacturer[] | Model[] | Series[]
  loading: boolean
  activeTab: ActiveTab
}

export function ManufacturerTable({ data, loading, activeTab }: ManufacturerTableProps) {
  const { t } = useTranslation('manufacturer')

  const getColumns = () => {
    if (activeTab === 'manufacturers') {
      return [
        { title: t('companyName'), dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
        { title: t('brand'), dataIndex: 'brand', key: 'brand' },
        { title: t('website'), dataIndex: 'website', key: 'website' },
        { title: t('phone'), dataIndex: 'phone', key: 'phone' },
        {
          title: t('actions'),
          key: 'actions',
          render: () => (
            <Space size="small">
              <Button type="text" icon={<EditOutlined />} size="small" />
              <Button type="text" danger icon={<DeleteOutlined />} size="small" />
            </Space>
          ),
        },
      ]
    }

    if (activeTab === 'models') {
      return [
        { title: t('modelName'), dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
        { title: t('description'), dataIndex: 'description', key: 'description' },
        { title: t('releaseDate'), dataIndex: 'releaseDate', key: 'releaseDate' },
        {
          title: t('status'),
          dataIndex: 'status',
          key: 'status',
          render: (status: string) => (
            <Tag color={status === 'active' ? 'green' : 'red'}>{t(status)}</Tag>
          ),
        },
        {
          title: t('actions'),
          key: 'actions',
          render: () => (
            <Space size="small">
              <Button type="text" icon={<EditOutlined />} size="small" />
              <Button type="text" danger icon={<DeleteOutlined />} size="small" />
            </Space>
          ),
        },
      ]
    }

    return [
      { title: t('seriesName'), dataIndex: 'name', key: 'name', render: (text: string) => <Text strong>{text}</Text> },
      { title: t('seriesCode'), dataIndex: 'code', key: 'code' },
      { title: t('description'), dataIndex: 'description', key: 'description' },
      {
        title: t('status'),
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => (
          <Tag color={status === 'active' ? 'green' : 'red'}>{t(status)}</Tag>
        ),
      },
      {
        title: t('actions'),
        key: 'actions',
        render: () => (
          <Space size="small">
            <Button type="text" icon={<EditOutlined />} size="small" />
            <Button type="text" danger icon={<DeleteOutlined />} size="small" />
          </Space>
        ),
      },
    ]
  }

  return (
    <Card variant="borderless" className="shadow-sm">
      <Table
        dataSource={data as any[]}
        columns={getColumns()}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        scroll={{ x: 'max-content' }}
      />
    </Card>
  )
}