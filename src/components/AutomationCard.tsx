'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import {
  BarChart3,
  BrainCircuit,
  Check,
  CircleDashed,
  FileDown,
  FilePenLine,
  FileSpreadsheet,
  FileText,
  Filter,
  Hourglass,
  ListTree,
  ChevronRight,
  PlugZap,
  Rss,
  Sparkles,
  Table,
  Mail,
} from 'lucide-react'
import type { Automation, AutomationStatus } from '@/data/automations'

type NodeState = 'idle' | 'running' | 'done'
type EdgeState = {
  progress: number
  isFilling: boolean
  isDone: boolean
}

const nodeRunMs = 700
const edgeFillMs = 850
const cyclePauseMs = 4500

const statusClasses: Record<AutomationStatus, string> = {
  live: 'border-status-live-border bg-status-live-bg text-status-live-text',
  'in-progress': 'border-status-progress-border bg-status-progress-bg text-status-progress-text',
  experiment: 'border-status-experiment-border bg-status-experiment-bg text-status-experiment-text',
}

const animatedNodeStyles: Record<NodeState, string> = {
  idle: 'border-line bg-panel/75 text-copy-faint shadow-[0_0_0_rgba(0,0,0,0)]',
  running:
    'border-brand-200 bg-brand-900/35 text-brand-100 shadow-[0_0_24px_rgba(255,210,138,0.32),0_0_64px_rgba(246,182,109,0.12)]',
  done:
    'border-status-live-border bg-status-live-bg/45 text-status-live-text shadow-[0_0_22px_rgba(143,212,154,0.22),0_0_56px_rgba(143,212,154,0.10)]',
}

const nodeIcons = {
  ga4: BarChart3,
  extraction: FileDown,
  analyse: BrainCircuit,
  rapport: FileText,
  email: Mail,
  api: PlugZap,
  structuration: ListTree,
  'export-sheets': Table,
  'export-csv': FileSpreadsheet,
  rss: Rss,
  regroupement: Filter,
  generation: Sparkles,
  brouillon: FilePenLine,
}

export default function AutomationCard({ automation }: { automation: Automation }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-line bg-panel transition-colors hover:border-line-soft">
      <div className="grid lg:min-h-[452px] lg:grid-cols-[0.50fr_1fr]">
        <div className="flex h-full flex-col border-line p-6 lg:border-r lg:p-7">
          <div className="mb-6 flex min-h-16 flex-col items-start gap-3">
            <h3 className="text-2xl font-semibold tracking-tight text-copy">{automation.title}</h3>
            <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusClasses[automation.status]}`}>
              {automation.statusLabel}
            </span>
          </div>

          <p className="min-h-[108px] max-w-md text-sm leading-relaxed text-copy-muted">{automation.description}</p>

          <div className="mt-8 flex min-h-[68px] max-w-md flex-wrap content-start gap-3">
            {automation.stack.map((item) => (
              <span
                key={item}
                className="rounded-md border border-line bg-canvas/60 px-3 py-1.5 text-xs text-copy-muted"
              >
                {item}
              </span>
            ))}
          </div>

          <a
            href={automation.href ?? '#automations'}
            className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-200 transition-colors group-hover:text-brand-100 hover:text-brand-100"
          >
            Voir le détail
            <ChevronRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <AutomationFlow automation={automation} />
      </div>
    </article>
  )
}

function AutomationFlow({ automation }: { automation: Automation }) {
  const flowRef = useRef<HTMLDivElement>(null)
  const wasInViewRef = useRef(false)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const cycleMs = useMemo(() => getCycleDuration(automation.flow.nodes.length), [automation.flow.nodes.length])
  const nodeStates = automation.flow.nodes.map((_, index) => getNodeState(index, elapsedMs))

  useEffect(() => {
    setElapsedMs(0)
  }, [automation.slug])

  useEffect(() => {
    const flowElement = flowRef.current

    if (!flowElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextIsInView = entry.isIntersecting

        if (nextIsInView && !wasInViewRef.current) {
          setElapsedMs(0)
        }

        wasInViewRef.current = nextIsInView
        setIsInView(nextIsInView)
      },
      { threshold: 0.35 }
    )

    observer.observe(flowElement)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isInView) return

    let animationFrame = 0
    const startedAt = performance.now()

    function animate(now: number) {
      setElapsedMs((now - startedAt) % cycleMs)
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [cycleMs, isInView])

  return (
    <div ref={flowRef} className="automation-flow-scroll relative min-h-[452px] overflow-x-auto overflow-y-hidden bg-canvas/25 px-5 py-7 sm:px-8 lg:px-10">
      <div className="relative mx-auto flex h-full min-w-[650px] max-w-3xl flex-col justify-center lg:min-w-0">
        <div className="flex items-center">
          {automation.flow.nodes.map((node, index) => {
            const Icon = nodeIcons[node.id as keyof typeof nodeIcons] ?? FileText
            const isLast = index === automation.flow.nodes.length - 1
            const nodeState = nodeStates[index]
            const edgeState = getEdgeState(index, elapsedMs, automation.flow.nodes.length)

            return (
              <Fragment key={node.id}>
                <div
                  className={`relative z-10 flex h-20 min-w-[68px] flex-col items-center justify-center rounded-lg border text-center transition-all duration-300 ${animatedNodeStyles[nodeState]}`}
                >
                  <Icon size={24} strokeWidth={1.8} />
                  <span className="mt-2 text-xs font-semibold text-copy">{node.label}</span>
                </div>

                {!isLast && (
                  <FlowConnector state={edgeState} />
                )}
              </Fragment>
            )
          })}
        </div>

        <WorkflowTaskList nodes={automation.flow.nodes} nodeStates={nodeStates} />
      </div>
    </div>
  )
}

function WorkflowTaskList({
  nodes,
  nodeStates,
}: {
  nodes: Automation['flow']['nodes']
  nodeStates: NodeState[]
}) {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([])
  const shouldScroll = nodes.length >= 6
  const activeIndex = nodeStates.findIndex((state) => state === 'running')

  useEffect(() => {
    if (!shouldScroll || activeIndex < 0) return

    itemRefs.current[activeIndex]?.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth',
    })
  }, [activeIndex, shouldScroll])

  return (
    <div
      className={`automation-task-scroll mt-12 flex h-[232px] flex-col ${
        shouldScroll ? 'overflow-y-auto pr-2' : 'justify-center overflow-hidden'
      }`}
    >
      <div className="space-y-2">
        {nodes.map((node, index) => {
          const nodeState = nodeStates[index]

          return (
            <div
              key={node.id}
              ref={(element) => {
                itemRefs.current[index] = element
              }}
              className={`flex items-start gap-3 rounded-md border border-line bg-panel-muted/45 px-3 py-2 ${
                nodeState === 'done' ? 'text-copy' : 'text-copy-faint'
              }`}
            >
              <TaskStatusIcon state={nodeState} />
              <div className="min-w-0">
                <p className="text-[13px] leading-relaxed">{node.task}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TaskStatusIcon({ state }: { state: NodeState }) {
  if (state === 'done') {
    return <Check size={17} strokeWidth={2.2} className="mt-0.5 shrink-0 text-status-live-text" />
  }

  if (state === 'running') {
    return <Hourglass size={17} strokeWidth={2} className="mt-0.5 shrink-0 animate-pulse text-brand-200" />
  }

  return <CircleDashed size={17} strokeWidth={1.8} className="mt-0.5 shrink-0 text-copy-faint/55" />
}

function FlowConnector({ state }: { state: EdgeState }) {
  const progress = `${state.progress * 100}%`

  return (
    <div className="relative h-px flex-1 min-w-10 bg-line">
      <span
        className={`absolute inset-y-0 left-0 transition-[width,background-color] duration-200 ease-linear ${
          state.isDone ? 'bg-status-live-text' : 'bg-brand-200'
        }`}
        style={{ width: progress }}
      />
      <span
        className={`absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200 shadow-[0_0_18px_rgba(255,210,138,0.75)] transition-opacity duration-150 ${
          state.isFilling ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ left: progress }}
      />
    </div>
  )
}

function getCycleDuration(nodeCount: number) {
  return nodeCount * nodeRunMs + Math.max(nodeCount - 1, 0) * edgeFillMs + cyclePauseMs
}

function getNodeState(index: number, elapsedMs: number): NodeState {
  const stepStart = index * (nodeRunMs + edgeFillMs)
  const runEnd = stepStart + nodeRunMs

  if (elapsedMs < stepStart) return 'idle'
  if (elapsedMs < runEnd) return 'running'
  return 'done'
}

function getEdgeState(index: number, elapsedMs: number, nodeCount: number): EdgeState {
  if (index >= nodeCount - 1) {
    return { progress: 0, isFilling: false, isDone: false }
  }

  const fillStart = index * (nodeRunMs + edgeFillMs) + nodeRunMs
  const fillEnd = fillStart + edgeFillMs
  const targetNodeDoneAt = (index + 1) * (nodeRunMs + edgeFillMs) + nodeRunMs

  if (elapsedMs < fillStart) {
    return { progress: 0, isFilling: false, isDone: false }
  }

  if (elapsedMs >= fillEnd) {
    return { progress: 1, isFilling: false, isDone: elapsedMs >= targetNodeDoneAt }
  }

  return {
    progress: (elapsedMs - fillStart) / edgeFillMs,
    isFilling: true,
    isDone: false,
  }
}
