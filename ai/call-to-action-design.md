# Call to Action Block Design Reference

## Figma Design
- **File**: Reach Website Design
- **Node ID**: 11481:7845
- **URL**: https://www.figma.com/design/9A4ygFs0ji3BcELPeX9FhB/Reach-Website-Design?node-id=11481-7845&t=VHlI5KAhL8MYety7-4

## Design Specifications

### Layout
- Centered content with maximum width constraint
- Vertical stack of elements with consistent spacing
- Full-width background with decorative gradients

### Typography
- **Eyebrow**: 18px, SemiBold, Season Sans
- **Heading**: 72px, Regular, Season Mix, -1.44px letter spacing, 1.1 line height
- **Body**: 22px, Regular, Season Sans, 1.3 line height

### Colors
- **Text**: #1E1A15 (Reach Charcoal/Black)
- **Background**: #FAF7F5 (Reach Off-White)
- **Button Background**: #1E1A15 (Reach Black)
- **Button Text**: #FFFFFF (White)

### Spacing
- Container padding: 32px (desktop)
- Section vertical padding: 200px
- Element gaps: 24px between items
- Button padding: 12px vertical, 24px horizontal

### Effects
- Gradient background with blur (backdrop-blur-[241.834px] in original)
- Subtle color overlays with amber/stone tones
- Border radius: 6px on button

## Implementation Notes

The component uses:
- BlockWrapper for configurable padding and backgrounds
- RichText for flexible content (supports eyebrow, heading, body text)
- CMSLink for button(s)
- Tailwind classes matching the design system
- Brand colors from the theme (brand-black, brand-off-white)
- Season Mix font for large headings
- Season Sans font for eyebrow and body text

## Example Content Structure

```
Eyebrow text (p tag, first child)
Large Heading (h1)
Body paragraph (p tag)
[Button CTA]
```
