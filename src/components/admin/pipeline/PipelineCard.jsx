import { User, Users, FileText } from 'lucide-react';
import { getTypeConfig, timeAgo } from '../../../utils/pipeline';

const TYPE_BORDER_COLORS = {
  signal: 'border-l-amber-400',
  diagnosis: 'border-l-blue-400',
  solution: 'border-l-emerald-400',
  shipped: 'border-l-purple-400',
};

export default function PipelineCard({ item, onClick }) {
  const typeConfig = getTypeConfig(item.type);
  const teams = item.teams || [];
  const visibleTeams = teams.slice(0, 2);
  const extraCount = teams.length - visibleTeams.length;
  const owner = item.owner || {};
  const attachmentCount = item.attachment_count || (item.attachments || []).length;

  const borderClass = TYPE_BORDER_COLORS[item.type] || 'border-l-gray-300';

  return (
    <button
      type="button"
      onClick={() => onClick?.(item)}
      className={`
        w-full text-left rounded-xl bg-white shadow-sm ring-1 ring-gray-200
        border-l-4 ${borderClass}
        p-4 transition-all duration-150
        hover:shadow-md hover:ring-gray-300
        focus:outline-none focus:ring-2 focus:ring-rapid-orange/40
      `}
    >
      {/* Title */}
      <p
        className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2"
        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
      >
        {item.title}
      </p>

      {/* Type Badge */}
      <span
        className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium mb-2"
        style={{
          backgroundColor: typeConfig.bgColor,
          color: typeConfig.textColor,
        }}
      >
        {typeConfig.label}
      </span>

      {/* Description */}
      {item.description && (
        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
          {item.description}
        </p>
      )}

      {/* Teams */}
      {teams.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {visibleTeams.map((team) => (
            <span
              key={team.id}
              className="inline-flex items-center gap-1 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-700"
            >
              <Users className="h-2.5 w-2.5" />
              {team.name}
            </span>
          ))}
          {extraCount > 0 && (
            <span className="text-[10px] text-gray-400 font-medium">
              +{extraCount} more
            </span>
          )}
        </div>
      )}

      {/* Footer: Owner + Attachments + Date */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1.5 min-w-0">
          <User className="h-3 w-3 text-gray-400 shrink-0" />
          <span className="text-[11px] text-gray-500 truncate">
            {owner.name || 'Unassigned'}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {attachmentCount > 0 && (
            <span className="inline-flex items-center gap-1 text-[10px] text-gray-400">
              <FileText className="h-3 w-3" />
              {attachmentCount}
            </span>
          )}
          {item.created_at && (
            <span className="text-[10px] text-gray-400">
              {timeAgo(item.created_at)}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}