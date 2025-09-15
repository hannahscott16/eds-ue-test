/**
 * Facts and Figures Cards Block
 * Displays statistical information and facts in card format with various layouts and styles
 */

/**
 * Configuration object for the block
 */
const config = {
  animationDuration: 600,
  breakpoints: {
    mobile: 768,
    tablet: 1024,
    desktop: 1200
  },
  maxCharacters: {
    h4: 45,
    h5Short: 80,
    h5Long: 200
  }
};

/**
 * CSS selectors used throughout the block
 */
const selectors = {
  cardTitle: '.facts-figures-cards-title',
  cardText: '.facts-figures-cards-text',
  cardContainer: '.facts-figures-cards-container'
};

/**
 * Main decoration function for the Facts and Figures Cards block
 * @param {HTMLElement} block - The block DOM element
 */
export default function decorate(block) {
  if (!block) return;

  try {
    // Add semantic classes and structure
    addSemanticClasses(block);
    
    // Process card content based on variant
    processCardContent(block);
    
    // Add accessibility features
    addAccessibilityFeatures(block);
    
    // Add animation support
    addScrollAnimations(block);
    
    // Add analytics tracking
    addAnalyticsTracking(block);
    
  } catch (error) {
    console.error('Facts and Figures Cards block initialization failed:', error);
  }
}

/**
 * Add semantic CSS classes to block elements
 * @param {HTMLElement} block - The block DOM element
 */
function addSemanticClasses(block) {
  // Add container wrapper
  block.classList.add('facts-figures-cards-container');
  
  // Process each card row
  const rows = [...block.children];
  rows.forEach((row, index) => {
    row.classList.add('facts-figures-cards-row');
    row.setAttribute('data-row-index', index);
    
    // Process cells within each row
    const cells = [...row.children];
    cells.forEach((cell, cellIndex) => {
      cell.classList.add('facts-figures-cards-cell');
      cell.setAttribute('data-cell-index', cellIndex);
      
      // Add semantic classes to content elements
      const title = cell.querySelector('h1, h2, h3, h4, h5, h6');
      if (title) {
        title.classList.add('facts-figures-cards-title');
      }
      
      const text = cell.querySelector('p');
      if (text) {
        text.classList.add('facts-figures-cards-text');
      }
    });
  });
}

/**
 * Process card content based on variant and size
 * @param {HTMLElement} block - The block DOM element
 */
function processCardContent(block) {
  // Get block options from CSS classes
  const blockOptions = getBlockOptions(block);
  const variant = getVariantFromClasses(blockOptions);
  const size = getSizeFromClasses(blockOptions);
  
  // Apply variant-specific processing
  const cells = block.querySelectorAll('.facts-figures-cards-cell');
  cells.forEach(cell => {
    processCardCell(cell, variant, size);
  });
}

/**
 * Process individual card cell based on variant
 * @param {HTMLElement} cell - The cell DOM element
 * @param {string} variant - The card variant
 * @param {string} size - The card size
 */
function processCardCell(cell, variant, size) {
  const title = cell.querySelector('.facts-figures-cards-title');
  const text = cell.querySelector('.facts-figures-cards-text');
  
  if (!title) return;
  
  // Apply variant-specific styling classes
  cell.classList.add(`variant-${variant}`);
  cell.classList.add(`size-${size}`);
  
  // Process title based on variant
  switch (variant) {
    case 'h4-default':
      processH4Title(title, text);
      break;
    case 'h3-highlighted':
      processH3Title(title, text);
      break;
    case 'h5-short':
    case 'h5-long':
      processH5Title(title, text, variant);
      break;
    default:
      processH4Title(title, text);
  }
  
  // Add character count validation
  validateCharacterCount(text, variant);
}

/**
 * Process H4 title variant
 * @param {HTMLElement} title - The title element
 * @param {HTMLElement} text - The text element
 */
function processH4Title(title, text) {
  // Ensure title is H4
  if (title.tagName !== 'H4') {
    const h4 = document.createElement('h4');
    h4.innerHTML = title.innerHTML;
    h4.className = title.className;
    title.parentNode.replaceChild(h4, title);
  }
}

/**
 * Process H3 highlighted title variant
 * @param {HTMLElement} title - The title element
 * @param {HTMLElement} text - The text element
 */
function processH3Title(title, text) {
  // Ensure title is H3
  if (title.tagName !== 'H3') {
    const h3 = document.createElement('h3');
    h3.innerHTML = title.innerHTML;
    h3.className = title.className;
    title.parentNode.replaceChild(h3, title);
  }
}

/**
 * Process H5 title variant
 * @param {HTMLElement} title - The title element
 * @param {HTMLElement} text - The text element
 * @param {string} variant - The specific H5 variant
 */
function processH5Title(title, text, variant) {
  // Ensure title is H5
  if (title.tagName !== 'H5') {
    const h5 = document.createElement('h5');
    h5.innerHTML = title.innerHTML;
    h5.className = title.className;
    title.parentNode.replaceChild(h5, title);
  }
  
  // Add variant-specific class
  title.classList.add(variant === 'h5-short' ? 'h5-short' : 'h5-long');
}

/**
 * Validate character count based on variant
 * @param {HTMLElement} text - The text element
 * @param {string} variant - The card variant
 */
function validateCharacterCount(text, variant) {
  if (!text) return;
  
  const textContent = text.textContent.trim();
  let maxChars;
  
  switch (variant) {
    case 'h4-default':
      maxChars = config.maxCharacters.h4;
      break;
    case 'h5-short':
      maxChars = config.maxCharacters.h5Short;
      break;
    case 'h5-long':
      maxChars = config.maxCharacters.h5Long;
      break;
    default:
      return;
  }
  
  if (textContent.length > maxChars) {
    console.warn(`Text length (${textContent.length}) exceeds recommended maximum (${maxChars}) for variant ${variant}`);
    text.setAttribute('data-overflow', 'true');
  }
}

/**
 * Add accessibility features
 * @param {HTMLElement} block - The block DOM element
 */
function addAccessibilityFeatures(block) {
  // Add ARIA label to the block
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Facts and Figures');
  
  // Add semantic structure for screen readers
  const titles = block.querySelectorAll('.facts-figures-cards-title');
  titles.forEach((title, index) => {
    if (!title.id) {
      title.id = `facts-figure-${index + 1}`;
    }
    
    // Associate text with title for screen readers
    const text = title.parentNode.querySelector('.facts-figures-cards-text');
    if (text) {
      text.setAttribute('aria-describedby', title.id);
    }
  });
  
  // Add keyboard navigation support if interactive
  const cells = block.querySelectorAll('.facts-figures-cards-cell');
  cells.forEach(cell => {
    const links = cell.querySelectorAll('a');
    if (links.length > 0) {
      cell.setAttribute('tabindex', '0');
    }
  });
}

/**
 * Add scroll-based animations
 * @param {HTMLElement} block - The block DOM element
 */
function addScrollAnimations(block) {
  // Create intersection observer for animation trigger
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCardsEntry(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe each card cell for animation
  const cells = block.querySelectorAll('.facts-figures-cards-cell');
  cells.forEach((cell, index) => {
    cell.style.opacity = '0';
    cell.style.transform = 'translateY(40px)';
    cell.setAttribute('data-animation-delay', index * 100);
    observer.observe(cell);
  });
}

/**
 * Animate cards entry into viewport
 * @param {HTMLElement} cell - The card cell to animate
 */
function animateCardsEntry(cell) {
  const delay = parseInt(cell.getAttribute('data-animation-delay')) || 0;
  
  setTimeout(() => {
    cell.style.transition = `opacity ${config.animationDuration}ms ease-out, transform ${config.animationDuration}ms ease-out`;
    cell.style.opacity = '1';
    cell.style.transform = 'translateY(0)';
  }, delay);
}

/**
 * Add analytics tracking
 * @param {HTMLElement} block - The block DOM element
 */
function addAnalyticsTracking(block) {
  // Track block impression
  const impressionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        trackBlockImpression(block);
        impressionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  impressionObserver.observe(block);
  
  // Track interactions with cards
  const cells = block.querySelectorAll('.facts-figures-cards-cell');
  cells.forEach((cell, index) => {
    const links = cell.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        trackCardInteraction(block, cell, index, e);
      });
    });
  });
}

/**
 * Track block impression for analytics
 * @param {HTMLElement} block - The block DOM element
 */
function trackBlockImpression(block) {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'block_impression',
      block_type: 'facts-figures-cards',
      block_variant: getBlockVariant(block)
    });
  }
}

/**
 * Track card interaction for analytics
 * @param {HTMLElement} block - The block DOM element
 * @param {HTMLElement} cell - The card cell
 * @param {number} index - The card index
 * @param {Event} event - The click event
 */
function trackCardInteraction(block, cell, index, event) {
  if (window.dataLayer) {
    const title = cell.querySelector('.facts-figures-cards-title');
    window.dataLayer.push({
      event: 'card_interaction',
      block_type: 'facts-figures-cards',
      card_index: index,
      card_title: title ? title.textContent.trim() : '',
      interaction_type: 'click'
    });
  }
}

/**
 * Get block options from CSS classes
 * @param {HTMLElement} block - The block DOM element
 * @returns {string[]} Array of option classes
 */
function getBlockOptions(block) {
  return [...block.classList].filter(c => 
    !['block', 'facts-figures-cards', 'facts-figures-cards-container'].includes(c)
  );
}

/**
 * Get variant from block classes
 * @param {string[]} classes - Array of CSS classes
 * @returns {string} The variant name
 */
function getVariantFromClasses(classes) {
  const variantClass = classes.find(c => c.startsWith('variant-'));
  return variantClass ? variantClass.replace('variant-', '') : 'h4-default';
}

/**
 * Get size from block classes
 * @param {string[]} classes - Array of CSS classes
 * @returns {string} The size name
 */
function getSizeFromClasses(classes) {
  const sizeClass = classes.find(c => c.startsWith('col-'));
  return sizeClass || 'col-4';
}

/**
 * Get block variant for analytics
 * @param {HTMLElement} block - The block DOM element
 * @returns {string} The block variant
 */
function getBlockVariant(block) {
  const options = getBlockOptions(block);
  return options.length > 0 ? options.join(' ') : 'default';
}
