import React from 'react'

import type { HubspotFormBlockType } from './Component.client'
import { HubspotFormBlock as HubspotFormBlockClient } from './Component.client'

export const HubspotFormBlock: React.FC<
  {
    id?: string
  } & HubspotFormBlockType
> = (props) => {
  return <HubspotFormBlockClient {...props} />
}
