'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'

import { CMSLink } from '@/components/Link'
import type { Footer as FooterGlobal } from '@/payload-types'

type Menu = NonNullable<NonNullable<FooterGlobal['navColumns']>[number]['menus']>[number]

export function FooterCollapsibleMenu({
  menu,
  menuIndex,
  defaultOpen = false,
}: {
  menu: Menu
  menuIndex: number
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const items = menu?.items || []
  if (!items.length) return null

  return (
    <div className={cn('flex flex-col gap-2 md:pb-0', open ? 'pb-4' : 'pb-0')}>
      {menu.title ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="md:cursor-default flex items-center gap-1 w-full md:pointer-events-none"
            aria-expanded={open}
          >
            <span className="type-micro-b text-brand-olive my-2 text-left">{menu.title}</span>
            <ChevronDown
              className={`w-4 h-4 text-brand-olive shrink-0 transition-transform duration-200 md:hidden ${open ? 'rotate-180' : ''}`}
            />
          </button>

          <div
            className={`flex flex-col gap-2 overflow-hidden transition-all duration-200 md:!max-h-none md:!opacity-100 ${
              open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            } md:max-h-none md:opacity-100`}
          >
            {items.map((item, itemIndex) => {
              const link = item?.link
              if (!link) return null

              const key = item.id ?? `menu-${menuIndex}-item-${itemIndex}-${link.url ?? 'link'}`

              return (
                <CMSLink
                  {...link}
                  key={key}
                  className={`text-white ${menu?.variant === 'primary' ? 'type-intro' : 'type-micro-b'}`}
                  appearance="inline"
                />
              )
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item, itemIndex) => {
            const link = item?.link
            if (!link) return null

            const key = item.id ?? `menu-${menuIndex}-item-${itemIndex}-${link.url ?? 'link'}`

            return (
              <CMSLink
                {...link}
                key={key}
                className={`text-white ${menu?.variant === 'primary' ? 'type-intro' : 'type-micro-b'}`}
                appearance="inline"
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
