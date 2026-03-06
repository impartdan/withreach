import type { CollectionBeforeChangeHook } from 'payload'

export const populatePublishedAt: CollectionBeforeChangeHook = ({ data }) => {
  if (!data) return data

  if (data._status === 'published' && !data.publishedAt) {
    return {
      ...data,
      publishedAt: new Date(),
    }
  }

  return data
}
