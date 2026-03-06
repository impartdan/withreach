import type { CollectionBeforeValidateHook } from 'payload'

const toSlug = (value: string): string =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const ensureSlugFromTitle: CollectionBeforeValidateHook = ({ data }) => {
  if (!data || typeof data !== 'object') return data

  const incomingData = data as Record<string, unknown>
  const generateSlug = incomingData.generateSlug

  if (generateSlug === false) return data

  const title = incomingData.title
  if (typeof title !== 'string') return data

  const generatedSlug = toSlug(title)
  if (!generatedSlug) return data

  const currentSlug = incomingData.slug
  if (currentSlug === generatedSlug) return data

  return {
    ...incomingData,
    slug: generatedSlug,
  }
}
