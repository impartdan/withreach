import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type SpacingSize = 'none' | '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type BlockSettingsOptions = {
  enablePadding?: boolean
  enableBackground?: boolean
  enableBackgroundImage?: boolean
  enableBackgroundVideo?: boolean
  defaultPaddingTop?: SpacingSize
  defaultPaddingBottom?: SpacingSize
  defaultBackgroundColor?: 'none' | 'primary' | 'secondary' | 'accent' | 'muted' | 'card' | 'background'
  overrides?: Partial<GroupField>
}

type BlockSettingsType = (options?: BlockSettingsOptions) => Field

export const blockSettings: BlockSettingsType = (options = {}) => {
  const {
    enablePadding = true,
    enableBackground = true,
    enableBackgroundImage = false,
    enableBackgroundVideo = false,
    defaultPaddingTop = 'md',
    defaultPaddingBottom = 'md',
    defaultBackgroundColor = 'none',
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
      name: 'backgroundColor',
      type: 'select',
      defaultValue: defaultBackgroundColor,
      dbName: 'bg_color',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Primary',
          value: 'primary',
        },
        {
          label: 'Secondary',
          value: 'secondary',
        },
        {
          label: 'Accent',
          value: 'accent',
        },
        {
          label: 'Muted',
          value: 'muted',
        },
        {
          label: 'Card',
          value: 'card',
        },
        {
          label: 'Background',
          value: 'background',
        },
      ],
    })
  }

  if (enableBackgroundImage) {
    fields.push({
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      dbName: 'bg_img_id',
      admin: {
        description: 'Background image for this block',
      },
    } as Field)

    fields.push({
      name: 'backgroundImagePosition',
      type: 'select',
      defaultValue: 'center',
      dbName: 'bg_img_pos',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.backgroundImage),
      },
      options: [
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Top',
          value: 'top',
        },
        {
          label: 'Bottom',
          value: 'bottom',
        },
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    })
  }

  if (enableBackgroundVideo) {
    fields.push({
      name: 'backgroundVideo',
      type: 'upload',
      relationTo: 'media',
      dbName: 'bg_vid_id',
      admin: {
        description: 'Background video for this block (takes precedence over image)',
      },
    } as Field)
  }

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
