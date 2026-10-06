import { useState, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { ChevronDown, RefreshCw, AlertCircle, Inbox } from 'lucide-react'
import { usePipelineBoard, usePipelineMeta } from '../../../hooks/usePipeline'
import { PIPELINE_STAGES, getStageConfig, pipelineBasePath } from '../../../utils/pipeline'
import PipelineCard from './PipelineCard'

export default function PipelineBoardPage() {
  const navigate = useNavigate()
  const base = pipelineBasePath()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedVertical, setSelectedVertical] = useState(searchParams.get('vertical') || '')
  const urlStage = searchParams.get('stage') || 'signal'
  const [selectedStage, setSelectedStage] = useState(
    PIPELINE_STAGES.some(s => s.key === urlStage) ? urlStage : 'signal'
  )
  const { verticals } = usePipelineMeta()
  const { data, loading, error, refresh } = usePipelineBoard(selectedVertical || undefined)

  const tabs = useMemo(() => {
    const stageData = data || {}
    return PIPELINE_STAGES.map(s => ({
      stage: s.key,
      items: stageData[s.key] || [],
    }))
  }, [data])

  const activeTab = tabs.find(t => t.stage === selectedStage) || tabs[0]
  const activeConfig = activeTab ? getStageConfig(activeTab.stage) : getStageConfig('signal')

  const syncParams = (vertical, stage) => {
    const params = {}
    if (vertical) params.vertical = vertical
    params.stage = stage
    setSearchParams(params)
  }

  const selectStage = (stage) => {
    setSelectedStage(stage)
    syncParams(selectedVertical, stage)
  }

  const changeVertical = (value) => {
    setSelectedVertical(value)
    syncParams(value, selectedStage)
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-6 text-sm text-gray-500">
        Loading pipeline board...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 p-6 text-center">
        <AlertCircle size={32} className="text-red-400" />
        <p className="text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={refresh}
          className="inline-flex items-center gap-2 rounded-xl bg-rapid-orange px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
        >
          <RefreshCw size={14} strokeWidth={2.5} />
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-screen flex-col bg-[#F5F6F8]">
      <header className="flex flex-col gap-3 p-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Pipeline Board</h1>
          <p className="mt-1 text-sm text-gray-500">Browse items stage by stage.</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={selectedVertical}
              onChange={e => changeVertical(e.target.value)}
              className="appearance-none rounded-xl border border-gray-200 bg-white pl-4 pr-9 py-2.5 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-rapid-orange/30 cursor-pointer"
            >
              <option value="">All Verticals</option>
              {verticals.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <button
            type="button"
            onClick={refresh}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={15} strokeWidth={2} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </header>

      <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-5 lg:px-6" role="tablist" aria-label="Pipeline stages">
        {tabs.map(tab => {
          const config = getStageConfig(tab.stage)
          const isActive = tab.stage === selectedStage

          return (
            <button
              key={tab.stage}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => selectStage(tab.stage)}
              className={`
                relative -mb-px flex items-center gap-2 border-b-2 px-4 py-3.5 text-sm font-semibold transition-colors
                ${isActive
                  ? 'border-rapid-orange text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700'}
              `}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${config.dot}`} aria-hidden />
              {config.label}
              <span
                className={`
                  inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-xs font-bold
                  ${isActive ? 'bg-orange-50 text-rapid-orange' : 'bg-gray-100 text-gray-500'}
                `}
              >
                {tab.items.length}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex-1 px-5 pb-6 pt-5 lg:px-6">
        {activeTab.items.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {activeTab.items.map(item => (
              <PipelineCard
                key={item.id}
                item={item}
                onClick={() => navigate(`${base}/${item.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 text-center ring-1 ring-gray-200">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full mb-4"
              style={{ backgroundColor: activeConfig.bgColor, color: activeConfig.textColor }}
            >
              <Inbox size={26} strokeWidth={1.75} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">No items in {activeConfig.label}</h3>
            <p className="mt-1 max-w-sm text-sm text-gray-500">
              There are no pipeline items in this stage yet. New items land here as they move through the pipeline.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}