// src/pages/Manufacturer/hooks/useManufacturerData.ts
import { useState, useCallback, useEffect } from 'react'
import { App } from 'antd'
import {
  fetchManufacturers,
  addManufacturer,
  fetchModels,
  addModel,
  fetchSeries,
  addSeries,
} from '../services/manufacturer.service'
import type { Manufacturer, Model, Series, ActiveTab } from '../types/manufacturer.types'

export function useManufacturerData() {
  const { message } = App.useApp()
  const [activeTab, setActiveTab] = useState<ActiveTab>('manufacturers')
  const [data, setData] = useState<Manufacturer[] | Model[] | Series[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ manufacturers: 0, models: 0, series: 0 })

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      if (activeTab === 'manufacturers') {
        const items = await fetchManufacturers()
        setData(items)
        setStats((prev) => ({ ...prev, manufacturers: items.length }))
      } else if (activeTab === 'models') {
        const items = await fetchModels()
        setData(items)
        setStats((prev) => ({ ...prev, models: items.length }))
      } else {
        const items = await fetchSeries()
        setData(items)
        setStats((prev) => ({ ...prev, series: items.length }))
      }
    } catch (error) {
      message.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [activeTab, message])

  useEffect(() => {
    loadData()
  }, [loadData])

  const addItem = useCallback(
    async (values: any) => {
      try {
        let newItem
        if (activeTab === 'manufacturers') {
          newItem = await addManufacturer(values)
        } else if (activeTab === 'models') {
          newItem = await addModel(values)
        } else {
          newItem = await addSeries(values)
        }
        setData((prev) => [...prev, newItem])
        if (activeTab === 'manufacturers') {
          setStats((prev) => ({ ...prev, manufacturers: prev.manufacturers + 1 }))
        } else if (activeTab === 'models') {
          setStats((prev) => ({ ...prev, models: prev.models + 1 }))
        } else {
          setStats((prev) => ({ ...prev, series: prev.series + 1 }))
        }
        message.success('Item added successfully')
        return newItem
      } catch (error) {
        message.error('Failed to add item')
        throw error
      }
    },
    [activeTab, message]
  )

  return {
    activeTab,
    setActiveTab,
    data,
    loading,
    stats,
    addItem,
    refetch: loadData,
  }
}