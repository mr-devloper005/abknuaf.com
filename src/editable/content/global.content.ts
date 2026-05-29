import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'A cleaner place to browse local offers',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Browse, compare, and connect',
    primaryLinks: [
      { label: 'Classifieds', href: '/classified' },
      { label: 'Listings', href: '/listing' },
      { label: 'Images', href: '/image' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start browsing', href: '/classified' },
      secondary: { label: 'Send inquiry', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Abknuaf',
    description: 'Abknuaf site updates and browsing.',
    columns: [
      { title: 'Explore', links: [{ label: 'Classifieds', href: '/classified' }] },
      { title: 'Site', links: [{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }] },
    ],
    bottomNote: 'Abknuaf',
  },
  commonLabels: {
    readMore: 'Open post',
    viewAll: 'View all',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
// redesign-refresh-marker

