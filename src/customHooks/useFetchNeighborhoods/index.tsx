import axios from 'axios'
import { useEffect, useState } from 'react'
import { NeighborHoods } from '@/@types/neighborhoods'

export const useFetchNeighborhoods = () => {
  const [mapInfo, setMapInfo] = useState<undefined | NeighborHoods>(undefined)
  const [error, setError] = useState<boolean | string>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    try {
      setLoading(true)
      axios
        .post('/api/neighborhoods', {
          API_SECRET: `${process.env.NEXT_PUBLIC_API_SECRET}`
        })
        .then((res) => {
          const resParsed = JSON.parse(res.data)
          setMapInfo(resParsed)
        })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`${error.message}`)
      } else {
        setError(`Error: ${error}`)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  return { mapInfo, error, loading }
}
