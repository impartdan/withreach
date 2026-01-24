import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type BlockSettingsOptions = {
  enablePadding?: boolean
  enableBackground?: boolean
  enableBackgroundImage?: boolean
  enableBackgroundVideo?: boolean
  defaultPaddingTop?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
  defaultPaddingBottom?: 'none' | 'small' | 'medium' | 'large' | 'xlarge'
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
    defaultPaddingTop = 'medium',
    defaultPaddingBottom = 'medium',
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
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Large',
          value: 'large',
        },
        {
          label: 'XLarge',
          value: 'xlarge',
        },
      ],
    })

    fields.push({
      name: 'paddingBottom',
      type: 'select',
      defaultValue: defaultPaddingBottom,
      dbName: 'pb',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Small',
          value: 'small',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'Large',
          value: 'large',
        },
        {
          label: 'XLarge',
          value: 'xlarge',
        },
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
    } as any)

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
    } as any)
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
