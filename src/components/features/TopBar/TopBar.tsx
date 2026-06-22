import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/features/LanguageSwitcher/LanguageSwitcher'
import { UserMenu } from '@/components/features/UserMenu/UserMenu'
import { Button, Input, Badge, Divider, Tooltip } from 'antd'
import {
  SearchOutlined,
  BellOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  DownOutlined,
  DashboardOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { useAppContext } from '@/context/AppContext'
import { useState, useRef } from 'react'
import { MegaMenu } from './MegaMenu'
import { useMegaMenu } from '@/hooks/useMegaMenu'
import { Link, useLocation } from 'react-router-dom'

export function TopBar() {
  const { t } = useTranslation(['common', 'nav', 'menu'])
  const { dir } = useAppContext()
  const location = useLocation()
  const { data: megaMenuData, loading, error } = useMegaMenu()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  const isRtl = dir === 'rtl'
  const menuLabel = t('menu:assetManagement') || 'Asset Management'
  const hasMenuData = megaMenuData && megaMenuData.columns && megaMenuData.columns.length > 0

  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 flex items-center justify-between sticky top-0 z-[1000] select-none">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ApartmentOutlined className="text-white text-lg" />
          </div>
          <span className="font-bold text-slate-800 tracking-tight hidden sm:block text-[15px]">
            PAM System
          </span>
        </Link>

        <Divider type="vertical" className="!h-5 !border-slate-200 hidden md:block" />

        <nav className="hidden md:flex items-center gap-1">
          <Link to="/">
            <Button
              type="text"
              icon={<DashboardOutlined className="text-[15px]" />}
              className={`!h-10 !px-4 !flex !items-center !gap-2 !rounded-xl !font-medium transition-all ${
                location.pathname === '/'
                  ? '!bg-blue-50 !text-blue-600'
                  : '!text-slate-600 hover:!bg-slate-50 hover:!text-slate-900'
              }`}
            >
              {t('nav:dashboard')}
            </Button>
          </Link>

          {!loading && !error && hasMenuData && (
            <div className="relative">
              <Button
                ref={triggerRef}
                type="text"
                onClick={handleMenuToggle}
                icon={<AppstoreOutlined className="text-[15px]" />}
                className={`!h-10 !px-4 !flex !items-center !gap-2 !rounded-xl !font-medium transition-all ${
                  isMenuOpen
                    ? '!bg-slate-100 !text-slate-900'
                    : '!text-slate-600 hover:!bg-slate-50 hover:!text-slate-900'
                }`}
              >
                <span>{menuLabel}</span>
                <DownOutlined
                  className={`text-[10px] transition-transform duration-200 ${
                    isMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>

              <MegaMenu
                data={megaMenuData!}
                isOpen={isMenuOpen}
                onClose={handleMenuClose}
                triggerRef={triggerRef}
              />
            </div>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Input
          prefix={<SearchOutlined className="text-slate-400" />}
          placeholder={t('common:search')}
          className="!w-64 !h-10 !bg-slate-50 hover:!bg-slate-100 focus:!bg-white !border-none !rounded-xl !hidden lg:flex transition-all"
        />

        <Divider type="vertical" className="!h-5 !border-slate-200 hidden md:block" />

        <Tooltip title={t('common:notifications')}>
          <Badge count={5} size="small" offset={[-2, 2]} color="#2563EB">
            <Button
              type="text"
              icon={<BellOutlined className="text-[17px]" />}
              aria-label={t('common:notifications')}
              className="!w-10 !h-10 !flex !items-center !justify-center !text-slate-500 hover:!bg-slate-100 hover:!text-slate-800 !rounded-full transition-colors"
            />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <Button
            type="text"
            icon={<QuestionCircleOutlined className="text-[17px]" />}
            aria-label="Help"
            className="!w-10 !h-10 !hidden sm:!flex !items-center !justify-center !text-slate-500 hover:!bg-slate-100 hover:!text-slate-800 !rounded-full transition-colors"
          />
        </Tooltip>

        <LanguageSwitcher />

        <Tooltip title={t('common:settings')}>
          <Button
            type="text"
            icon={<SettingOutlined className="text-[17px]" />}
            aria-label={t('common:settings')}
            className="!w-10 !h-10 !flex !items-center !justify-center !text-slate-500 hover:!bg-slate-100 hover:!text-slate-800 !rounded-full transition-colors"
          />
        </Tooltip>

        <Divider type="vertical" className="!h-6 !border-slate-200" />

        <UserMenu />
      </div>
    </header>
  )
}