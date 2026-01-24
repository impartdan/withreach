# Text Image Feature Block

## Overview

The Text Image Feature block is a flexible content block designed for showcasing features with a combination of text content and images side by side. It's perfect for highlighting product features, benefits, or use cases.

## Design Source

Based on the Figma design: [Reach Website Design - Text Image Feature](https://www.figma.com/design/9A4ygFs0ji3BcELPeX9FhB/Reach-Website-Design?node-id=11276-2352&t=VHlI5KAhL8MYety7-4)

## Features

- **Flexible Layout**: Choose image position (left or right)
- **Content Alignment**: Align text content (left, center, or right)
- **Rich Text Support**: Use rich text formatting for descriptions
- **Multiple CTAs**: Add up to 3 call-to-action buttons
- **1-2 Images**: Display one or two images side by side
- **Block Settings**: Full support for padding, backgrounds, and other block settings

## Files Created

- `/src/blocks/TextImageFeature/Component.tsx` - React component
- `/src/blocks/TextImageFeature/config.ts` - Payload CMS configuration
- `/public/block-thumbnails/text-image-feature.png` - Admin panel thumbnail (900x600px from Figma design)

## Usage in CMS

When editing a page in Payload CMS:

1. Go to the "Content" tab
2. Click "Add Block"
3. Select "Text Image Feature"
4. Fill in the content:
   - **Heading**: Main heading (required)
   - **Description**: Rich text description
   - **Links**: Add up to 3 call-to-action buttons
   - **Images**: Upload 1-2 images (required)
5. Configure layout:
   - **Image Position**: Left or Right
   - **Content Alignment**: Left, Center, or Right
6. Adjust block settings (padding, background, etc.)

## Styling

The component uses:
- Background: `brand-off-white` (#FAF7F5)
- Text: `brand-black` (#1E1A15)
- Font: Season Mix (light weight) for headings
- Rounded corners: 12px
- Responsive: Mobile-first design with stacking on small screens

## Implementation Details

### Component Structure

```tsx
TextImageFeatureBlock
├── Container with background
├── Text Content Section
│   ├── Heading
│   ├── Description (RichText)
│   └── Call-to-Action Links
└── Images Section
    ├── Image 1
    └── Image 2 (optional)
```

### Props

```typescript
interface TextImageFeatureBlockProps {
  heading: string
  content: RichText
  links?: Array<{ link: Link }>
  images: Array<{ image: Media }>
  imagePosition?: 'left' | 'right'
  contentAlignment?: 'left' | 'center' | 'right'
  blockSettings?: BlockSettings
}
```

## Registered In

- **Pages Collection** (`/src/collections/Pages/index.ts`)
- **RenderBlocks Component** (`/src/blocks/RenderBlocks.tsx`)

## Example Content

**Heading**: "Built for global sellers"

**Description**: "Integrate easily to collect subscriptions and sell goods wherever your customers are—all while using your current stack and fulfillment providers."

**Links**:
- "View digital solutions"
- "View retail solutions"

**Images**: 2 images showing product in use

## Future Enhancements

Potential improvements for future iterations:
- Add support for image captions
- Add video support alongside images
- Add icon/badge option above heading
- Add statistics/metrics overlay on images
