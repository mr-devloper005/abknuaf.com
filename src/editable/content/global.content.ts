import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Smart classified marketplace',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Buy, sell, rent, promote',
    primaryLinks: [
      { label: 'Classifieds', href: '/classified' },
      { label: 'Listings', href: '/listing' },
      { label: 'Images', href: '/image' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start browsing', href: '/classified' },
      secondary: { label: 'Post now', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Trusted marketplace browsing',
    description: 'A unified destination for classified offers, services, local businesses, image posts, profiles, and documents.',
    columns: [
      { title: 'Explore', links: [{ label: 'Classifieds', href: '/classified' }, { label: 'Listings', href: '/listing' }, { label: 'Images', href: '/image' }, { label: 'Profiles', href: '/profile' }] },
      { title: 'Site', links: [{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }] },
    ],
    bottomNote: 'Built for practical discovery and trusted posting.',
  },
  commonLabels: {
    readMore: 'Open post',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
// redesign-refresh-marker



