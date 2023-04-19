import { MapContainer, Polygon, TileLayer, Tooltip } from 'react-leaflet'
import { useFetchNeighborhoods } from '@/customHooks/useFetchNeighborhoods'
import { Feature } from '@/@types/neighborhoods'
import styles from './styles.module.css'

const Map = () => {
  const { mapInfo, error, loading } = useFetchNeighborhoods()

  return (
    <>
      {error && <h1>Erro: {error}</h1>}
      {loading && <h1>Loading...</h1>}
      {mapInfo && (
        <MapContainer
          center={[-23.198917, -45.905913]}
          zoom={14}
          className={styles.map}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {mapInfo.features.map((feature: Feature) => {
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
