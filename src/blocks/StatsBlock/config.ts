import type { Block } from 'payload'

import { blockSettings } from '@/fields/blockSettings'

export const StatsBlock: Block = {
  slug: 'statsBlock',
  interfaceName: 'StatsBlock',
  imageURL: '/block-thumbnails/stats-block.png',
  imageAltText: 'Horizontal stats layout with heading and statistics separated by dividers',
  labels: {
    singular: 'Stats Block',
    plural: 'Stats Blocks',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heading',
              type: 'text',
              label: 'Heading',
              admin: {
                description: 'Main heading for the stats section (e.g., "Our optimization success")',
              },
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Statistics',
              required: true,
              minRows: 1,
              maxRows: 6,
              // Stable interface name helps Payload track array items correctly
              // across multiple block instances in the same Lexical editor
              interfaceName: 'StatItem',
              fields: [
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Icon',
                  admin: {
                    description: 'Optional icon displayed above the stat.',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  label: 'Stat Value',
                  required: true,
                  admin: {
                    description: 'The main statistic value (e.g., "$3B", "130+", "90%+") or a title (e.g., "+12% Authorization Rate")',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  admin: {
                    description: 'Description or context for the statistic',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings({
              enablePadding: true,
              enableBackground: true,
              defaultPaddingTop: 'xl',
              defaultPaddingBottom: 'xl',
            }),
          ],
        },
      ],
    },
  ],
}
