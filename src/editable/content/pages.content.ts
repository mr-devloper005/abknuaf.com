import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Classified marketplace for products and services',
      description: 'Find offers, rentals, services, and local business posts in one clear marketplace experience.',
      openGraphTitle: 'Browse classifieds, listings, and local offers',
      openGraphDescription: 'A practical destination to buy, sell, rent, and promote with confidence.',
      keywords: ['classified marketplace', 'buy and sell', 'local listings', 'services and rentals'],
    },
    hero: {
      badge: 'Marketplace spotlight',
      title: ['Find serious buyers, better offers, and trusted posts.'],
      description: 'Explore popular categories, compare options faster, and connect directly with relevant listings.',
      primaryCta: { label: 'Browse classifieds', href: '/classified' },
      secondaryCta: { label: 'Explore listings', href: '/listing' },
      searchPlaceholder: 'Search products, rentals, services, and offers',
      focusLabel: 'Focus',
      featureCardBadge: 'featured offer',
      featureCardTitle: 'Real listings with practical details and stronger visibility.',
      featureCardDescription: 'A cleaner layout helps visitors decide quickly and engage with confidence.',
    },
    intro: {
      badge: 'Marketplace overview',
      title: 'A polished, modern place for buying, selling, and promoting online.',
      paragraphs: ['This site is designed for practical discovery, giving every listing better structure and readability.', 'From products and rentals to services and business posts, everything stays easy to browse across devices.', 'Clear sections, rich cards, and detail pages help people move from discovery to action faster.'],
      sideBadge: 'Highlights',
      sidePoints: ['Search-first homepage and category-driven discovery.', 'Multiple card styles for better visual scanning.', 'Detail pages focused on trust signals and quick actions.', 'Mobile-friendly flow with clear spacing and contrast.'],
      primaryLink: { label: 'Browse offers', href: '/classified' },
      secondaryLink: { label: 'Contact support', href: '/contact' },
    },
    cta: {
      badge: 'Publish today',
      title: 'Get your offer seen by people ready to act.',
      description: 'Showcase products and services with cleaner presentation and stronger local visibility.',
      primaryCta: { label: 'Browse Classifieds', href: '/classified' },
      secondaryCta: { label: 'Contact Us', href: '/contact' },
    },
    taskSection: { heading: 'Latest {label}', descriptionSuffix: 'Browse the newest posts in this section.' },
  },
  about: {
    badge: 'About us',
    title: 'A marketplace experience built for clarity and trust.',
    description: `${slot4BrandConfig.siteName} helps people discover products, services, rentals, and opportunities faster through cleaner browsing and practical layout design.`,
    paragraphs: ['We focus on usability, category clarity, and readable detail pages so visitors can make decisions quickly.', 'The platform supports different post types while keeping navigation simple and consistent.'],
    values: [
      { title: 'Practical discovery', description: 'Layouts are optimized for quick comparison and straightforward browsing.' },
      { title: 'Visual trust signals', description: 'Price, location, and key details are easy to spot across archive and detail pages.' },
      { title: 'Consistent performance', description: 'A responsive structure keeps the experience polished on both desktop and mobile.' },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Need help with listings, promotions, or partnerships?',
    description: 'Share your request and we will guide you to the right support lane for posting, visibility, and account help.',
    formTitle: 'Send your request',
  },
  detailPages: {
    article: { relatedTitle: 'Related posts', fallbackTitle: 'Post details' },
    listing: { relatedTitle: 'Related listings', fallbackTitle: 'Listing details' },
    image: { relatedTitle: 'Related visuals', fallbackTitle: 'Image details' },
    profile: { relatedTitle: 'Suggested profiles', fallbackDescription: 'Profile details will appear here once available.', visitButton: 'Visit profile link' },
  },
} as const
// redesign-refresh-marker



