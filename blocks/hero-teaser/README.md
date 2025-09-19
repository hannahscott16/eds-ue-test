# Hero Teaser Block

A comprehensive hero banner component designed for Universal Editor with background image support, rich content options, and multiple call-to-action buttons.

## Features

- **Background Image Support**: Full-screen background images with proper responsive behavior
- **Rich Content Options**: Eyebrow text, title with configurable heading levels, and rich text descriptions
- **Multiple CTAs**: Primary and secondary call-to-action buttons with different styling
- **Block Options**: Multiple layout, theme, and size variants
- **Accessibility**: Full WCAG compliance with ARIA labels and keyboard navigation
- **Performance**: Optimized image loading and responsive design
- **Analytics Ready**: Built-in tracking for user interactions

## Content Model

### Fields

| Field | Type | Label | Description |
|-------|------|-------|-------------|
| `backgroundImage` | reference | Background Image | Main background image for the hero |
| `imageAlt` | text | Image Alt Text | Alt text for accessibility |
| `eyebrow` | text | Eyebrow Text | Small text above the title |
| `title` | text | Title | Main heading text |
| `titleType` | select | Title Type | Heading level (h1, h2, h3) |
| `description` | richtext | Description | Rich text content below title |
| `primaryCTA` | text | Primary CTA URL | URL for primary button |
| `primaryCTAText` | text | Primary CTA Text | Text for primary button |
| `primaryCTAType` | select | Primary CTA Type | Button style (default, primary, secondary) |
| `secondaryCTA` | text | Secondary CTA URL | URL for secondary button |
| `secondaryCTAText` | text | Secondary CTA Text | Text for secondary button |
| `classes` | multiselect | Block Options | Layout, theme, and size options |

### Block Options

#### Layout Options
- **Default**: Centered layout (default)
- **Centered**: Explicitly centered content
- **Left Aligned**: Content aligned to the left
- **Right Aligned**: Content aligned to the right

#### Theme Options
- **Light**: Light theme with dark text
- **Dark**: Dark theme with overlay
- **Overlay**: Gradient overlay on background image

#### Size Options
- **Standard**: Default height (500px)
- **Large**: Larger height (700px) with bigger text
- **Full Height**: Full viewport height (100vh)

## Usage Examples

### Basic Hero Teaser

`
| Hero Teaser |
|---|
| ![Background Image](./background.jpg) |
| New Product Launch |
| Introducing Our Latest Innovation |
| Discover the future of technology with our groundbreaking new product. Built for performance, designed for you. |
| /products/new-launch | Learn More |
| /contact | Get in Touch |
`

### Centered Large Hero

`
| Hero Teaser |
|---|
| ![Background Image](./hero-bg.jpg) |
| Featured |
| Welcome to the Future |
| Experience innovation like never before with our cutting-edge solutions. |
| /get-started | Get Started |
| classes: centered, large |
`

### Left-Aligned Dark Hero

`
| Hero Teaser |
|---|
| ![Background Image](./dark-bg.jpg) |
| Exclusive |
| Premium Experience |
| Unlock premium features and take your experience to the next level. |
| /premium | Upgrade Now |
| /learn-more | Learn More |
| classes: left-aligned, dark |
`

## CSS Classes

### Main Block Classes
- `.hero-teaser-container` - Main container wrapper
- `.hero-teaser` - Block element with styling

### Content Classes
- `.hero-teaser-background` - Background image wrapper
- `.hero-teaser-content` - Content container
- `.hero-teaser-eyebrow` - Eyebrow text styling
- `.hero-teaser-title` - Title styling
- `.hero-teaser-description` - Description text styling
- `.hero-teaser-actions` - CTA buttons container
- `.hero-teaser-primary-cta` - Primary button styling
- `.hero-teaser-secondary-cta` - Secondary button styling

### Block Option Classes
- `.centered` - Centered layout
- `.left-aligned` - Left-aligned layout  
- `.right-aligned` - Right-aligned layout
- `.light` - Light theme variant
- `.dark` - Dark theme variant
- `.overlay` - Overlay theme variant
- `.large` - Large size variant
- `.full-height` - Full height variant

## Responsive Behavior

### Mobile (< 768px)
- Stacked button layout
- Reduced font sizes
- Minimum height: 400px
- Full-width buttons with max-width

### Tablet (768px - 1023px)
- Horizontal button layout
- Medium font sizes
- Minimum height: 550px

### Desktop (≥ 1024px)
- Full feature set
- Hover effects enabled
- Minimum height: 500px (or variant size)

## Accessibility Features

### ARIA Support
- Proper heading hierarchy with `aria-level`
- Role attributes for semantic structure
- ARIA labels for interactive elements

### Keyboard Navigation
- Full keyboard support for all interactive elements
- Visible focus indicators
- Enter and Space key support for buttons

### Screen Reader Support
- Semantic HTML structure
- Descriptive alt text for images
- Screen reader only content where needed

### High Contrast Mode
- Enhanced border widths
- Improved overlay contrast
- Maintained visual hierarchy

## Performance Features

### Image Optimization
- Lazy loading support
- Intersection Observer API
- Responsive image handling
- Fade-in animation on load

### JavaScript Optimization
- Minimal DOM manipulation
- Event delegation
- Cleanup functions for memory management
- Defensive coding patterns

## Analytics Integration

The block automatically tracks the following events:

### Button Clicks
`
{
  event: 'hero_teaser_interaction',
  block_type: 'hero-teaser',
  action: 'button_click',
  button_type: 'primary' | 'secondary',
  button_text: 'Button Text',
  href: 'URL'
}
`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Notes

### File Structure
`
blocks/hero-teaser/
├── _hero-teaser.json     # Block definition and model
├── hero-teaser.js        # JavaScript functionality
├── hero-teaser.css       # Block styling
└── README.md            # This documentation
`

### JavaScript Architecture
- Modular function design
- Configuration object pattern
- Async/await for modern syntax
- Error handling and logging
- Performance optimization

### CSS Architecture
- CSS custom properties for theming
- Mobile-first responsive design
- BEM-like naming conventions
- Accessibility enhancements
- Performance optimizations

## Customization

### Adding New Themes
1. Add theme option to `_hero-teaser.json`
2. Implement CSS class in `hero-teaser.css`
3. Test across all responsive breakpoints

### Extending Functionality
1. Modify JavaScript decoration function
2. Add new CSS classes as needed
3. Update documentation
4. Test thoroughly

## Troubleshooting

### Common Issues

**Block not appearing in Universal Editor**
- Ensure `npm run build:json` has been run
- Check that block is added to component filters
- Verify JSON syntax is valid

**Styling not applied**
- Check CSS class naming conventions
- Ensure styles are scoped to `.hero-teaser`
- Verify block name matches folder name

**Images not loading**
- Check image paths and permissions
- Verify alt text is provided
- Test responsive image behavior

**JavaScript errors**
- Check browser console for errors
- Verify all dependencies are available
- Test with minimal content first

## Version History

- **v1.0.0** - Initial release with full feature set
  - Background image support
  - Rich content options
  - Multiple CTA buttons
  - Block options for layout, theme, and size
  - Full accessibility support
  - Performance optimizations
  - Analytics integration
