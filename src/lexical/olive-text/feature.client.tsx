'use client'

import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection'
import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client'
import { $getSelection, $isRangeSelection, type BaseSelection, type LexicalEditor } from 'lexical'

const OLIVE_HEX = '#999177'
const OLIVE_RGB = 'rgb(153,145,119)'

const normalizeColor = (value: string): string => value.replace(/\s+/g, '').toLowerCase()

const isOliveColor = (value: string | null | undefined): boolean => {
  if (!value) return false
  const normalized = normalizeColor(value)
  return normalized === OLIVE_HEX || normalized === OLIVE_RGB
}

const OliveTextIcon = () => (
  <span style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.02em' }}>
    <span style={{ borderBottom: `2px solid ${OLIVE_HEX}`, paddingBottom: '1px' }}>A</span>
  </span>
)

const toolbarGroups = [
  toolbarFeatureButtonsGroupWithItems([
    {
      ChildComponent: OliveTextIcon,
      isActive: ({ selection }: { selection: BaseSelection | null }) => {
        if (!$isRangeSelection(selection)) return false
        const color = $getSelectionStyleValueForProperty(selection, 'color', '')
        return isOliveColor(color)
      },
      key: 'oliveTextToggle',
      label: 'Toggle olive text color',
      onSelect: ({ editor }: { editor: LexicalEditor }) => {
        editor.update(() => {
          const selection = $getSelection()
          if (!$isRangeSelection(selection)) return

          const color = $getSelectionStyleValueForProperty(selection, 'color', '')
          $patchStyleText(selection, { color: isOliveColor(color) ? null : OLIVE_HEX })
        })
      },
      order: 1,
    },
  ]),
]

export const OliveTextFeatureClient = createClientFeature({
  toolbarFixed: {
    groups: toolbarGroups,
  },
  toolbarInline: {
    groups: toolbarGroups,
  },
})
