import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/features/LanguageSwitcher/LanguageSwitcher'
import { UserMenu } from '@/components/features/UserMenu/UserMenu'
import { Button, Input, Badge } from 'antd'
import { SearchOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons'
import { useAppContext } from '@/context/AppContext'
import { useState, useRef } from 'react'
import { MegaMenu } from './MegaMenu'
import { useMenuData } from '@/hooks/useMenuData'
import { Link } from 'react-router-dom'

export function TopBar() {
  const { t } = useTranslation(['common', 'nav'])
  const { dir } = useAppContext()
  const { menuItems } = useMenuData()
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map())

  const handleMenuClick = (id: string) => {
    setActiveMenuId(activeMenuId === id ? null : id)
  }

  const handleMenuClose = () => {
    setActiveMenuId(null)
  }

  const isRtl = dir === 'rtl'

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-2 h-[64px] shadow-sm">
      {/* لوگو */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-9 h-9 bg-blue-600 rounded-lg grid place-items-center text-white text-base font-bold shadow-sm">
            C
          </div>
          <div>
            <div className="text-[16px] font-semibold text-gray-900 leading-tight">CoreUI</div>
            <div className="text-[9px] text-gray-400 font-mono -mt-0.5">v2.1.0</div>
          </div>
        </Link>
      </div>

      {/* منوی اصلی */}
      <nav className="hidden xl:flex items-center gap-0.5">
        {menuItems.map((item) => {
          const label = t(`nav:${item.label}`) || item.label
          return (
            <div
              key={item.id}
              className="relative"
              ref={(el) => {
                if (el) triggerRefs.current.set(item.id, el)
              }}
            >
              <button
                onClick={() => handleMenuClick(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeMenuId === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {label}
                {item.children && item.children.length > 0 && (
                  <span className="text-[10px] mr-1">▾</span>
                )}
              </button>
              {item.children && item.children.length > 0 && activeMenuId === item.id && (
                <MegaMenu
                  item={item}
                  isOpen={true}
                  onClose={handleMenuClose}
                  triggerRef={{ current: triggerRefs.current.get(item.id) || null }}
                />
              )}
            </div>
          )
        })}
      </nav>

      {/* بخش راست */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center">
          <Input
            placeholder={t('common:search')}
            prefix={<SearchOutlined className="text-gray-400" />}
            suffix={<span className="text-[10px] text-gray-400 font-mono bg-gray-100 px-1.5 py-0.5 rounded">⌘K</span>}
            className="!w-[220px] !bg-gray-50 !border-gray-200 !rounded-lg !text-[13px] hover:!border-gray-300 focus:!border-blue-500"
            size="middle"
          />
        </div>

        <Badge count={5} size="small" offset={[0, 0]}>
          <Button
            type="text"
            icon={<BellOutlined className="text-lg" />}
            aria-label={t('common:notifications')}
            className="!w-9 !h-9 !flex !items-center !justify-center !text-gray-500 hover:!bg-gray-100 hover:!text-gray-700 !rounded-lg"
          />
        </Badge>

        <LanguageSwitcher />

        <Button
          type="text"
          icon={<SettingOutlined className="text-lg" />}
          aria-label={t('common:settings')}
          className="!w-9 !h-9 !flex !items-center !justify-center !text-gray-500 hover:!bg-gray-100 hover:!text-gray-700 !rounded-lg"
        />

        <UserMenu />
      </div>
    </header>
  )
}