// plan/14: "Color coding: Green (on track) | Amber (attention) | Red (urgent)"
const STYLES = {
  on_track: { label: 'On Track', className: 'bg-status-onTrack/10 text-status-onTrack' },
  needs_attention: { label: 'Needs Attention', className: 'bg-status-attention/10 text-status-attention' },
  flagged: { label: 'Flagged', className: 'bg-status-flagged/10 text-status-flagged' },
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] ?? STYLES.on_track;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style.className}`}>
      {style.label}
    </span>
  );
}
