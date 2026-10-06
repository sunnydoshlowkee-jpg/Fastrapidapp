import api from './api'

const pipelineService = {
  getDashboard(verticalId) {
    const params = verticalId ? { vertical_id: verticalId } : {}
    return api.get('/admin/pipeline/dashboard', { params })
  },

  getBoard(verticalId) {
    return api.get('/admin/pipeline/board', { params: { vertical_id: verticalId } })
  },

  listItems(params = {}) {
    return api.get('/admin/pipeline/items', { params })
  },

  getItem(id) {
    return api.get(`/admin/pipeline/items/${id}`)
  },

  createItem(data) {
    return api.post('/admin/pipeline/items', data)
  },

  updateItem(id, data) {
    return api.put(`/admin/pipeline/items/${id}`, data)
  },

  deleteItem(id) {
    return api.delete(`/admin/pipeline/items/${id}`)
  },

  moveStage(id, stage) {
    return api.post(`/admin/pipeline/items/${id}/stage`, { stage })
  },

  changeOwner(id, ownerId) {
    return api.post(`/admin/pipeline/items/${id}/owner`, { owner_id: ownerId })
  },

  uploadAttachment(id, file) {
    const formData = new FormData()
    formData.append('file', file)
    return api.post(`/admin/pipeline/items/${id}/attachments`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  deleteAttachment(id, attachmentId) {
    return api.delete(`/admin/pipeline/items/${id}/attachments/${attachmentId}`)
  },

  getActivity(id, params = {}) {
    return api.get(`/admin/pipeline/items/${id}/activity`, { params })
  },

  getActivityFeed(params = {}) {
    return api.get('/admin/pipeline/activity', { params })
  },

  getTeams() {
    return api.get('/admin/pipeline/teams')
  },

  createTeam(data) {
    return api.post('/admin/pipeline/teams', data)
  },

  getVerticals() {
    return api.get('/admin/pipeline/verticals')
  },

  getStaff() {
    return api.get('/admin/pipeline/staff')
  },

  getVisionMission() {
    return api.get('/admin/vision-mission')
  },

  updateVisionMission(type, content) {
    return api.put(`/admin/vision-mission/${type}`, { content })
  },

  getVisionMissionHistory(type) {
    return api.get(`/admin/vision-mission/${type}/history`)
  },
}

export default pipelineService
