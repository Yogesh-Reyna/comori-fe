import { useState, useEffect, useCallback, useRef } from 'react'
import { request } from './api'

function useFetch(url, options = {}) {
  const { method = 'GET', body, headers, enabled = true } = options

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(Boolean(enabled && url))
  const [error, setError] = useState(null)

  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  const refetch = useCallback(async () => {
    if (!url) {
      return null
    }

    if (isMountedRef.current) {
      setLoading(true)
      setError(null)
    }

    try {
      const result = await request({ url, method, body, headers })

      if (isMountedRef.current) {
        setData(result)
      }

      return result
    } catch (err) {
      if (isMountedRef.current) {
        setError(err)
      }

      return null
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [url, method, body, headers])

  useEffect(() => {
    if (enabled && url) {
      refetch()
    }
  }, [enabled, url, refetch])

  return {
    data,
    loading,
    error,
    refetch,
  }
}

export default useFetch
