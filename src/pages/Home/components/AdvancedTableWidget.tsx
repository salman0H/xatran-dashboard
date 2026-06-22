import { Card, Table, Tag, Space, Button, Typography } from 'antd'
import type { TableColumnsType } from 'antd'
import { useTranslation } from 'react-i18next'
import { SubstationSummary } from '../types/dashboard.types'

const { Text } = Typography

interface AdvancedTableWidgetProps {
  data: SubstationSummary[]
  loading: boolean
}

export function AdvancedTableWidget({ data, loading }: AdvancedTableWidgetProps) {
  const { t } = useTranslation('dashboard')

  const columns: TableColumnsType<SubstationSummary> = [
    {
      title: t('substationName'),
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: t('location'),
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: t('componentCount'),
      dataIndex: 'componentCount',
      key: 'componentCount',
      render: (count) => <Tag color="blue">{count}</Tag>,
    },
    {
      title: t('status'),
      key: 'status',
      render: () => <Tag color="green">{t('active')}</Tag>,
    },
    {
      title: t('actions'),
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" size="small">
            {t('edit')}
          </Button>
          <Button type="link" danger size="small">
            {t('delete')}
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Card
      variant="borderless"
      className="shadow-sm hover:shadow-md transition-shadow"
      title={t('advancedTableTitle')}
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20'] }}
        scroll={{ x: 'max-content' }}
        size="middle"
      />
    </Card>
  )
}