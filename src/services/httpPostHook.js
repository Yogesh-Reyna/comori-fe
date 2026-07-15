import { useState, useEffect, useCallback, useRef } from 'react'
import { request } from './api'

function useHttpPost(url, options = {}) {
  const { headers } = options

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)

  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  const execute = useCallback(
    async (body) => {
      if (!url) {
        return null
      }

      if (isMountedRef.current) {
        setLoading(true)
        setError(null)
        setResponse(null)
      }

      try {
        const result = await request({
          url,
          method: 'POST',
          body,
          headers,
        })

        if (isMountedRef.current) {
          setResponse(result)
        }

        return result
      } catch (err) {
        if (isMountedRef.current) {
          setError(err)
        }

        throw err
      } finally {
        if (isMountedRef.current) {
          setLoading(false)
        }
      }
    },
    [url, headers],
  )

  return {
    execute,
    loading,
    error,
    response,
  }
}

export default useHttpPost
