import { MapContainer, Polygon, TileLayer } from 'react-leaflet'
import { Feature, NeighborHoods } from '@/@types/neighborhoods'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Map = () => {
  const [mapInfo, setMapInfo] = useState<NeighborHoods>()

  useEffect(() => {
    const localStorageNeighborhoods =
      window.localStorage.getItem('@neighborhoods')

    if (localStorageNeighborhoods) {
      const resParsed = JSON.parse(localStorageNeighborhoods)
      setMapInfo(resParsed)
    } else {
      axios
        .post('/api/neighborhoods', {
          API_SECRET: `${process.env.NEXT_PUBLIC_API_SECRET}`
        })
        .then((res) => {
          window.localStorage.setItem('@neighborhoods', res.data)
          const resParsed = JSON.parse(res.data)
          setMapInfo(resParsed)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  return (
    <>
      {!mapInfo ? (
        <h1>Loading...</h1>
      ) : (
        <MapContainer
          center={[-23.198917, -45.905913]}
          zoom={14}
          style={{ width: '100%', height: '100%' }}
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
              />
            )
          })}
        </MapContainer>
      )}
    </>
  )
}

export default Map
