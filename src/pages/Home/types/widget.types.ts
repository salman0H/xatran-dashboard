export type WidgetType =
  | 'stats'
  | 'substationsStats'
  | 'userProfile'
  | 'quickActions'
  | 'substationsTable'
  | 'kpi'
  | 'chart'
  | 'advancedTable'

export interface DashboardWidget {
  id: string
  type: WidgetType
  order: number
}