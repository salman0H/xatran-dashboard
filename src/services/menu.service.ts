// src/services/menu.service.ts
import { apiService } from './api.service'

export interface MegaMenuItem {
  id: string
  label: string
  icon?: string
  route?: string
  children?: MegaMenuItem[]
}

export interface MegaMenuColumn {
  id: string
  title: string
  items: MegaMenuItem[]
}

export interface MegaMenuData {
  columns: MegaMenuColumn[]
}

export async function fetchMegaMenu(): Promise<MegaMenuData> {
  return apiService.get<MegaMenuData>('/megaMenu')
}