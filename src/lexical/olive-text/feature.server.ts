import { createServerFeature } from '@payloadcms/richtext-lexical'

export const OliveTextFeature = createServerFeature({
  feature: {
    ClientFeature: '@/lexical/olive-text/feature.client#OliveTextFeatureClient',
  },
  key: 'oliveText',
})
