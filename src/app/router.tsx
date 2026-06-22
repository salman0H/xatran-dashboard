import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { HomePage } from '@/pages/Home/HomePage'

// کامپوننت‌های موقت برای صفحه‌های جدید
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8 text-center">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="text-gray-500 mt-4">این صفحه در حال ساخت است...</p>
  </div>
)

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/assets/manufacturer" element={<PlaceholderPage title="سازنده" />} />
          <Route path="/assets/manufacturer/specs" element={<PlaceholderPage title="مشخصات سازنده" />} />
          <Route path="/assets/manufacturer/attributes" element={<PlaceholderPage title="ویژگی‌های سازنده" />} />
          <Route path="/assets/operator" element={<PlaceholderPage title="بهره‌بردار" />} />
          <Route path="/assets/operator/specs" element={<PlaceholderPage title="مشخصات بهره‌بردار" />} />
          <Route path="/assets/operator/attributes" element={<PlaceholderPage title="ویژگی‌های بهره‌بردار" />} />
          <Route path="/assets/attributes" element={<PlaceholderPage title="صفات" />} />
          <Route path="/assets/attributes/specs" element={<PlaceholderPage title="مشخصات صفات" />} />
          <Route path="/assets/attributes/attributes" element={<PlaceholderPage title="ویژگی‌های صفات" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}