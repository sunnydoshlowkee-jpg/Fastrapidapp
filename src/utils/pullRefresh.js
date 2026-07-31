/**
 * Soft-refresh the current app surface after a pull gesture.
 * Remounts the active route tree via a key bump and notifies listeners.
 */
export function createPullRefreshHandler(setRefreshKey) {
  return async function handlePullRefresh() {
    window.dispatchEvent(new CustomEvent('rapid:pull-refresh'))
    setRefreshKey((key) => key + 1)
    // Brief pause so the spinner is visible and remounted fetches can start.
    await new Promise((resolve) => window.setTimeout(resolve, 450))
  }
}
