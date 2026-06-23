import { apiService } from '@/services/api.service'
import type { Manufacturer, Model, Series } from '../types/manufacturer.types'

export const fetchManufacturers = (): Promise<Manufacturer[]> =>
  apiService.get<Manufacturer[]>('/manufacturers')

export const addManufacturer = (data: Omit<Manufacturer, 'id'>): Promise<Manufacturer> =>
  apiService.post<Manufacturer>('/manufacturers', data)

export const fetchModels = (): Promise<Model[]> =>
  apiService.get<Model[]>('/models')

export const addModel = (data: Omit<Model, 'id'>): Promise<Model> =>
  apiService.post<Model>('/models', data)

export const fetchSeries = (): Promise<Series[]> =>
  apiService.get<Series[]>('/series')

export const addSeries = (data: Omit<Series, 'id'>): Promise<Series> =>
  apiService.post<Series>('/series', data)