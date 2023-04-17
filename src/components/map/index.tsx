import { MapContainer, Polygon, TileLayer } from 'react-leaflet'
import BairrosFakeApi from '../../fake-bairros-api.json'

const Map = () => {
  return (
    <MapContainer
      center={[-23.198917, -45.905913]}
      zoom={14}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {BairrosFakeApi.features.map((bairro) => {
        const myCoordinates: any = bairro.geometry.coordinates
          .flat(2)
          .map((latLong) => latLong.reverse())
        // eslint-disable-next-line react/jsx-key
        return <Polygon positions={myCoordinates} />
      })}
    </MapContainer>
  )
}

export default Map
