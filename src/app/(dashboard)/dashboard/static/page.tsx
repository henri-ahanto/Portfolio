'use client'

import { useStaticContent } from '@/domain/hooks/useStaticContent/useStaticContent'
import { StaticRow } from '@/ui/components/static/StaticRow/StaticRow'
import { StaticCreateForm } from '@/ui/components/static/StaticCreateForm/StaticCreateForm'

export default function StaticDashboardPage() {
  const { data, loading, update, remove, create } = useStaticContent()

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Static Content</h1>
      </header>

      <StaticCreateForm onCreate={create} />

      {loading ? (
        <p className="text-gray-400">Chargement...</p>
      ) : (
        <div className="space-y-3">
          {data.map(item => (
            <StaticRow
              key={item.id}
              item={item}
              onSave={update}
              onDelete={remove}
            />
          ))}
        </div>
      )}
    </div>
  )
}
