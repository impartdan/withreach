import type { Block } from 'payload'

export const VideoEmbed: Block = {
  slug: 'videoEmbed',
  interfaceName: 'VideoEmbed',
  labels: {
    singular: 'Video',
    plural: 'Videos',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        description: 'Optional heading displayed above the video.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Optional description displayed below the title.',
      },
    },
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
  ],
}
