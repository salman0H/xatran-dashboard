import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '@/context/AppContext'
import type { MenuItem } from '@/services/menu.service'
import { useTranslation } from 'react-i18next'

interface MegaMenuProps {
  item: MenuItem
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement>
}

export function MegaMenu({ item, isOpen, onClose, triggerRef }: MegaMenuProps) {
  const navigate = useNavigate()
  const { dir } = useAppContext()
  const { t } = useTranslation(['menu', 'nav'])
  const menuRef = useRef<HTMLDivElement>(null)
  const [selectedLevel1, setSelectedLevel1] = useState<string | null>(null)
  const [selectedLevel2, setSelectedLevel2] = useState<string | null>(null)

  const isRtl = dir === 'rtl'

  useEffect(() => {
    if (!isOpen) {
      setSelectedLevel1(null)
      setSelectedLevel2(null)
    }
  }, [isOpen])

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

  // اگر آیتم دارای children نباشد، چیزی نمایش نده
  if (!item.children || item.children.length === 0) {
    return null
  }

  const level1Items = item.children
  const level2Items = level1Items.find((i) => i.id === selectedLevel1)?.children || []
  const level3Items = level2Items.find((i) => i.id === selectedLevel2)?.children || []

  const handleLevel1Click = (id: string) => {
    setSelectedLevel1(selectedLevel1 === id ? null : id)
    setSelectedLevel2(null)
  }

  const handleLevel2Click = (id: string) => {
    setSelectedLevel2(selectedLevel2 === id ? null : id)
  }

  const handleLevel3Click = (item: MenuItem) => {
    if (item.route) {
      navigate(item.route)
      onClose()
    }
  }

  // ترجمه label با fallback
  const translateLabel = (label: string) => {
    // سعی می‌کنیم از namespace های مختلف ترجمه کنیم
    const translation = t(`menu:${label}`) || t(`nav:${label}`) || label
    return translation
  }

  return (
    <div
      ref={menuRef}
      className={`absolute top-full ${isRtl ? 'right-0' : 'left-0'} mt-1 min-w-[750px] max-w-[900px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-5`}
      style={{ minHeight: '320px', maxHeight: '520px' }}
    >
      <div className="flex gap-4 h-full">
        {/* ستون اول */}
        <div className="flex-1 min-w-[160px]">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2 border-b border-gray-100 pb-2">
            {translateLabel('assets')}
          </div>
          <ul className="space-y-0.5 max-h-[400px] overflow-y-auto pr-1">
            {level1Items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleLevel1Click(item.id)}
                  className={`w-full text-right px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between ${
                    selectedLevel1 === item.id
                      ? 'bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{translateLabel(item.label)}</span>
                  {item.children && item.children.length > 0 && (
                    <span className="text-xs text-gray-400">{isRtl ? '◀' : '▶'}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ستون دوم */}
        <div className="flex-1 min-w-[160px] border-r border-gray-100 pr-3">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2 border-b border-gray-100 pb-2">
            {selectedLevel1 ? translateLabel('basicInfo') : translateLabel('selectCategory')}
          </div>
          {selectedLevel1 ? (
            <ul className="space-y-0.5 max-h-[400px] overflow-y-auto pr-1">
              {level2Items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleLevel2Click(item.id)}
                    className={`w-full text-right px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between ${
                      selectedLevel2 === item.id
                        ? 'bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-200'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{translateLabel(item.label)}</span>
                    {item.children && item.children.length > 0 && (
                      <span className="text-xs text-gray-400">{isRtl ? '◀' : '▶'}</span>
                    )}
                  </button>
                </li>
              ))}
              {level2Items.length === 0 && (
                <div className="text-sm text-gray-400 py-4 text-center">{translateLabel('noItems')}</div>
              )}
            </ul>
          ) : (
            <div className="text-sm text-gray-400 py-4 text-center">{translateLabel('selectCategory')}</div>
          )}
        </div>

        {/* ستون سوم */}
        <div className="flex-[2] min-w-[200px] pl-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2 border-b border-gray-100 pb-2">
            {selectedLevel2 ? translateLabel('details') : translateLabel('selectSubcategory')}
          </div>
          {selectedLevel2 ? (
            <ul className="space-y-0.5 max-h-[400px] overflow-y-auto pr-1">
              {level3Items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleLevel3Click(item)}
                    className="w-full text-right px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all flex items-center justify-between"
                  >
                    <span>{translateLabel(item.label)}</span>
                    {item.route && (
                      <span className="text-xs text-gray-400">→</span>
                    )}
                  </button>
                </li>
              ))}
              {level3Items.length === 0 && (
                <div className="text-sm text-gray-400 py-4 text-center">{translateLabel('noItems')}</div>
              )}
            </ul>
          ) : (
            <div className="text-sm text-gray-400 py-4 text-center">{translateLabel('selectSubcategory')}</div>
          )}
        </div>
      </div>
    </div>
  )
}