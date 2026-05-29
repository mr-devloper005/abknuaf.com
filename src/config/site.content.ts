import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Local classified ads and services',
  },
  footer: {
    tagline: 'Classified ads, services, and daily offers',
  },
  hero: {
    badge: 'Local classifieds',
    title: ['Find local ads, services, jobs, and deals.'],
    description:
      'Browse classified ads, home services, vehicles, property, jobs, shopping offers, and local updates through a clearer marketplace experience.',
    primaryCta: {
      label: 'Browse classifieds',
      href: '/classified',
    },
    secondaryCta: {
      label: 'Contact support',
      href: '/contact',
    },
    searchPlaceholder: 'Search services, cars, jobs, property, and deals',
    focusLabel: 'Category',
    featureCardBadge: 'featured classified',
    featureCardTitle: 'Highlighted ads make it easier to compare what matters.',
    featureCardDescription:
      'Recent classified posts keep photos, categories, summaries, and contact paths easy to scan.',
  },
  home: {
    metadata: {
      title: 'Abknuaf classifieds for local ads, services, jobs, and deals',
      description:
        'Browse local classified ads, services, vehicles, property, jobs, shopping offers, and daily deals through a clean marketplace experience.',
      openGraphTitle: 'Abknuaf classifieds marketplace',
      openGraphDescription:
        'Find classified ads, service providers, property, vehicles, jobs, and deals through a faster browsing experience.',
      keywords: ['classified ads', 'local classifieds', 'services', 'jobs', 'vehicles', 'property', 'deals'],
    },
    introBadge: 'About the marketplace',
    introTitle: 'Built for browsing and comparing local classified posts.',
    introParagraphs: [
      'This site brings together local classified ads, services, jobs, vehicles, property, and daily offers so visitors can browse practical posts in one place.',
      'Instead of scattering posts across disconnected pages, the marketplace keeps category browsing, photos, summaries, and detail pages close together.',
      'Whether someone starts with a home service, vehicle offer, job post, property update, or shopping deal, they can keep comparing related classifieds without friction.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Classified-first homepage with stronger emphasis on categories and active ads.',
      'Connected sections for services, vehicles, property, jobs, shopping, and offers.',
      'Cleaner browsing rhythm designed to make comparison feel easier.',
      'Lightweight interactions that keep the experience fast and readable.',
    ],
    primaryLink: {
      label: 'Browse classifieds',
      href: '/classified',
    },
    secondaryLink: {
      label: 'Contact support',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Start browsing',
    title: 'Browse classified ads with clearer details and faster next steps.',
    description:
      'Move between services, vehicles, property, jobs, shopping offers, and daily local posts through one cleaner classified experience.',
    primaryCta: {
      label: 'Browse Classifieds',
      href: '/classified',
    },
    secondaryCta: {
      label: 'Contact Support',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<TaskKey, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Read articles, stories, guides, and long-form posts across topics and interests.',
  },
  listing: {
    title: 'Listings and discoverable pages',
    description: 'Explore listings, services, brands, and structured pages organized for easier browsing.',
  },
  classified: {
    title: 'Classified ads and local offers',
    description: 'Browse services, jobs, vehicles, property, home improvement posts, shopping offers, and local classified ads by category.',
  },
  image: {
    title: 'Image sharing and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover public profiles, brand pages, and identity-focused posts in one place.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Read articles', href: '/article' },
      { label: 'Explore classifieds', href: '/classified' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [],
  },
  classified: {
    title: 'Classified ads, services, jobs, and deals',
    paragraphs: [
      'Classified posts help surface services, jobs, vehicles, property, offers, and time-sensitive local opportunities in a faster-scanning format.',
      'Each post keeps key details easier to compare, including category, location, summary, phone, website, images, and related matches.',
      'Browse by category to find relevant ads quickly, then open detail pages when you need contact information or more context.',
    ],
    links: [
      { label: 'Business listings', href: '/listing' },
      { label: 'Read articles', href: '/article' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Image sharing highlights visual posts, galleries, and story-led content where imagery plays the lead role.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/article' },
      { label: 'Explore listings', href: '/listing' },
      { label: 'Open classifieds', href: '/classified' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Open listings', href: '/listing' },
      { label: 'Read articles', href: '/article' },
      { label: 'Browse image sharing', href: '/image' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/article' },
      { label: 'Explore listings', href: '/listing' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/article' },
      { label: 'See listings', href: '/listing' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
}
