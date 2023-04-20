import axios from 'axios'
import { useEffect, useState } from 'react'

export const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<undefined | T>(undefined)
  const [error, setError] = useState<false | string>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    try {
      setLoading(true)
      axios
        .post(url, {
          API_SECRET: `${process.env.NEXT_PUBLIC_API_SECRET}`
        })
        .then((res) => {
          const resParsed = JSON.parse(res.data)
          setData(resParsed)
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
  }, [url])

  return { data, error, loading }
}
