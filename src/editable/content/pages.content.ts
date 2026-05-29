import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Browse offers, services, and local updates',
      description: 'Explore a cleaner feed of offers, rentals, services, and business posts with fast scanning and clear detail.',
      openGraphTitle: 'Discover local offers and practical listings',
      openGraphDescription: 'A polished feed that keeps browsing simple, visual, and easy to act on.',
      keywords: ['classifieds', 'local offers', 'listings', 'services', 'rentals'],
    },
    hero: {
      badge: 'Featured feed',
      title: ['Search less. Spot the right post faster.'],
      description: 'A crisp homepage layout with category shortcuts, featured cards, and practical updates in one place.',
      primaryCta: { label: 'Browse classified', href: '/classified' },
      secondaryCta: { label: 'Open listings', href: '/listing' },
      searchPlaceholder: 'Search cars, rentals, services, and more',
      focusLabel: 'Browse by category',
      featureCardBadge: 'highlighted',
      featureCardTitle: 'A featured panel for posts that deserve more attention.',
      featureCardDescription: 'Clear image treatment, tighter copy, and direct action buttons keep the browsing flow fast.',
    },
    intro: {
      badge: 'Why it works',
      title: 'A sharper browsing experience for everyday posting and discovery.',
      paragraphs: ['The layout gives each post room to breathe while keeping the feed dense enough for quick scanning.', 'Category chips, compact summaries, and strong hierarchy help people compare options without losing context.', 'Detail pages stay readable on small screens and include safe fallbacks for missing media or metadata.'],
      sideBadge: 'At a glance',
      sidePoints: ['Category shortcuts with an OLX-style rhythm.', 'Multiple card layouts for a more natural feed.', 'Detail pages with image-led storytelling and clear actions.', 'Mobile-first spacing and predictable scrolling.'],
      primaryLink: { label: 'Start exploring', href: '/classified' },
      secondaryLink: { label: 'Talk to us', href: '/contact' },
    },
    cta: {
      badge: 'Ready when you are',
      title: 'Bring your next offer into a cleaner, more confident layout.',
      description: 'Use the refreshed design to present posts with stronger visual rhythm and simpler next steps.',
      primaryCta: { label: 'Browse classified', href: '/classified' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: { heading: 'Latest {label}', descriptionSuffix: 'Fresh posts surface here with clean cards and fast scanning.' },
  },
  about: {
    badge: 'About',
    title: 'A calmer place to browse local posts and practical updates.',
    description: `${slot4BrandConfig.siteName} keeps discovery simple with a cleaner layout, direct category paths, and readable post detail pages.`,
    paragraphs: ['We focus on clarity, flexible card styles, and dependable fallbacks so every route feels complete even when content is sparse.', 'The design emphasizes fast scanning, mobile comfort, and a polished public-facing feel.'],
    values: [
      { title: 'Practical discovery', description: 'Card rhythm and category chips make it easier to compare posts at a glance.' },
      { title: 'Visible detail', description: 'Important fields stay readable with stronger spacing, type, and hierarchy.' },
      { title: 'Responsive polish', description: 'Layouts adapt smoothly to phones, tablets, and wide screens.' },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Need help with posting, visibility, or account support?',
    description: 'Send a note and we will route it to the right place for listing help, access questions, or collaboration requests.',
    formTitle: 'Send a message',
  },
  detailPages: {
    article: { relatedTitle: 'Related posts', fallbackTitle: 'Post details' },
    listing: { relatedTitle: 'Related listings', fallbackTitle: 'Listing details' },
    image: { relatedTitle: 'Related visuals', fallbackTitle: 'Image details' },
    profile: { relatedTitle: 'Suggested profiles', fallbackDescription: 'Profile details will appear here once available.', visitButton: 'Visit profile link' },
  },
} as const
// redesign-refresh-marker



