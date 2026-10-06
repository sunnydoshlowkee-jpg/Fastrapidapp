import { useState } from 'react'
import pipelineService from '../../../services/adminPipelineService'

export default function VisionMissionModal({ type, content, onClose, onSaved }) {
  const [value, setValue] = useState(content || '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState(null)
  const [showHistory, setShowHistory] = useState(false)

  const handleSave = async () => {
    if (!value.trim()) return
    try {
      setSaving(true)
      setError(null)
      await pipelineService.updateVisionMission(type, value.trim())
      onSaved()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const loadHistory = async () => {
    if (showHistory) {
      setShowHistory(false)
      return
    }
    try {
      const res = await pipelineService.getVisionMissionHistory(type)
      setHistory(res.data.data)
      setShowHistory(true)
    } catch {
      // silent
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            Edit {type}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-rapid-orange focus:ring-2 focus:ring-rapid-orange/20 outline-none resize-none"
          placeholder={`Enter the company ${type}...`}
        />

        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={loadHistory}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            {showHistory ? 'Hide history' : 'View change history'}
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !value.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-rapid-orange rounded-xl hover:bg-orange-600 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {showHistory && history && (
          <div className="mt-4 border-t pt-4 max-h-60 overflow-y-auto">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Change History</h4>
            {history.length === 0 ? (
              <p className="text-sm text-gray-500">No changes recorded yet.</p>
            ) : (
              <div className="space-y-3">
                {history.map((h) => (
                  <div key={h.id} className="text-xs bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-700">{h.user}</span>
                      <span className="text-gray-400">{h.created_at ? new Date(h.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}</span>
                    </div>
                    {h.previous_content && (
                      <p className="text-red-600 line-through mt-1">{h.previous_content.substring(0, 100)}{h.previous_content.length > 100 ? '...' : ''}</p>
                    )}
                    <p className="text-emerald-700 mt-1">{h.new_content.substring(0, 100)}{h.new_content.length > 100 ? '...' : ''}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
