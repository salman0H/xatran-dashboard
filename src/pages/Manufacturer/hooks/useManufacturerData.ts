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
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])
  const [models, setModels] = useState<Model[]>([])
  const [series, setSeries] = useState<Series[]>([])
  const [loading, setLoading] = useState(true)

  const loadAllData = useCallback(async () => {
    setLoading(true)
    try {
      const [manufData, modelData, seriesData] = await Promise.all([
        fetchManufacturers(),
        fetchModels(),
        fetchSeries(),
      ])
      setManufacturers(manufData)
      setModels(modelData)
      setSeries(seriesData)
    } catch (error) {
      message.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [message])

  useEffect(() => {
    loadAllData()
  }, [loadAllData])

  const getDataForTab = useCallback(() => {
    if (activeTab === 'manufacturers') return manufacturers
    if (activeTab === 'models') return models
    return series
  }, [activeTab, manufacturers, models, series])

  const addItem = useCallback(
    async (values: any) => {
      try {
        let newItem
        if (activeTab === 'manufacturers') {
          newItem = await addManufacturer(values)
          setManufacturers((prev) => [...prev, newItem])
        } else if (activeTab === 'models') {
          newItem = await addModel(values)
          setModels((prev) => [...prev, newItem])
        } else {
          newItem = await addSeries(values)
          setSeries((prev) => [...prev, newItem])
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

  const stats = {
    manufacturers: manufacturers.length,
    models: models.length,
    series: series.length,
  }

  return {
    activeTab,
    setActiveTab,
    data: getDataForTab(),
    loading,
    stats,
    addItem,
    refetch: loadAllData,
  }
}