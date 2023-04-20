import { PopulationByNeighborHoods } from '@/@types/populationByNeighborhoods'
import { useFetch } from '@/customHooks/useFetch'
import Highcharts from 'highcharts'
import { HighchartsReact } from 'highcharts-react-official'
import { ChartData, optionsChart } from './optionsChart'
import { useEffect, useState } from 'react'
import { Properties } from '@/components/map'
import { Wrapper } from './style'

type Props = {
  properties: Properties | undefined
}

export const ChartPopulationInfo = ({ properties }: Props) => {
  const { data, loading, error } = useFetch<PopulationByNeighborHoods>(
    '/api/populationByNeighborhood'
  )
  const [dataForChart, setDataForChart] = useState<ChartData>()

  useEffect(() => {
    if (data && properties) {
      const assetsForChart = data
        .filter((element) => element.id_geometria === properties.id)
        .map((element) => ({
          name: `${element.ano}`,
          y: element.populacao,
          drilldown: `${element.id_geometria}`
        }))
      const dataHighchartFormated = optionsChart(assetsForChart)
      setDataForChart(dataHighchartFormated)
    }
  }, [data, properties])

  return (
    <Wrapper>
      <h1>Bairro: {properties?.name}</h1>
      {error && <h1>{error}</h1>}
      {loading && <h1>Carregando...</h1>}
      <HighchartsReact highcharts={Highcharts} options={dataForChart} />
    </Wrapper>
  )
}
