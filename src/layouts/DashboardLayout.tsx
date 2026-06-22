import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { TopBar } from '@/components/features/TopBar/TopBar'
import { useDirection } from '@/hooks/useDirection'
import { useAppContext } from '@/context/AppContext'
import { ConfigProvider } from 'antd'

function PageLoadingFallback() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
    </div>
  )
}

export function DashboardLayout() {
  useDirection()
  const { dir } = useAppContext()

  return (
    <ConfigProvider direction={dir}>
      <div
        dir={dir}
        className={`flex flex-col h-screen bg-gray-50 ${dir === 'rtl' ? 'font-rtl' : ''}`}
      >
        <TopBar />
        <main className="flex-1 min-h-0 overflow-y-auto p-6">
          <Suspense fallback={<PageLoadingFallback />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </ConfigProvider>
  )
}