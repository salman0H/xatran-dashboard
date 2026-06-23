// src/pages/Manufacturer/components/StatsWidget.tsx
import { Card, Statistic, Row, Col, Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import type { ActiveTab } from '../types/manufacturer.types'

interface StatsWidgetProps {
  stats: { manufacturers: number; models: number; series: number }
  activeTab: ActiveTab
  onAdd: () => void
}

export function StatsWidget({ stats, activeTab, onAdd }: StatsWidgetProps) {
  const { t } = useTranslation('dashboard')

  const getAddButtonText = () => {
    if (activeTab === 'manufacturers') return t('addManufacturer')
    if (activeTab === 'models') return t('addModel')
    return t('addSeries')
  }

  return (
    <Card variant="borderless" className="shadow-sm mb-4">
      <Row gutter={16} align="middle">
        <Col flex="auto">
          <Space size="large" wrap>
            <Statistic title={t('totalManufacturers')} value={stats.manufacturers} />
            <Statistic title={t('totalModels')} value={stats.models} />
            <Statistic title={t('totalSeries')} value={stats.series} />
          </Space>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
            {getAddButtonText()}
          </Button>
        </Col>
      </Row>
    </Card>
  )
}