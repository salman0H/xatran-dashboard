import { Card, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useTranslation } from 'react-i18next'
import type { ActiveTab } from '../types/manufacturer.types'

interface SidebarProps {
  activeTab: ActiveTab
  onChange: (tab: ActiveTab) => void
}

export function Sidebar({ activeTab, onChange }: SidebarProps) {
  const { t } = useTranslation('manufacturer')

  const items: MenuProps['items'] = [
    {
      key: 'manufacturers',
      label: t('manufacturers'),
    },
    {
      key: 'models',
      label: t('models'),
    },
    {
      key: 'series',
      label: t('series'),
    },
  ]

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    onChange(e.key as ActiveTab)
  }

  return (
    <Card
      title={t('selectCategory')}
      variant="borderless"
      className="shadow-sm h-full"
      styles={{ body: { padding: '8px 0' } }}
    >
      <Menu
        mode="inline"
        selectedKeys={[activeTab]}
        items={items}
        onClick={handleMenuClick}
        className="!border-none"
      />
    </Card>
  )
}