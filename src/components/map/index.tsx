import { MapContainer, Polygon, TileLayer, Tooltip } from 'react-leaflet'
import { Feature, NeighborHoods } from '@/@types/neighborhoods'
import styles from './styles.module.css'
import { useFetch } from '@/customHooks/useFetch'

const Map = () => {
  const { data, error, loading } = useFetch<NeighborHoods>('/api/neighborhoods')

  return (
    <>
      {error && <h1>Erro: {error}</h1>}
      {loading && <h1>Loading...</h1>}
      {data && (
        <MapContainer
          center={[-23.198917, -45.905913]}
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
                  click: () => {
                    console.log(`Polygon clicked ${feature.properties.name}`)
                  }
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
