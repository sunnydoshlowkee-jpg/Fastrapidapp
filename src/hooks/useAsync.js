import { useState, useCallback } from 'react'

export function useAsync(asyncFn) {
  const [state, setState] = useState({ data: null, loading: false, error: null })

  const run = useCallback(async (...args) => {
    setState({ data: null, loading: true, error: null })
    try {
      const res = await asyncFn(...args)
      setState({ data: res.data, loading: false, error: null })
      return res.data
    } catch (err) {
      setState({ data: null, loading: false, error: err?.response?.data?.message || 'Something went wrong' })
      throw err
    }
  }, [asyncFn])

  return { ...state, run }
}
