interface ProjectMockupProps {
  variant: 'myqassist' | 'paddock' | 'football' | 'workflow'
  compact?: boolean
}

export default function ProjectMockup({ variant, compact = false }: ProjectMockupProps) {
  if (variant === 'myqassist') {
    return (
      <div className={`${compact ? 'min-h-0' : 'min-h-[190px]'} h-full w-full min-w-0 max-w-full overflow-hidden rounded-lg bg-panel-inverse text-copy-inverse shadow-2xl`}>
        <div className="flex h-full min-w-0">
          <aside className={`${compact ? 'w-20 p-2 sm:w-24' : 'w-24 p-3 sm:w-28'} shrink-0 border-r border-black/10 bg-panel-inverse-muted`}>
            <div className={`${compact ? 'mb-3 text-[8px]' : 'mb-5 text-[10px]'} flex items-center gap-2 font-semibold`}>
              <span className="h-2 w-2 rounded-full bg-brand-400" />
              MyQAssist
            </div>
            {['Tableau', 'Docs', 'Exigences', 'Cas test', 'Exports'].map((item, index) => (
              <div
                key={item}
                className={`${compact ? 'mb-1.5 px-1.5 py-1 text-[7px]' : 'mb-2 px-2 py-1.5 text-[8px]'} rounded ${
                  index === 0 ? 'bg-black/7 text-black' : 'text-black/55'
                }`}
              >
                {item}
              </div>
            ))}
          </aside>
          <div className={`${compact ? 'p-3' : 'p-4'} min-w-0 flex-1`}>
            <div className={`${compact ? 'mb-3' : 'mb-4'} flex items-center justify-between`}>
              <h3 className={`${compact ? 'text-[11px]' : 'text-[13px]'} font-semibold`}>Exigences générées</h3>
                <span className="rounded-full bg-status-live-bg px-2 py-1 text-[8px] text-status-live-text">
                Valide
              </span>
            </div>
            <div className={`${compact ? 'mb-3 gap-1.5' : 'mb-4 gap-2'} grid grid-cols-3`}>
              {['12 docs', '842 exigences', '78% couverture'].map((item) => (
                <div key={item} className={`${compact ? 'p-1.5 text-[7px]' : 'p-2 text-[8px] sm:text-[9px]'} min-w-0 rounded-md border border-black/10 bg-white`}>
                  {item}
                </div>
              ))}
            </div>
            <div className={compact ? 'space-y-1.5' : 'space-y-2'}>
              {['REQ-001 Import PDF', 'REQ-002 Extraction texte', 'REQ-003 Cas de test'].map(
                (item, index) => (
                  <div
                    key={item}
                    className={`${compact ? 'px-2 py-1.5 text-[7px]' : 'px-3 py-2 text-[9px]'} flex min-w-0 items-center justify-between gap-2 rounded-md border border-black/10 bg-white`}
                  >
                    <span className="truncate">{item}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[7px] ${
                        index === 0
                          ? 'bg-status-live-bg text-status-live-text'
                          : 'bg-status-progress-bg text-status-progress-text'
                      }`}
                    >
                      {index === 0 ? 'Validée' : 'Moyenne'}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'paddock') {
    return (
      <div className={`${compact ? 'min-h-0' : 'min-h-[170px]'} h-full w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-line bg-canvas p-4`}>
        <div className="mb-4 flex items-center justify-between text-[9px] text-copy-faint">
          <span>King of Paddock</span>
          <span>Fantasy F1</span>
        </div>
        <div className="grid h-24 grid-cols-3 gap-2">
          {['P1', 'P2', 'P3'].map((label, index) => (
            <div
              key={label}
              className="rounded-md border border-brand-400/30 bg-gradient-to-br from-panel-muted to-canvas p-2"
            >
              <div className="mb-2 h-8 rounded bg-brand-400/20" />
              <div className="text-lg font-semibold text-copy">{index + 1}</div>
              <div className="text-[8px] text-copy-faint">{label} pilote</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'football') {
    return (
      <div className={`${compact ? 'min-h-0' : 'min-h-[170px]'} h-full w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-line bg-canvas p-4`}>
        <div className="mb-4 flex items-center justify-between text-[9px] text-copy-faint">
          <span>Collection</span>
          <span>Equipe</span>
        </div>
        <div className="flex gap-3">
          {['36', '84', '72'].map((score, index) => (
            <div
              key={score}
              className="h-28 flex-1 rounded-md border border-brand-400/40 bg-gradient-to-b from-brand-700/25 to-canvas p-2"
            >
              <div className="mb-7 text-xs font-semibold text-brand-300">{score}</div>
              <div className="h-6 rounded bg-white/12" />
              <div className="mt-2 text-[8px] text-copy-muted">Joueur {index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`${compact ? 'min-h-0' : 'min-h-[150px]'} h-full w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-line bg-canvas p-4`}>
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-brand-300" />
        <span className="text-[10px] text-copy-muted">Workflow</span>
      </div>
      <div className="flex items-center gap-2">
        {['Input', 'API', 'Transform', 'Output'].map((step, index) => (
          <div key={step} className="flex flex-1 items-center gap-2">
            <div className="rounded-md border border-line bg-panel px-2 py-3 text-center text-[8px] text-copy-muted">
              {step}
            </div>
            {index < 3 && <div className="h-px flex-1 bg-brand-300/50" />}
          </div>
        ))}
      </div>
      {!compact && (
        <div className="mt-5 space-y-2">
          <div className="h-2 w-2/3 rounded bg-white/10" />
          <div className="h-2 w-1/2 rounded bg-white/10" />
        </div>
      )}
    </div>
  )
}
