export interface Manufacturer {
  id: string
  name: string
  brand: string
  website: string
  phone: string
  address?: string
}

export interface Model {
  id: string
  name: string
  description: string
  releaseDate: string
  status: 'active' | 'inactive'
}

export interface Series {
  id: string
  name: string
  code: string
  description: string
  status: 'active' | 'inactive'
}

export type ActiveTab = 'manufacturers' | 'models' | 'series'