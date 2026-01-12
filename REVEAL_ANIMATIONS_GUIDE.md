# Reveal Animations Implementation Guide

## ✅ Installation Complete

Framer Motion has been installed and reusable components have been created:
- `src/components/ui/reveal-on-scroll.tsx` - Single element animations
- `src/components/ui/reveal-list.tsx` - List/grid animations with stagger
- `src/components/ui/reveal.tsx` - Barrel export for convenience

## Quick Start Examples

### Example 1: Simple Section Reveal

```tsx
import { RevealOnScroll } from '@/components/ui/reveal'

// Before
<section>
  <h1>Welcome to our site</h1>
  <p>Some content here</p>
</section>

// After - adds fade + slide up animation
<RevealOnScroll variant="slideUp">
  <section>
    <h1>Welcome to our site</h1>
    <p>Some content here</p>
  </section>
</RevealOnScroll>
```

### Example 2: Staggered Cards/Grid

```tsx
import { RevealList, RevealListItem } from '@/components/ui/reveal'

// Before
<div className="grid grid-cols-3 gap-4">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
</div>

// After - cards fade in one by one
<RevealList className="grid grid-cols-3 gap-4" staggerDelay={0.1}>
  <RevealListItem><Card>Item 1</Card></RevealListItem>
  <RevealListItem><Card>Item 2</Card></RevealListItem>
  <RevealListItem><Card>Item 3</Card></RevealListItem>
</RevealList>
```

### Example 3: Multiple Independent Reveals

```tsx
import { RevealOnScroll } from '@/components/ui/reveal'

<div>
  <RevealOnScroll variant="slideUp" delay={0}>
    <h2>First element</h2>
  </RevealOnScroll>
  
  <RevealOnScroll variant="slideUp" delay={0.2}>
    <p>Second element with slight delay</p>
  </RevealOnScroll>
  
  <RevealOnScroll variant="slideUp" delay={0.4}>
    <button>Third element</button>
  </RevealOnScroll>
</div>
```

## Real Example: Integrations Grid

Here's how to add animations to your existing integrations grid:

### Before (Current Code)
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  {displayedIntegrations.map((integration) => (
    <IntegrationCard key={integration.id} integration={integration} />
  ))}
</div>
```

### After (With Stagger Animation)
```tsx
import { RevealList, RevealListItem } from '@/components/ui/reveal'

<RevealList 
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
  staggerDelay={0.08}
>
  {displayedIntegrations.map((integration) => (
    <RevealListItem key={integration.id}>
      <IntegrationCard integration={integration} />
    </RevealListItem>
  ))}
</RevealList>
```

## Animation Variants

Choose the animation style that fits your design:

| Variant | Effect | Best For |
|---------|--------|----------|
| `fadeIn` | Simple fade | Subtle, minimal design |
| `slideUp` | Fade + slide from bottom | Hero sections, cards |
| `slideDown` | Fade + slide from top | Headers, navigation |
| `slideLeft` | Fade + slide from right | Content blocks |
| `slideRight` | Fade + slide from left | Sidebars, content |
| `scaleIn` | Fade + scale up | Call-to-actions, buttons |

## Suggested Implementations

### 1. Hero Sections
```tsx
<RevealOnScroll variant="slideUp" duration={0.8}>
  <h1>Your Hero Heading</h1>
</RevealOnScroll>
<RevealOnScroll variant="slideUp" delay={0.2} duration={0.8}>
  <p>Your hero description</p>
</RevealOnScroll>
<RevealOnScroll variant="slideUp" delay={0.4}>
  <Button>Call to Action</Button>
</RevealOnScroll>
```

### 2. Feature Sections
```tsx
<RevealList staggerDelay={0.15}>
  {features.map(feature => (
    <RevealListItem key={feature.id}>
      <FeatureCard {...feature} />
    </RevealListItem>
  ))}
</RevealList>
```

### 3. Content Blocks
```tsx
<RevealOnScroll variant="slideRight" amount={0.3}>
  <article>
    <h2>Article Title</h2>
    <p>Article content...</p>
  </article>
</RevealOnScroll>
```

### 4. Image/Media
```tsx
<RevealOnScroll variant="scaleIn" duration={0.7}>
  <img src="..." alt="..." />
</RevealOnScroll>
```

## Configuration Tips

### Viewport Amount (Trigger Point)
- `0.1` - Triggers early (good for large sections)
- `0.2` - Default (balanced for most content)
- `0.5` - Triggers when half visible
- `0.8` - Triggers late (more dramatic reveals)

### Duration
- `0.4` - Quick (good for small UI elements)
- `0.6` - Default (balanced)
- `0.8` - Slower (good for hero sections)
- `1.0+` - Very slow (use sparingly)

### Stagger Delay (for lists)
- `0.05` - Fast succession
- `0.1` - Default (nice balance)
- `0.15` - More noticeable
- `0.2+` - Dramatic (use for small lists)

## Performance Best Practices

1. **Always use `once={true}`** (default) - Animations only trigger once for better performance
2. **Avoid animating on scroll continuously** - Set `once={false}` sparingly
3. **Use appropriate amounts** - Larger sections should trigger earlier (lower amount)
4. **Don't animate everything** - Be selective for best effect
5. **Test on mobile** - Ensure animations don't feel too slow on slower devices

## Accessibility

These components automatically respect `prefers-reduced-motion`. Users who have this setting enabled will see minimal or no animations.

## Next Steps

1. Start with your hero sections and main content blocks
2. Add to important CTAs and feature sections
3. Apply to grids and card layouts
4. Fine-tune durations and delays based on feel
5. Test on various screen sizes and devices

## Need Help?

Check `src/components/ui/reveal-examples.md` for more detailed examples and API documentation.
