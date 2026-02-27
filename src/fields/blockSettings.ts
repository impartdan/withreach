import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type SpacingSize = 'none' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type BackgroundType = 'none' | 'color' | 'image' | 'video' | 'gradient'

export type GradientDirection = 'down' | 'right'

export type TextColor = 'dark' | 'light'

export type BackgroundColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'muted'
  | 'card'
  | 'background'
  | 'brand-off-white'
  | 'brand-linen'
  | 'brand-black'
  | 'brand-white'
  | 'brand-olive'
  | 'brand-gray'
  | 'brand-purple'
  | 'brand-peach'
  | 'brand-green'
  | 'brand-blue'
  | 'brand-blue-light'

export type BlockSettingsOptions = {
  enablePadding?: boolean
  enableBackground?: boolean
  defaultPaddingTop?: SpacingSize
  defaultPaddingBottom?: SpacingSize
  overrides?: Partial<GroupField>
}

type BlockSettingsType = (options?: BlockSettingsOptions) => Field

export const blockSettings: BlockSettingsType = (options = {}) => {
  const {
    enablePadding = true,
    enableBackground = true,
    defaultPaddingTop = 'md',
    defaultPaddingBottom = 'md',
    overrides = {},
  } = options

  const fields: Field[] = []

  if (enablePadding) {
    fields.push({
      name: 'paddingTop',
      type: 'select',
      defaultValue: defaultPaddingTop,
      dbName: 'pt',
      options: [
        { label: 'None', value: 'none' },
        { label: '3XS (16→16→8)', value: '3xs' },
        { label: '2XS (24→20→16)', value: '2xs' },
        { label: 'XS (32→32→24)', value: 'xs' },
        { label: 'SM (40→36→24)', value: 'sm' },
        { label: 'MD (64→56→40)', value: 'md' },
        { label: 'LG (80→60→48)', value: 'lg' },
        { label: 'XL (120→100→60)', value: 'xl' },
        { label: '2XL (160→120→80)', value: '2xl' },
      ],
    })

    fields.push({
      name: 'paddingBottom',
      type: 'select',
      defaultValue: defaultPaddingBottom,
      dbName: 'pb',
      options: [
        { label: 'None', value: 'none' },
        { label: '3XS (16→16→8)', value: '3xs' },
        { label: '2XS (24→20→16)', value: '2xs' },
        { label: 'XS (32→32→24)', value: 'xs' },
        { label: 'SM (40→36→24)', value: 'sm' },
        { label: 'MD (64→56→40)', value: 'md' },
        { label: 'LG (80→60→48)', value: 'lg' },
        { label: 'XL (120→100→60)', value: 'xl' },
        { label: '2XL (160→120→80)', value: '2xl' },
      ],
    })
  }

  if (enableBackground) {
    fields.push({
      name: 'background',
      type: 'select',
      defaultValue: 'none',
      dbName: 'bg',
      label: 'Background',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Color', value: 'color' },
        { label: 'Gradient', value: 'gradient' },
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
    })

    fields.push({
      name: 'backgroundColor',
      type: 'select',
      dbName: 'bg_color',
      label: 'Background Color',
      admin: {
        condition: (_, siblingData) =>
          ['color', 'image', 'video'].includes(siblingData?.background),
      },
      options: [
        { label: 'Off White', value: 'brand-off-white' },
        { label: 'Linen', value: 'brand-linen' },
        { label: 'Black', value: 'brand-black' },
        { label: 'White', value: 'brand-white' },
        { label: 'Olive', value: 'brand-olive' },
        { label: 'Gray', value: 'brand-gray' },
        { label: 'Purple', value: 'brand-purple' },
        { label: 'Peach', value: 'brand-peach' },
        { label: 'Green', value: 'brand-green' },
        { label: 'Blue', value: 'brand-blue' },
        { label: 'Blue Light', value: 'brand-blue-light' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Accent', value: 'accent' },
        { label: 'Muted', value: 'muted' },
        { label: 'Card', value: 'card' },
        { label: 'Background', value: 'background' },
      ],
    })

    const gradientColorOptions = [
      { label: 'Off White', value: 'brand-off-white' },
      { label: 'Linen', value: 'brand-linen' },
      { label: 'Black', value: 'brand-black' },
      { label: 'White', value: 'brand-white' },
      { label: 'Olive', value: 'brand-olive' },
      { label: 'Gray', value: 'brand-gray' },
      { label: 'Purple', value: 'brand-purple' },
      { label: 'Peach', value: 'brand-peach' },
      { label: 'Green', value: 'brand-green' },
      { label: 'Blue', value: 'brand-blue' },
      { label: 'Blue Light', value: 'brand-blue-light' },
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Accent', value: 'accent' },
      { label: 'Muted', value: 'muted' },
      { label: 'Card', value: 'card' },
      { label: 'Background', value: 'background' },
    ]

    fields.push({
      name: 'gradientFrom',
      type: 'select',
      dbName: 'bg_grad_from',
      label: 'From',
      admin: {
        condition: (_, siblingData) => siblingData?.background === 'gradient',
      },
      options: gradientColorOptions,
    })

    fields.push({
      name: 'gradientTo',
      type: 'select',
      dbName: 'bg_grad_to',
      label: 'To',
      admin: {
        condition: (_, siblingData) => siblingData?.background === 'gradient',
      },
      options: gradientColorOptions,
    })

    fields.push({
      name: 'gradientDirection',
      type: 'select',
      defaultValue: 'down',
      dbName: 'bg_grad_dir',
      label: 'Direction',
      admin: {
        condition: (_, siblingData) => siblingData?.background === 'gradient',
      },
      options: [
        { label: 'Down', value: 'down' },
        { label: 'Right', value: 'right' },
      ],
    })

    fields.push({
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      dbName: 'bg_img_id',
      label: 'Background Image',
      admin: {
        condition: (_, siblingData) =>
          ['image', 'video'].includes(siblingData?.background),
      },
    } as Field)

    fields.push({
      name: 'backgroundImagePosition',
      type: 'select',
      defaultValue: 'center',
      dbName: 'bg_img_pos',
      label: 'Image Position',
      admin: {
        condition: (_, siblingData) =>
          ['image', 'video'].includes(siblingData?.background),
      },
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    })

    fields.push({
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      dbName: 'bg_vid_id',
      label: 'Video File',
      admin: {
        condition: (_, siblingData) => siblingData?.background === 'video',
        description: 'Upload an MP4 video file',
      },
      filterOptions: {
        mimeType: { contains: 'video' },
      },
    } as Field)

    fields.push({
      name: 'backgroundVideoUrl',
      type: 'text',
      label: 'Video URL',
      admin: {
        condition: (_, siblingData) => siblingData?.background === 'video',
        description: 'Or paste an external video URL (used if no file is uploaded)',
      },
    })

    fields.push({
      name: 'textColor',
      type: 'select',
      defaultValue: 'dark',
      dbName: 'txt_color',
      label: 'Text Color',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    })
  }

  fields.push({
    name: 'showGridLines',
    type: 'checkbox',
    defaultValue: false,
    label: 'Show grid lines?',
  })

  const blockSettingsGroup: GroupField = {
    name: 'blockSettings',
    type: 'group',
    label: 'Block Settings',
    dbName: 'blk_settings',
    admin: {
      description: 'Configure appearance settings for this block',
    },
    fields,
  } as GroupField

  return deepMerge(blockSettingsGroup, overrides)
}
