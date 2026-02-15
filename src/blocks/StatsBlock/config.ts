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
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: 'Stat Value',
                  required: true,
                  admin: {
                    description: 'The main statistic value (e.g., "$3B", "130+", "90%+")',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Description',
                  required: true,
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
              enableBackgroundImage: true,
              enableBackgroundVideo: true,
              defaultPaddingTop: 'xl',
              defaultPaddingBottom: 'xl',
            }),
          ],
        },
      ],
    },
  ],
}
