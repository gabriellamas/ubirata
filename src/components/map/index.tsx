import { MapContainer, Polygon, TileLayer, Tooltip } from 'react-leaflet'
import { Feature, NeighborHoods } from '@/@types/neighborhoods'
import styles from './styles.module.css'
import { useFetch } from '@/customHooks/useFetch'

export type Properties = {
  id: number
  name: string
  setor: string
  zona: string
}

interface Props {
  HandleSelectNeighborhood: (properties: Properties) => void
}

const Map = ({ HandleSelectNeighborhood }: Props) => {
  const { data, error, loading } = useFetch<NeighborHoods>('/api/neighborhoods')

  return (
    <>
      {error && <h1>Erro: {error}</h1>}
      {loading && <h1>Loading...</h1>}
      {data && (
        <MapContainer
          center={[-23.220517227332461, -45.916854913518947]}
          zoom={14}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data.features.map((feature: Feature) => {
            const myCoordinates = feature.geometry.coordinates
              .flat(2)
              .map((coordinate) => coordinate.reverse())

            return (
              <Polygon
                key={feature.properties.id}
                positions={myCoordinates}
                eventHandlers={{
                  click: () => HandleSelectNeighborhood(feature.properties)
                }}
              >
                <Tooltip sticky>
                  <span className={styles.tooltipText}>
                    {feature.properties.name}
                  </span>
                </Tooltip>
              </Polygon>
            )
          })}
        </MapContainer>
      )}
    </>
  )
}

export default Map
