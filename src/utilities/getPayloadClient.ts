import configPromise from '@payload-config'
import { getPayload, type Payload } from 'payload'

declare global {
  var __withreachPayloadPromise: Promise<Payload> | undefined
}

export const getPayloadClient = async () => {
  if (!globalThis.__withreachPayloadPromise) {
    globalThis.__withreachPayloadPromise = getPayload({ config: configPromise }).catch((error) => {
      globalThis.__withreachPayloadPromise = undefined
      throw error
    })
  }

  return globalThis.__withreachPayloadPromise
}
