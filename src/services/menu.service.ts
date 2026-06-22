import { apiService } from './api.service'

export interface MenuItem {
  id: string
  label: string
  icon?: string
  route?: string
  children?: MenuItem[]
}

export interface MenuSection {
  id: string
  label: string
  items: MenuItem[]
}

export interface MenuData {
  menus: MenuSection[]
}

export async function fetchMenuData(): Promise<MenuData> {
  return apiService.get<MenuData>('/menus')
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
  const data = await fetchMenuData()
  return data.menus.flatMap((section) => section.items)
}