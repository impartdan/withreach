import type { Block } from 'payload'

export const BlockquoteBlock: Block = {
  slug: 'blockquote',
  labels: {
    singular: 'Blockquote',
    plural: 'Blockquotes',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      label: 'Quote',
      required: true,
    },
    {
      name: 'citation',
      type: 'text',
      label: 'Citation',
    },
  ],
  interfaceName: 'BlockquoteBlock',
}
