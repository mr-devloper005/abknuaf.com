import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Abknuaf classifieds for local ads, services, jobs, and deals',
      description: 'Browse classified ads, local services, jobs, vehicles, property, home improvement offers, and everyday deals in one easy-to-scan marketplace.',
      openGraphTitle: 'Abknuaf classifieds marketplace',
      openGraphDescription: 'Find local classified ads, service providers, property, vehicles, jobs, and deals through a faster browsing experience.',
      keywords: ['classified ads', 'local classifieds', 'services', 'jobs', 'vehicles', 'property', 'deals'],
    },
    hero: {
      badge: 'Classified marketplace',
      title: ['Find local ads, services, and deals faster.'],
      description: 'Browse vehicles, property, jobs, services, home improvement posts, and daily offers with clear categories and quick detail pages.',
      primaryCta: { label: 'Browse classifieds', href: '/classified' },
      secondaryCta: { label: 'Contact support', href: '/contact' },
      searchPlaceholder: 'Search cars, jobs, property, services, and deals',
      focusLabel: 'Browse by category',
      featureCardBadge: 'featured ad',
      featureCardTitle: 'Highlighted classifieds with clear details and quick actions.',
      featureCardDescription: 'Photos, categories, contact cues, and short summaries help visitors decide what to open next.',
    },
    intro: {
      badge: 'Why classifieds work',
      title: 'A practical place to compare local posts before making contact.',
      paragraphs: ['The homepage keeps active ads, services, and offers easy to scan without hiding important details.', 'Category shortcuts, compact summaries, and clear labels help visitors compare nearby options quickly.', 'Detail pages highlight photos, location, phone, website, and safety reminders so every ad feels easier to review.'],
      sideBadge: 'At a glance',
      sidePoints: ['Category shortcuts for services, property, vehicles, jobs, and deals.', 'Featured ads and fresh listings arranged for quick comparison.', 'Detail pages with contact, map, summary, and related posts.', 'Mobile-friendly browsing for repeat classified searches.'],
      primaryLink: { label: 'Browse classifieds', href: '/classified' },
      secondaryLink: { label: 'Get help', href: '/contact' },
    },
    cta: {
      badge: 'Ready to browse',
      title: 'Find useful local posts without digging through clutter.',
      description: 'Open classified ads, compare details, and move quickly from browsing to contacting the right provider or seller.',
      primaryCta: { label: 'Browse classifieds', href: '/classified' },
      secondaryCta: { label: 'Contact support', href: '/contact' },
    },
    taskSection: { heading: 'Latest {label}', descriptionSuffix: 'Fresh classified ads appear here with clean cards and fast scanning.' },
  },
  about: {
    metadata: {
      title: 'About Abknuaf',
      description: `${slot4BrandConfig.siteName} is a classified browsing site for local ads, services, jobs, property, vehicles, and daily offers.`,
    },
    badge: 'About',
    title: 'A cleaner classifieds site for local ads and useful offers.',
    description: `${slot4BrandConfig.siteName} helps visitors browse classified ads by category, compare details quickly, and open posts with clear contact information.`,
    paragraphs: ['We focus on practical discovery for services, vehicles, property, jobs, shopping, home improvement, and everyday local needs.', 'The design emphasizes fast scanning, readable detail pages, clear category paths, and a safer browsing flow before visitors contact a seller or provider.'],
    values: [
      { title: 'Quick comparison', description: 'Cards, categories, and summaries help visitors compare classified posts at a glance.' },
      { title: 'Clear ad details', description: 'Important fields such as location, phone, website, summary, and related posts stay easy to find.' },
      { title: 'Mobile browsing', description: 'Layouts adapt smoothly for quick classified searches on phones, tablets, and wide screens.' },
    ],
  },
  contact: {
    metadata: {
      title: `Contact ${slot4BrandConfig.siteName}`,
      description: 'Contact Abknuaf for classified ad support, posting questions, account help, visibility requests, or local marketplace inquiries.',
    },
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Need help with a classified ad, account, or listing?',
    description: 'Send a note for posting support, visibility questions, account access, category updates, or marketplace collaboration requests.',
    formTitle: 'Send classified support request',
  },
  detailPages: {
    article: { relatedTitle: 'Related posts', fallbackTitle: 'Post details' },
    listing: { relatedTitle: 'Related listings', fallbackTitle: 'Listing details' },
    image: { relatedTitle: 'Related visuals', fallbackTitle: 'Image details' },
    profile: { relatedTitle: 'Suggested profiles', fallbackDescription: 'Profile details will appear here once available.', visitButton: 'Visit profile link' },
  },
} as const
// redesign-refresh-marker



