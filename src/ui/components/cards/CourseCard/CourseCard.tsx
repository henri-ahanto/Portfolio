'use client'

type CourseCardProps = {
  title: string
  description: string
  period?: string
  location?: string
  tags?: string[]
}

export const CourseCard = ({
  title,
  description,
  period,
  location,
  tags = [],
}: CourseCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-[#0b0a1f]/70 backdrop-blur-md p-6 transition-all hover:shadow-xl hover:-translate-y-1">
      
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-indigo-500/10 to-purple-500/10" />

      <div className="relative z-10 space-y-3">
        <h3 className="text-lg font-bold">{title}</h3>

        {period && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{period}</p>
        )}

        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {description}
        </p>

        {((location ?? "") || tags?.length > 0) && (
          <div className="flex flex-wrap gap-2 pt-2">
            {location && (
              <span className="text-xs px-2 py-1 rounded-full bg-black/5 dark:bg-white/10">
                📍 {location}
              </span>
            )}
            {tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
