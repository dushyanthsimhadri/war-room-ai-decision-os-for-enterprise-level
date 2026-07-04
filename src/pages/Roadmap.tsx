import { useState } from 'react'
import { motion } from 'framer-motion'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TopBar } from '@/components/layout/TopBar'
import { roadmapData } from '@/data/mockData'
import { Map, GripVertical, Plus, Zap } from 'lucide-react'

type RoadmapItem = {
  id: string
  title: string
  priority: string
  effort: string
  owner: string
  impact: string
}

type Column = 'now' | 'next' | 'later' | 'icebox'

const COLUMN_CONFIG = {
  now: { label: '🚀 Now', color: '#6366f1', desc: 'In progress this sprint' },
  next: { label: '⏭️ Next', color: '#06b6d4', desc: 'Planned for next quarter' },
  later: { label: '🔮 Later', color: '#f59e0b', desc: 'On the horizon' },
  icebox: { label: '🧊 Icebox', color: '#475569', desc: 'Parked for now' },
}

const PRIORITY_COLORS: Record<string, string> = {
  critical: '#ef4444',
  high: '#f59e0b',
  medium: '#6366f1',
  low: '#475569',
}

const EFFORT_COLORS: Record<string, string> = {
  S: '#10b981',
  M: '#06b6d4',
  L: '#f59e0b',
  XL: '#ef4444',
}

function SortableCard({ item }: { item: RoadmapItem }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        background: isDragging ? 'rgba(99,102,241,0.08)' : 'rgba(13,17,23,0.9)',
        border: '1px solid var(--border-default)',
        borderRadius: 12,
        padding: 14,
        marginBottom: 8,
        cursor: 'grab',
      }}
    >
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <div {...attributes} {...listeners} style={{ color: 'var(--text-muted)', cursor: 'grab', paddingTop: 1, flexShrink: 0 }}>
          <GripVertical size={14} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8, lineHeight: 1.4 }}>
            {item.title}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 99, background: `${PRIORITY_COLORS[item.priority] || '#475569'}20`, color: PRIORITY_COLORS[item.priority] || '#475569', border: `1px solid ${PRIORITY_COLORS[item.priority] || '#475569'}30` }}>
              {item.priority}
            </span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 99, background: `${EFFORT_COLORS[item.effort] || '#06b6d4'}15`, color: EFFORT_COLORS[item.effort] || '#06b6d4', border: `1px solid ${EFFORT_COLORS[item.effort] || '#06b6d4'}25` }}>
              {item.effort}
            </span>
            <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 99, background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}>
              {item.impact}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Roadmap() {
  const [columns, setColumns] = useState({
    now: roadmapData.now as RoadmapItem[],
    next: roadmapData.next as RoadmapItem[],
    later: roadmapData.later as RoadmapItem[],
    icebox: roadmapData.icebox as RoadmapItem[],
  })

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setColumns((prev) => {
      const newCols = { ...prev }
      for (const col of Object.keys(newCols) as Column[]) {
        const ids = newCols[col].map((i) => i.id)
        const oldIdx = ids.indexOf(String(active.id))
        const newIdx = ids.indexOf(String(over.id))
        if (oldIdx !== -1 && newIdx !== -1) {
          newCols[col] = arrayMove(newCols[col], oldIdx, newIdx)
          return newCols
        }
      }
      return newCols
    })
  }

  return (
    <div>
      <TopBar title="Roadmap AI" subtitle="AI-generated product roadmap" />
      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24 }}>
          <button className="btn-primary" style={{ fontSize: 13, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Zap size={13} /> AI Generate Roadmap
          </button>
          <button className="btn-ghost" style={{ fontSize: 13, padding: '8px 14px' }}>Export</button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {(Object.keys(COLUMN_CONFIG) as Column[]).map((col) => {
              const config = COLUMN_CONFIG[col]
              return (
                <motion.div key={col} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div style={{
                    background: 'rgba(13,17,23,0.8)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 16,
                    padding: 16,
                    minHeight: 400,
                  }}>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{config.label}</div>
                        <div style={{
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          background: `${config.color}15`,
                          border: `1px solid ${config.color}30`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          fontWeight: 700,
                          color: config.color,
                        }}>
                          {columns[col].length}
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{config.desc}</div>
                      <div style={{ height: 2, borderRadius: 99, background: config.color, marginTop: 10, opacity: 0.5 }} />
                    </div>

                    <SortableContext items={columns[col].map((i) => i.id)} strategy={verticalListSortingStrategy}>
                      {columns[col].map((item) => (
                        <SortableCard key={item.id} item={item} />
                      ))}
                    </SortableContext>

                    <button style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px dashed var(--border-subtle)',
                      color: 'var(--text-muted)',
                      fontSize: 12,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      marginTop: 8,
                    }}>
                      <Plus size={13} /> Add Item
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </DndContext>
      </div>
    </div>
  )
}
