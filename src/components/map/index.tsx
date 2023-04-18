import { MapContainer, Polygon, TileLayer } from 'react-leaflet'
import BairrosFakeApi from '@/fake-bairros-api.json'
import { useEffect } from 'react'

const Map = () => {
  useEffect(() => {
    fetch(location.origin + '/api/neighborhoods', {
      method: 'GET'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err))
  }, [])
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

        return (
          // eslint-disable-next-line react/jsx-key
          <Polygon
            positions={myCoordinates}
            eventHandlers={{
              click: () => {
                console.log(`Polygon clicked ${bairro.properties.name}`)
              }
            }}
          />
        )
      })}
    </MapContainer>
  )
}

export default Map
