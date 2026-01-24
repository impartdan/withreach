# Reveal Animation Components

Scroll-triggered reveal animations using Framer Motion.

## Components

### RevealOnScroll
Animates a single element when it scrolls into view.

### RevealList & RevealListItem
Animates multiple items with a stagger effect.

## Usage Examples

### Basic Fade In

```tsx
import { RevealOnScroll } from '@/components/ui/reveal'

<RevealOnScroll>
  <h1>This fades in when scrolled into view</h1>
</RevealOnScroll>
```

### Slide Up Animation

```tsx
<RevealOnScroll variant="slideUp">
  <div className="card">
    This slides up and fades in
  </div>
</RevealOnScroll>
```

### Available Variants

- `fadeIn` - Simple opacity fade (default)
- `slideUp` - Fade + slide from bottom
- `slideDown` - Fade + slide from top
- `slideLeft` - Fade + slide from right
- `slideRight` - Fade + slide from left
- `scaleIn` - Fade + scale up

### Custom Duration and Delay

```tsx
<RevealOnScroll 
  variant="slideUp" 
  duration={0.8} 
  delay={0.2}
>
  <p>Slower animation with delay</p>
</RevealOnScroll>
```

### Staggered Animations

```tsx
<RevealOnScroll variant="slideUp" delay={0}>
  <h2>First</h2>
</RevealOnScroll>
<RevealOnScroll variant="slideUp" delay={0.2}>
  <p>Second</p>
</RevealOnScroll>
<RevealOnScroll variant="slideUp" delay={0.4}>
  <button>Third</button>
</RevealOnScroll>
```

### List with Auto-Stagger

```tsx
import { RevealList, RevealListItem } from '@/components/ui/reveal'

<RevealList staggerDelay={0.15}>
  <RevealListItem>
    <div>Item 1</div>
  </RevealListItem>
  <RevealListItem>
    <div>Item 2</div>
  </RevealListItem>
  <RevealListItem>
    <div>Item 3</div>
  </RevealListItem>
</RevealList>
```

### Custom Trigger Amount

```tsx
// Trigger when 50% of element is visible
<RevealOnScroll variant="scaleIn" amount={0.5}>
  <div className="large-card">Content</div>
</RevealOnScroll>

// Trigger almost immediately (10% visible)
<RevealOnScroll variant="fadeIn" amount={0.1}>
  <p>Triggers early</p>
</RevealOnScroll>
```

### Repeat Animation on Every Scroll

```tsx
// By default, animations trigger once. Set once={false} to repeat
<RevealOnScroll variant="slideUp" once={false}>
  <div>This animates every time you scroll past</div>
</RevealOnScroll>
```

## Props

### RevealOnScroll Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'fadeIn' \| 'slideUp' \| 'slideDown' \| 'slideLeft' \| 'slideRight' \| 'scaleIn'` | `'fadeIn'` | Animation type |
| `duration` | `number` | `0.6` | Animation duration in seconds |
| `delay` | `number` | `0` | Delay before animation starts |
| `amount` | `number` | `0.2` | How much of element must be visible (0-1) |
| `once` | `boolean` | `true` | Whether to animate only once |
| `className` | `string` | - | CSS classes to apply |

### RevealList Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `staggerDelay` | `number` | `0.1` | Delay between each child animation |
| `amount` | `number` | `0.2` | How much of container must be visible |
| `once` | `boolean` | `true` | Whether to animate only once |
| `className` | `string` | - | CSS classes to apply |

## Accessibility

These components automatically respect the user's `prefers-reduced-motion` setting. If a user has reduced motion enabled, animations will be minimal or disabled.

## Performance Tips

1. Use `once={true}` (default) to prevent re-triggering animations
2. Use appropriate `amount` values - larger elements should use smaller amounts (0.1-0.2)
3. Avoid animating too many elements simultaneously on the same page
4. The components use CSS transforms which are GPU-accelerated for smooth performance
