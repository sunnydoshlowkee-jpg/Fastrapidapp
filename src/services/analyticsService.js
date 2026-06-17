import api from './api'

/**
 * Track a user interaction
 * @param {string} interactionType - e.g., 'search', 'view_merchant', 'view_product', 'add_to_cart', 'purchase'
 * @param {string} [entityType] - e.g., 'merchant', 'product', 'category'
 * @param {number|string} [entityId] - The ID of the viewed/purchased item
 * @param {Object} [metadata] - Additional JSON metadata (e.g., search query, location)
 */
export const trackEvent = (interactionType, entityType = null, entityId = null, metadata = null) => {
  const sessionId = localStorage.getItem('analytics_session_id') || generateSessionId()
  
  if (!localStorage.getItem('analytics_session_id')) {
    localStorage.setItem('analytics_session_id', sessionId)
  }

  // We intentionally do not await or handle errors loudly to keep tracking lightweight
  api.post('/analytics/track', {
    interaction_type: interactionType,
    entity_type: entityType,
    entity_id: entityId,
    metadata,
    session_id: sessionId,
  }).catch(err => {
    console.debug('Analytics tracking failed', err)
  })
}

const generateSessionId = () => {
  return 'sess_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
