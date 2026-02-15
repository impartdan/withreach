'use client'

import { $setBlocksType } from '@lexical/selection'
import { $getSelection, $isRangeSelection } from 'lexical'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'

import type { TypographyStyle } from './TypographyStyleNode'
import {
  $createTypographyStyleNode,
  $isTypographyStyleNode,
  TypographyStyleNode,
} from './TypographyStyleNode'

const TypographyIcon: React.FC = () => (
  <span style={{ fontSize: '12px', fontWeight: 600, lineHeight: 1, letterSpacing: '-0.02em' }}>
    Aa
  </span>
)

const TYPOGRAPHY_STYLES: Array<{
  key: TypographyStyle
  label: string
}> = [
  { key: 'type-display-xxl', label: 'Display XXL' },
  { key: 'type-display-xl', label: 'Display XL' },
  { key: 'type-display-lg', label: 'Display LG' },
  { key: 'type-display-md', label: 'Display MD' },
  { key: 'type-display-sm', label: 'Display SM' },
  { key: 'type-display-xs', label: 'Display XS' },
  { key: 'type-display-xxs', label: 'Display XXS' },
  { key: 'type-body-lg', label: 'Body LG' },
  { key: 'type-body', label: 'Body' },
  { key: 'type-button-lg', label: 'Button LG' },
  { key: 'type-button', label: 'Button' },
  { key: 'type-navigation', label: 'Navigation' },
]

const toolbarGroups = [
  {
    type: 'dropdown' as const,
    ChildComponent: TypographyIcon,
    items: TYPOGRAPHY_STYLES.map((style, i) => ({
      isActive: ({ selection }: { selection: any }) => {
        if (!$isRangeSelection(selection)) {
          return false
        }
        for (const node of selection.getNodes()) {
          if ($isTypographyStyleNode(node) && node.getTypographyStyle() === style.key) {
            continue
          }
          const parent = node.getParent()
          if ($isTypographyStyleNode(parent) && parent.getTypographyStyle() === style.key) {
            continue
          }
          return false
        }
        return true
      },
      key: style.key,
      label: style.label,
      onSelect: ({ editor }: { editor: any }) => {
        editor.update(() => {
          const selection = $getSelection()
          $setBlocksType(selection, () => $createTypographyStyleNode(style.key))
        })
      },
      order: i + 1,
    })),
    key: 'typographyStyles',
    order: 26, // Right after the text dropdown (order: 25)
  },
]

export const TypographyFeatureClient = createClientFeature({
  nodes: [TypographyStyleNode],
  toolbarFixed: {
    groups: toolbarGroups,
  },
  toolbarInline: {
    groups: toolbarGroups,
  },
})
