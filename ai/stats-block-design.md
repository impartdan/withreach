# Stats Block Design Reference

## Figma Design
- **File**: Reach Website Design
- **Node ID**: 11482:10385
- **URL**: https://www.figma.com/design/9A4ygFs0ji3BcELPeX9FhB/Reach-Website-Design?node-id=11482-10385&t=VHlI5KAhL8MYety7-4

## Design Specifications

### Layout
- Horizontal layout with heading on the left
- Stats displayed in a row with vertical dividers
- Responsive: 2-column grid on mobile, horizontal row on desktop
- Heading has a right border on desktop to separate from stats

### Typography
- **Heading**: 3xl on mobile, 4xl on desktop, normal weight
- **Stat Values**: 4xl on mobile, 5xl on desktop, normal weight
- **Stat Descriptions**: sm on mobile, base on desktop, 70% opacity

### Colors
- **Text**: #1E1A15 (Reach Charcoal/Black)
- **Background**: Light/off-white (from BlockWrapper settings)
- **Dividers**: #1E1A15 with 20% opacity

### Spacing
- Gap between heading and stats: 12px (lg:0 with padding)
- Stats grid gap: 6px on mobile, 8px on desktop
- Heading right padding: 12px (desktop)
- Stats left padding: 12px (desktop)
- Border between stats: 8px padding left

### Effects
- Clean, minimal design with no cards or shadows
- Vertical dividers between stats using border-left
- Responsive breakpoint at `lg` (1024px)

## Implementation Notes

The component:
- Uses BlockWrapper for configurable padding and backgrounds
- Removed icon support (not in new design)
- Horizontal flex layout on desktop, stacked on mobile
- Stats use 2-column grid on mobile to fit better
- Clean, minimal styling matching the Figma design
- Dividers implemented with border utilities

## Admin Thumbnail
- Located at: `/public/block-thumbnails/stats-block.png`
- Fetched directly from Figma using REST API
- Added to block config using `imageURL` property

## Example Content Structure

```
Heading (left side)
  |
  | Stat 1   | Stat 2   | Stat 3   | Stat 4
  | $3B      | ##       | 130+     | 90%+
  | Desc 1   | Desc 2   | Desc 3   | Desc 4
```

## Changes from Previous Design

1. **Layout**: Changed from 4-column grid of dark cards to horizontal row with dividers
2. **Background**: Reversed - now light background with dark text (was dark cards with light text)
3. **Heading**: Moved from centered above to left side with divider
4. **Icons**: Removed icon support (not in new design)
5. **Cards**: Removed individual card styling (no backgrounds, borders, or shadows)
6. **Simplification**: Much cleaner, more minimal design overall
