import { Card } from 'antd'
import { Line } from '@ant-design/charts'
import { useTranslation } from 'react-i18next'

interface ChartWidgetProps {
  data?: Array<{ year: string; value: number }>
}

const defaultData = [
  { year: '1398', value: 3 },
  { year: '1399', value: 4 },
  { year: '1400', value: 3.5 },
  { year: '1401', value: 5 },
  { year: '1402', value: 4.9 },
  { year: '1403', value: 6 },
  { year: '1404', value: 7 },
]

export function ChartWidget({ data = defaultData }: ChartWidgetProps) {
  const { t } = useTranslation('dashboard')

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    point: { shapeField: 'square', sizeField: 4 },
    interaction: { tooltip: { marker: false } },
    style: { lineWidth: 2 },
    colorField: '#1677ff',
    legend: false,
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  }

  return (
    <Card
      variant="borderless"
      className="shadow-sm hover:shadow-md transition-shadow"
      title={t('chartTitle')}
    >
      <Line {...config} height={250} />
    </Card>
  )
}