import { Card, Statistic, Row, Col } from 'antd'
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, RiseOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface KPIWidgetProps {
  totalNodes: number
  totalEdges: number
  substationCount: number
}

export function KPIWidget({ totalNodes, totalEdges, substationCount }: KPIWidgetProps) {
  const { t } = useTranslation('dashboard')

  return (
    <Card variant="borderless" className="shadow-sm hover:shadow-md transition-shadow">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic
            title={t('totalNodesLabel')}
            value={totalNodes}
            prefix={<UserOutlined />}
            styles={{ content: { color: '#1677ff' } }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={t('totalEdgesLabel')}
            value={totalEdges}
            prefix={<ShoppingCartOutlined />}
            styles={{ content: { color: '#52c41a' } }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={t('substations')}
            value={substationCount}
            prefix={<DollarOutlined />}
            styles={{ content: { color: '#faad14' } }}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={t('totalComponents')}
            value={totalNodes + totalEdges + substationCount}
            prefix={<RiseOutlined />}
            styles={{ content: { color: '#722ed1' } }}
          />
        </Col>
      </Row>
    </Card>
  )
}