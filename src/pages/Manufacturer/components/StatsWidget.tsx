// src/pages/Manufacturer/components/StatsWidget.tsx
import { Card, Row, Col, Statistic, Button, Space, Tooltip } from 'antd'
import { PlusOutlined, BuildOutlined, AppstoreOutlined, PartitionOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import type { ActiveTab } from '../types/manufacturer.types'

interface StatsWidgetProps {
  stats: { manufacturers: number; models: number; series: number }
  activeTab: ActiveTab
  onAdd: () => void
}

export function StatsWidget({ stats, activeTab, onAdd }: StatsWidgetProps) {
  const { t } = useTranslation('manufacturer')

  const getAddButtonText = () => {
    if (activeTab === 'manufacturers') return t('addManufacturer')
    if (activeTab === 'models') return t('addModel')
    return t('addSeries')
  }

  return (
    <Card variant="borderless" className="shadow-sm mb-4">
      <Row gutter={[16, 16]} align="middle">
        <Col flex="auto">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card
                variant="borderless"
                className="bg-blue-50/50 hover:shadow-md transition-shadow"
                styles={{ body: { padding: '16px' } }}
              >
                <Statistic
                  title={
                    <Space>
                      <BuildOutlined className="text-blue-500" />
                      <span>{t('totalManufacturers')}</span>
                    </Space>
                  }
                  value={stats.manufacturers}
                  valueStyle={{ color: '#1677ff', fontWeight: 600 }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                variant="borderless"
                className="bg-green-50/50 hover:shadow-md transition-shadow"
                styles={{ body: { padding: '16px' } }}
              >
                <Statistic
                  title={
                    <Space>
                      <AppstoreOutlined className="text-green-500" />
                      <span>{t('totalModels')}</span>
                    </Space>
                  }
                  value={stats.models}
                  valueStyle={{ color: '#52c41a', fontWeight: 600 }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                variant="borderless"
                className="bg-purple-50/50 hover:shadow-md transition-shadow"
                styles={{ body: { padding: '16px' } }}
              >
                <Statistic
                  title={
                    <Space>
                      <PartitionOutlined className="text-purple-500" />
                      <span>{t('totalSeries')}</span>
                    </Space>
                  }
                  value={stats.series}
                  valueStyle={{ color: '#722ed1', fontWeight: 600 }}
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col>
          <Tooltip title={getAddButtonText()}>
            <Button type="primary" icon={<PlusOutlined />} onClick={onAdd} size="large">
              {getAddButtonText()}
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </Card>
  )
}