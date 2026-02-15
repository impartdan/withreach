import { createServerFeature, createNode } from '@payloadcms/richtext-lexical'
import { TypographyStyleNode } from './TypographyStyleNode'

export const TypographyFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexical/typography/feature.client#TypographyFeatureClient',
    nodes: [
      createNode({
        node: TypographyStyleNode,
      }),
    ],
  },
  key: 'typography',
})
