import React from 'react'

import { CaseStudyCard, type CaseStudyCardData } from './CaseStudyCard'

type CaseStudyGridProps = {
  caseStudies: CaseStudyCardData[]
}

export const CaseStudyGrid: React.FC<CaseStudyGridProps> = ({ caseStudies }) => {
  if (caseStudies.length === 0) {
    return (
      <div className="py-xl text-center">
        <p className="type-display-sm text-brand-gray-med">No case studies found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-xl">
      {caseStudies.map((cs) => (
        <CaseStudyCard key={cs.slug} caseStudy={cs} />
      ))}
    </div>
  )
}
