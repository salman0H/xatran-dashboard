import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { HomePage } from '@/pages/Home/HomePage'
import { ManufacturerPage } from '@/pages/Manufacturer/ManufacturerPage'


export function AppRouter() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/manufacturer" element={<ManufacturerPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}