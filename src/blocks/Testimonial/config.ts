import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'
import { blockSettings } from '@/fields/blockSettings'

export const Testimonial: Block = {
  slug: 'testimonial',
  imageURL: '/block-thumbnails/testimonial.png',
  imageAltText: 'Video or image with overlapping testimonial quote card',
  interfaceName: 'TestimonialBlock',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
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
              name: 'companyLogo',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Company logo displayed above the quote',
              },
            },
            {
              name: 'quote',
              type: 'textarea',
              required: true,
              admin: {
                description: 'The testimonial quote text',
              },
            },
            {
              name: 'authorName',
              type: 'text',
              required: true,
              admin: {
                description: 'Name of the person giving the testimonial',
              },
            },
            {
              name: 'authorTitle',
              type: 'text',
              admin: {
                description: 'Job title and company of the author',
              },
            },
            linkGroup({
              appearances: ['default', 'outline', 'arrow'],
              overrides: {
                maxRows: 1,
              },
            }),
          ],
        },
        {
          label: 'Settings',
          fields: [
            blockSettings({
              enablePadding: true,
              enableBackground: true,
              defaultPaddingTop: 'lg',
              defaultPaddingBottom: 'lg',
            }),
          ],
        },
      ],
    },
  ],
}
