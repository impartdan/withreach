import type { GlobalConfig } from 'payload'

import { revalidateCaseStudiesSettings } from './hooks/revalidateCaseStudiesSettings'

export const CaseStudiesSettings: GlobalConfig = {
  slug: 'case-studies-settings',
  label: 'Case Studies Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'featuredCaseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      maxRows: 5,
      label: 'Featured Case Studies',
      admin: {
        description: 'Select up to 5 case studies to feature on the case studies page.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateCaseStudiesSettings],
  },
}
