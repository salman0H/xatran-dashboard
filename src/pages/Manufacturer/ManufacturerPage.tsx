// src/pages/Manufacturer/ManufacturerPage.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Col, Card, Typography, Space, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { Sidebar } from './components/Sidebar'
import { StatsWidget } from './components/StatsWidget'
import { ManufacturerTable } from './components/ManufacturerTable'
import { AddModal } from './components/AddModal'
import { useManufacturerData } from './hooks/useManufacturerData'
import { useAppContext } from '@/context/AppContext'

const { Title, Text } = Typography

export function ManufacturerPage() {
  const { t } = useTranslation(['dashboard', 'common'])
  const { dir } = useAppContext()
  const { activeTab, setActiveTab, data, loading, stats, addItem } = useManufacturerData()
  const [modalOpen, setModalOpen] = useState(false)

  const handleAdd = () => setModalOpen(true)
  const handleModalClose = () => setModalOpen(false)
  const handleAddSuccess = async (values: any) => {
    await addItem(values)
    setModalOpen(false)
  }

  return (
    <div className="p-4" dir={dir}>
      <Title level={2}>{t('manufacturerPageTitle', 'مدیریت شرکت‌های سازنده')}</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={18}>
          <StatsWidget stats={stats} activeTab={activeTab} onAdd={handleAdd} />
          <ManufacturerTable data={data} loading={loading} activeTab={activeTab} />
          <Card variant="borderless" className="shadow-sm mt-4">
            <Space size="large" align="start">
              <Avatar size={64} icon={<UserOutlined />} />
              <div>
                <Text strong>{t('common:userName')}</Text>
                <br />
                <Text type="secondary">{t('startDate')}: ۱۴۰۲/۰۷/۱۵</Text>
                <br />
                <Text type="secondary">{t('role')}: {t('common:userRole')}</Text>
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Sidebar activeTab={activeTab} onChange={setActiveTab} />
        </Col>
      </Row>
      <AddModal
        open={modalOpen}
        onClose={handleModalClose}
        onSuccess={handleAddSuccess}
        activeTab={activeTab}
      />
    </div>
  )
}