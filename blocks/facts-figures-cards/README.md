# Facts and Figures Cards

A flexible component for displaying statistical information and key facts in card format with various layouts and styling options.

## Overview

The Facts and Figures Cards block allows content authors to present statistical data, key figures, and important facts in an visually appealing card layout. The component supports multiple variants for different content types and layouts.

## Features

- **Multiple Card Variants**: H4 default, H3 highlighted, H5 short text, H5 long text
- **Flexible Sizing**: 4-column and 5-column layouts
- **Gradient Backgrounds**: Warm white gradient and blue gradient options
- **Responsive Design**: Optimized for all screen sizes
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Animation Support**: Scroll-triggered animations with reduced motion support
- **Character Count Validation**: Automatic validation based on variant limits
- **Analytics Tracking**: Built-in impression and interaction tracking

## Usage

### Content Model Fields

- **Title**: The main heading for the card
- **Text**: Supporting text or description
- **Variant**: Card type (H4 default, H3 highlighted, H5 short, H5 long)
- **Size**: Card width (4 columns or 5 columns)
- **Classes**: Styling options (highlighted, centered, warm-gradient, blue-gradient)

### Variants

#### H4 Default
- **Use Case**: Standard fact cards
- **Title**: H4 heading, max 45 characters
- **Size**: 4 columns width
- **Background**: Warm white gradient

#### H3 Highlighted
- **Use Case**: Key statistics that need emphasis
- **Title**: H3 heading, max 45 characters
- **Size**: 4 columns width
- **Background**: Blue gradient with white text

#### H5 Short Text
- **Use Case**: Simple facts with brief descriptions
- **Title**: H5 heading, max 80 characters
- **Size**: 5 columns width
- **Background**: Warm white gradient

#### H5 Long Text
- **Use Case**: Facts requiring more detailed explanations
- **Title**: H5 heading, max 200 characters
- **Size**: 5 columns width
- **Background**: Warm white gradient

### Styling Options

#### Layout Options
- `highlighted`: Applies blue gradient background with white text
- `centered`: Centers content alignment within cards

#### Background Options
- `warm-gradient`: Warm white gradient (default)
- `blue-gradient`: Blue to white gradient

## Examples

### Basic Usage
```html
<div class="facts-figures-cards block">
  <div>
    <div>
      <h4>€7.1 billion of Sales in 2021</h4>
    </div>
  </div>
  <div>
    <div>
      <h4>41,000 employees worldwide</h4>
    </div>
  </div>
</div>
```

### Highlighted Card
```html
<div class="facts-figures-cards block highlighted">
  <div>
    <div>
      <h3>€7.1 billion of Sales in 2021</h3>
    </div>
  </div>
</div>
```

### Multiple Card Layout
```html
<div class="facts-figures-cards block">
  <div>
    <div>
      <h4>€7.1 billion</h4>
      <p>Sales in 2021</p>
    </div>
    <div>
      <h4>41,000</h4>
      <p>employees worldwide</p>
    </div>
    <div>
      <h5>Lorem ipsum dolor sit amet</h5>
      <p>consectetur adipiscing elit, sed do eiusmod tempor</p>
    </div>
  </div>
</div>
```

## Character Limits

- **H4 Title**: Maximum 45 characters
- **H5 Short Text**: Maximum 80 characters
- **H5 Long Text**: Maximum 200 characters

Exceeding these limits will trigger a console warning and add a visual indicator.

## Responsive Behavior

- **Desktop (1024px+)**: Full grid layout with specified column widths
- **Tablet (768px-1023px)**: 2-column layout with adjusted spacing
- **Mobile (767px and below)**: Single column layout with optimized padding

## Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Semantic HTML**: Proper heading hierarchy
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences

## Animation

Cards animate into view when they enter the viewport with a subtle fade-in and slide-up effect. Animation can be disabled via CSS `prefers-reduced-motion` media query.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development

### File Structure
- `_facts-figures-cards.json`: Component definition and model
- `facts-figures-cards.js`: JavaScript functionality
- `facts-figures-cards.css`: Styling and responsive design
- `index.js`: Block registration entry point

### Customization

The component uses CSS custom properties for theming:
- `--background-color`: Primary background color
- `--text-color`: Primary text color
- `--heading-font-family`: Font family for headings
- `--body-font-family`: Font family for body text
- `--body-font-size-s`: Small body text size
- `--link-color`: Link color
- `--link-hover-color`: Link hover color

### Analytics Events

The component tracks the following events:
- `block_impression`: When the block enters the viewport
- `card_interaction`: When a user interacts with a card

## Performance

- **Lazy Loading**: Animations only initialize when cards enter viewport
- **Efficient Selectors**: Optimized CSS selectors for performance
- **Minimal JavaScript**: Lightweight code with no external dependencies
