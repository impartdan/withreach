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
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Video or image for the testimonial (supports video with play button overlay)',
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
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 1,
      },
    }),
    blockSettings({
      enablePadding: true,
      enableBackground: true,
      defaultPaddingTop: 'lg',
      defaultPaddingBottom: 'lg',
    }),
  ],
}
