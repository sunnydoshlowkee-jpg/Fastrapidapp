import { useState, useEffect, useCallback } from 'react'
import pipelineService from '../services/adminPipelineService'

export function usePipelineDashboard(verticalId) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await pipelineService.getDashboard(verticalId)
      setData(res.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard')
    } finally {
      setLoading(false)
    }
  }, [verticalId])

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, refresh: fetch }
}

export function usePipelineBoard(verticalId) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await pipelineService.getBoard(verticalId)
      setData(res.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load board')
    } finally {
      setLoading(false)
    }
  }, [verticalId])

  useEffect(() => { fetch() }, [fetch])

  return { data, loading, error, refresh: fetch }
}

export function usePipelineItems(filters = {}) {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await pipelineService.listItems(filters)
      setItems(res.data.data)
      setPagination(res.data.pagination)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load items')
    } finally {
      setLoading(false)
    }
  }, [JSON.stringify(filters)])

  useEffect(() => { fetch() }, [fetch])

  return { items, pagination, loading, error, refresh: fetch }
}

export function usePipelineItem(id) {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    if (!id) return
    try {
      setLoading(true)
      setError(null)
      const res = await pipelineService.getItem(id)
      setItem(res.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load item')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => { fetch() }, [fetch])

  const apply = useCallback((fn) => async (...args) => {
    const res = await fn(...args)
    const data = res?.data?.data
    if (data && data.id) setItem(data)
    return res
  }, [])

  const moveStage = useCallback((itemId, stage) =>
    apply(pipelineService.moveStage)(itemId, stage), [apply])

  const deleteItem = useCallback((itemId) =>
    pipelineService.deleteItem(itemId).then(() => setItem(null)), [])

  const uploadAttachment = useCallback((itemId, file) => apply(async (i, f) => {
    await pipelineService.uploadAttachment(i, f)
    return pipelineService.getItem(i)
  })(itemId, file), [apply])

  const deleteAttachment = useCallback((itemId, attachmentId) => apply(async (i, a) => {
    await pipelineService.deleteAttachment(i, a)
    return pipelineService.getItem(i)
  })(itemId, attachmentId), [apply])

  const changeOwner = useCallback((itemId, ownerId) =>
    apply(pipelineService.changeOwner)(itemId, ownerId), [apply])

  const assignTeams = useCallback((itemId, teamIds) =>
    apply(pipelineService.updateItem)(itemId, { team_ids: teamIds }), [apply])

  return {
    item, loading, error, refresh: fetch,
    moveStage, deleteItem, uploadAttachment, deleteAttachment, changeOwner, assignTeams,
  }
}

export function usePipelineMeta() {
  const [verticals, setVerticals] = useState([])
  const [teams, setTeams] = useState([])
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [v, t, s] = await Promise.all([
          pipelineService.getVerticals(),
          pipelineService.getTeams(),
          pipelineService.getStaff(),
        ])
        setVerticals(v.data.data)
        setTeams(t.data.data)
        setStaff(s.data.data)
      } catch {
        // silent
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { verticals, teams, staff, loading }
}
