// src/pages/Manufacturer/components/Sidebar.tsx
import { Card, Radio, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import type { ActiveTab } from '../types/manufacturer.types'

const { Text } = Typography

interface SidebarProps {
  activeTab: ActiveTab
  onChange: (tab: ActiveTab) => void
}

export function Sidebar({ activeTab, onChange }: SidebarProps) {
  const { t } = useTranslation('dashboard')

  return (
    <Card
      title={t('selectCategory')}
      variant="borderless"
      className="shadow-sm h-full"
      styles={{ body: { padding: '16px' } }}
    >
      <Radio.Group
        value={activeTab}
        onChange={(e) => onChange(e.target.value)}
        className="w-full flex flex-col gap-2"
      >
        <Radio value="manufacturers" className="w-full py-1">
          <Text strong>{t('manufacturers')}</Text>
        </Radio>
        <Radio value="models" className="w-full py-1">
          <Text strong>{t('models')}</Text>
        </Radio>
        <Radio value="series" className="w-full py-1">
          <Text strong>{t('series')}</Text>
        </Radio>
      </Radio.Group>
    </Card>
  )
}