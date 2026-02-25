import React from 'react'
import type { CaseStudy } from '@/payload-types'
import { CaseStudyCard } from '@/components/CaseStudiesArchive/CaseStudyCard'

interface RelatedCaseStudiesProps {
  caseStudies: CaseStudy[]
}

export const RelatedCaseStudies: React.FC<RelatedCaseStudiesProps> = ({ caseStudies }) => {
  if (!caseStudies || caseStudies.length === 0) {
    return null
  }

  return (
    <div className="py-20">
      <div className="container">
        <div className="border-t border-brand-gray-light pb-16">
          <h2 className="type-display-lg text-brand-black pt-8">More case studies</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </div>
      </div>
    </div>
  )
}
