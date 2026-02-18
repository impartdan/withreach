import type { Block } from 'payload'

import { blockSettings } from '@/fields/blockSettings'

export const VideoBlock: Block = {
  slug: 'videoBlock',
  imageURL: '/block-thumbnails/video.png',
  imageAltText: 'Video block with upload or YouTube embed',
  interfaceName: 'VideoBlock',
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'videoType',
              type: 'select',
              defaultValue: 'upload',
              label: 'Video Source',
              required: true,
              options: [
                { label: 'Upload (MP4)', value: 'upload' },
                { label: 'YouTube', value: 'youtube' },
              ],
            },
            {
              name: 'video',
              type: 'upload',
              relationTo: 'media',
              label: 'Video File',
              filterOptions: {
                mimeType: { in: ['video/mp4'] },
              },
              admin: {
                description: 'Upload an MP4 video file',
                condition: (_data, siblingData) => siblingData?.videoType === 'upload',
              },
            },
            {
              name: 'youtubeUrl',
              type: 'text',
              label: 'YouTube URL',
              admin: {
                description: 'Paste a YouTube video URL (e.g. https://www.youtube.com/watch?v=...)',
                condition: (_data, siblingData) => siblingData?.videoType === 'youtube',
              },
            },
            {
              name: 'poster',
              type: 'upload',
              relationTo: 'media',
              label: 'Custom Thumbnail',
              admin: {
                description:
                  'Optional thumbnail shown before the video plays. For YouTube, the video thumbnail is used automatically if left blank.',
              },
            },
            {
              name: 'maxWidth',
              type: 'select',
              defaultValue: 'max-w-4xl',
              label: 'Max Width',
              options: [
                { label: '3XL — 768px', value: 'max-w-3xl' },
                { label: '4XL — 896px', value: 'max-w-4xl' },
                { label: '5XL — 1024px', value: 'max-w-5xl' },
                { label: '6XL — 1152px', value: 'max-w-6xl' },
                { label: 'None (full width)', value: 'none' },
              ],
            },
            {
              name: 'alignment',
              type: 'select',
              defaultValue: 'center',
              label: 'Alignment',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Center', value: 'center' },
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
              defaultPaddingTop: 'md',
              defaultPaddingBottom: 'md',
            }),
          ],
        },
      ],
    },
  ],
}
