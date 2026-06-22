// MegaMenu.tsx
import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '@/context/AppContext'
import { useTranslation } from 'react-i18next'
import {
  FolderOutlined,
  FileOutlined,
  SettingOutlined,
  DashboardOutlined,
  ApartmentOutlined,
  UserOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  StarOutlined,
} from '@ant-design/icons'
import type { MegaMenuData, MegaMenuItem } from '@/services/menu.service'

interface MegaMenuProps {
  data: MegaMenuData
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement>
}

interface MenuColumnProps {
  title: string
  items: MegaMenuItem[]
  onItemClick: (item: MegaMenuItem) => void
  isRtl: boolean
  translateFn: (label: string) => string
}

const iconMap: Record<string, React.ReactNode> = {
  'ti-layout-dashboard': <DashboardOutlined />,
  'ti-asset': <ApartmentOutlined />,
  'ti-folder': <FolderOutlined />,
  'ti-file': <FileOutlined />,
  'ti-settings': <SettingOutlined />,
  'ti-user': <UserOutlined />,
  'ti-list': <UnorderedListOutlined />,
  'ti-file-text': <FileTextOutlined />,
  'ti-star': <StarOutlined />,
}

function getIcon(iconName?: string): React.ReactNode {
  if (!iconName) return <FolderOutlined />
  return iconMap[iconName] || <FolderOutlined />
}

function MenuItemRenderer({
  item,
  onItemClick,
  isRtl,
  translateFn,
}: {
  item: MegaMenuItem
  onItemClick: (item: MegaMenuItem) => void
  isRtl: boolean
  translateFn: (label: string) => string
}) {
  const hasChildren = item.children && item.children.length > 0

  return (
    <li key={item.id} className="w-full">
      <button
        onClick={() => onItemClick(item)}
        className="w-full px-2 py-1.5 rounded-md text-[13px] text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all duration-150 flex items-center gap-2.5 text-start"
      >
        <span className="flex-shrink-0 text-slate-400 text-sm flex items-center justify-center">
          {getIcon(item.icon)}
        </span>
        <span className="truncate flex-1">
          {translateFn(item.label)}
        </span>
      </button>
      {hasChildren && (
        <ul className="space-y-1 mt-1">
          {item.children!.map((child) => (
            <MenuItemRenderer
              key={child.id}
              item={child}
              onItemClick={onItemClick}
              isRtl={isRtl}
              translateFn={translateFn}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

function MenuColumn({
  title,
  items,
  onItemClick,
  isRtl,
  translateFn,
}: MenuColumnProps) {
  return (
    <div className="w-full">
      <div className="text-[14px] font-bold text-slate-800 mb-4 px-2 text-start">
        {title}
      </div>
      {items.length > 0 && (
        <ul className="space-y-1 w-full">
          {items.map((item) => (
            <MenuItemRenderer
              key={item.id}
              item={item}
              onItemClick={onItemClick}
              isRtl={isRtl}
              translateFn={translateFn}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export function MegaMenu({ data, isOpen, onClose, triggerRef }: MegaMenuProps) {
  const navigate = useNavigate()
  const { dir } = useAppContext()
  const { t } = useTranslation(['menu', 'nav'])
  const menuRef = useRef<HTMLDivElement>(null)

  const isRtl = dir === 'rtl'

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose, triggerRef])

  if (!isOpen) return null
  if (!data || !data.columns || data.columns.length === 0) return null

  const handleItemClick = (item: MegaMenuItem) => {
    if (item.route) {
      navigate(item.route)
      onClose()
    }
  }

  const translateLabel = (label: string) => {
    const menuKey = `menu:${label}`
    const navKey = `nav:${label}`
    const menuTranslation = t(menuKey)
    const navTranslation = t(navKey)
    
    if (menuTranslation !== menuKey) {
      return menuTranslation
    }
    if (navTranslation !== navKey) {
      return navTranslation
    }
    return t(label) || label
  }

  return (
    <div
      ref={menuRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`absolute top-full ${isRtl ? 'right-0' : 'left-0'} mt-2 bg-white rounded-xl shadow-xl ring-1 ring-black/5 z-[99999] p-6 border border-slate-100`}
      style={{
        maxHeight: '500px',
        overflowY: 'auto',
        minWidth: '720px',
      }}
    >
      <div className="flex items-start w-full gap-6">
        {data.columns.map((column, index) => {
          const borderClass = index > 0 
            ? (isRtl ? 'border-r border-slate-100' : 'border-l border-slate-100') 
            : ''
          const paddingClass = index > 0 
            ? (isRtl ? 'pr-6' : 'pl-6') 
            : (isRtl ? 'pl-3' : 'pr-3')

          return (
            <div
              key={index}
              className={`flex-1 min-w-[180px] max-w-[240px] ${borderClass} ${paddingClass}`}
            >
              <MenuColumn
                title={translateLabel(column.title)}
                items={column.items || []}
                onItemClick={handleItemClick}
                isRtl={isRtl}
                translateFn={translateLabel}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}