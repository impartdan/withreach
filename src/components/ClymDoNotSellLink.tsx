'use client'

import type { MouseEvent } from 'react'

type ClymGlobal = {
  showWidget: (path: string, context: string, event: MouseEvent<HTMLButtonElement>) => void
}

type WindowWithClym = Window & {
  Clym?: ClymGlobal
}

const isThirdPartyScriptsEnabled = process.env.NEXT_PUBLIC_ENABLE_THIRD_PARTY_SCRIPTS === 'true'

export function ClymDoNotSellLink() {
  return null

  // if (!isThirdPartyScriptsEnabled) return null

  // return (
  //   <button
  //     type="button"
  //     className="underline decoration-white/40 underline-offset-4 hover:decoration-white transition-colors"
  //     onClick={(event) => {
  //       const browserWindow = window as WindowWithClym
  //       browserWindow.Clym?.showWidget('/requests/new/do_not_sell_my_information', '', event)
  //     }}
  //   >
  //     Do Not Sell My Information
  //   </button>
  // )
}
