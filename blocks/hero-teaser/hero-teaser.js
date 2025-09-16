/**
 * Hero Teaser Block
 * A hero banner component with background image, text content, and call-to-action buttons
 */

// Configuration object for the hero teaser block
const CONFIG = {
  selectors: {
    backgroundImage: 'picture',
    image: 'img',
    eyebrow: '.hero-teaser-eyebrow',
    title: '.hero-teaser-title',
    description: '.hero-teaser-description',
    primaryCTA: '.hero-teaser-primary-cta',
    secondaryCTA: '.hero-teaser-secondary-cta',
    content: '.hero-teaser-content',
    actions: '.hero-teaser-actions'
  },
  classes: {
    container: 'hero-teaser-container',
    wrapper: 'hero-teaser-wrapper',
    background: 'hero-teaser-background',
    content: 'hero-teaser-content',
    eyebrow: 'hero-teaser-eyebrow',
    title: 'hero-teaser-title',
    description: 'hero-teaser-description',
    actions: 'hero-teaser-actions',
    primaryCTA: 'hero-teaser-primary-cta',
    secondaryCTA: 'hero-teaser-secondary-cta',
    imageLoaded: 'image-loaded'
  }
};

/**
 * Add semantic CSS classes to block elements for better maintainability
 * @param {HTMLElement} block - The block DOM element
 */
const addSemanticClasses = (block) => {
  // Add container class to the main block
  block.classList.add(CONFIG.classes.container);
  
  // Get all direct children (rows)
  const rows = [...block.children];
  
  rows.forEach((row, index) => {
    const cells = [...row.children];
    
    // Process background image (first row)
    if (index === 0 && cells[0]) {
      const picture = cells[0].querySelector('picture');
      if (picture) {
        picture.classList.add(CONFIG.classes.background);
        const img = picture.querySelector('img');
        if (img) {
          img.classList.add('hero-teaser-image');
        }
      }
    }
    
    // Process content rows
    if (index > 0) {
      cells.forEach((cell) => {
        // Handle eyebrow text
        const firstP = cell.querySelector('p:first-child');
        if (firstP && firstP.textContent.trim() && !firstP.querySelector('a')) {
          const text = firstP.textContent.trim();
          // Check if it's likely an eyebrow (short text, all caps, or contains specific keywords)
          if (text.length < 50 && (text === text.toUpperCase() || 
              text.toLowerCase().includes('new') || 
              text.toLowerCase().includes('featured') ||
              text.toLowerCase().includes('exclusive'))) {
            firstP.classList.add(CONFIG.classes.eyebrow);
          }
        }
        
        // Handle titles
        const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) {
          heading.classList.add(CONFIG.classes.title);
        }
        
        // Handle description paragraphs
        const paragraphs = cell.querySelectorAll('p:not(.button-container):not(.hero-teaser-eyebrow)');
        paragraphs.forEach((p) => {
          if (!p.querySelector('a') && p.textContent.trim()) {
            p.classList.add(CONFIG.classes.description);
          }
        });
        
        // Handle button containers
        const buttonContainers = cell.querySelectorAll('.button-container');
        if (buttonContainers.length > 0) {
          // Create actions wrapper if it doesn't exist
          let actionsWrapper = cell.querySelector(`.${CONFIG.classes.actions}`);
          if (!actionsWrapper) {
            actionsWrapper = document.createElement('div');
            actionsWrapper.classList.add(CONFIG.classes.actions);
            cell.appendChild(actionsWrapper);
          }
          
          buttonContainers.forEach((container, btnIndex) => {
            const button = container.querySelector('a');
            if (button) {
              if (btnIndex === 0) {
                button.classList.add(CONFIG.classes.primaryCTA);
              } else {
                button.classList.add(CONFIG.classes.secondaryCTA);
              }
            }
            actionsWrapper.appendChild(container);
          });
        }
      });
    }
  });
  
  // Wrap all content (non-background) in a content container
  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add(CONFIG.classes.content);
  
  const contentRows = [...block.children].slice(1);
  contentRows.forEach((row) => {
    contentWrapper.appendChild(row);
  });
  
  if (contentRows.length > 0) {
    block.appendChild(contentWrapper);
  }
};

/**
 * Process special content patterns and enhance accessibility
 * @param {HTMLElement} block - The block DOM element
 */
const processSpecialContent = (block) => {
  // Add ARIA labels and roles
  const title = block.querySelector(`.${CONFIG.classes.title}`);
  if (title) {
    title.setAttribute('role', 'heading');
    title.setAttribute('aria-level', title.tagName.charAt(1));
  }
  
  // Add semantic structure
  const contentArea = block.querySelector(`.${CONFIG.classes.content}`);
  if (contentArea) {
    contentArea.setAttribute('role', 'main');
    contentArea.setAttribute('aria-labelledby', title?.id || 'hero-title');
  }
  
  // Process background image for accessibility
  const backgroundImage = block.querySelector('.hero-teaser-image');
  if (backgroundImage) {
    backgroundImage.setAttribute('role', 'img');
    if (!backgroundImage.getAttribute('alt')) {
      backgroundImage.setAttribute('alt', 'Hero background image');
    }
  }
  
  // Handle button accessibility
  const buttons = block.querySelectorAll('a.button');
  buttons.forEach((button, index) => {
    if (!button.getAttribute('aria-label')) {
      const text = button.textContent.trim();
      button.setAttribute('aria-label', `${text} - ${index === 0 ? 'Primary' : 'Secondary'} action`);
    }
  });
};

/**
 * Add event listeners for interactive features
 * @param {HTMLElement} block - The block DOM element
 */
const addEventListeners = (block) => {
  // Add image loading optimization
  const backgroundImage = block.querySelector('.hero-teaser-image');
  if (backgroundImage) {
    const handleImageLoad = () => {
      block.classList.add(CONFIG.classes.imageLoaded);
      backgroundImage.removeEventListener('load', handleImageLoad);
    };
    
    if (backgroundImage.complete) {
      handleImageLoad();
    } else {
      backgroundImage.addEventListener('load', handleImageLoad);
    }
  }
  
  // Add analytics tracking for buttons
  const buttons = block.querySelectorAll('a.button');
  buttons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
      // Track button clicks for analytics
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'hero_teaser_interaction',
          block_type: 'hero-teaser',
          action: 'button_click',
          button_type: index === 0 ? 'primary' : 'secondary',
          button_text: button.textContent.trim(),
          href: button.href
        });
      }
    });
  });
  
  // Add keyboard navigation support
  buttons.forEach((button) => {
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        button.click();
      }
    });
  });
};

/**
 * Add performance optimizations
 * @param {HTMLElement} block - The block DOM element
 */
const addPerformanceOptimizations = (block) => {
  // Implement intersection observer for lazy loading if needed
  const images = block.querySelectorAll('img[data-src]');
  if (images.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach((img) => imageObserver.observe(img));
  }
};

/**
 * Initialize block options based on CSS classes
 * @param {HTMLElement} block - The block DOM element
 */
const initializeBlockOptions = (block) => {
  const blockClasses = [...block.classList];
  
  // Handle responsive behavior for different screen sizes
  const handleResize = () => {
    const isSmallScreen = window.innerWidth < 768;
    const isMediumScreen = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    block.setAttribute('data-screen-size', 
      isSmallScreen ? 'small' : 
      isMediumScreen ? 'medium' : 'large'
    );
  };
  
  // Initial call and add resize listener
  handleResize();
  window.addEventListener('resize', handleResize);
  
  // Store cleanup function for later use
  block.cleanup = () => {
    window.removeEventListener('resize', handleResize);
  };
};

/**
 * Main decoration function - entry point for block enhancement
 * @param {HTMLElement} block - The block DOM element
 */
export default async function decorate(block) {
  try {
    // Check if block exists
    if (!block) {
      console.warn('Hero Teaser: Block element not found');
      return;
    }
    
    // Add semantic CSS classes for better maintainability
    addSemanticClasses(block);
    
    // Process special content patterns and enhance accessibility
    processSpecialContent(block);
    
    // Add interactive event listeners
    addEventListeners(block);
    
    // Add performance optimizations
    addPerformanceOptimizations(block);
    
    // Initialize block options and responsive behavior
    initializeBlockOptions(block);
    
    // Mark block as fully initialized
    block.setAttribute('data-hero-teaser-ready', 'true');
    
  } catch (error) {
    console.error('Hero Teaser: Block initialization failed:', error);
  }
}
