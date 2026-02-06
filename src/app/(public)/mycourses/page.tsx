'use client'

import { useParcours } from "@/domain/hooks/useParcours/useParcours";
import { CourseCard } from "@/ui/components/cards/CourseCard/CourseCard";
import { Section } from "@/ui/components/Section/Section";
import Link from "next/link";

export default function MyCoursesPage() {

  const { data: parcours } = useParcours()

  return (
    <Section title="Mon Parcours" from='#2247FF' to='#4E1365' id="mycourses" cta={
      <></>
    }>
      <div className="grid md:grid-cols-3 gap-6">
        {parcours.filter(p => p.is_pinned).slice(0, 3).map(p => (
          <CourseCard
            key={p.id}
            title={p.title}
            description={p.description}
            period={p.period}
            location={p.location}
            tags={p.tags}
          />

        ))}
      </div>
    </Section>
  )
}
