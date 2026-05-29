export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'mysterycoder',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Mystery Coder',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Classified ads and local services',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A classified ads marketplace for browsing local services, jobs, vehicles, property, shopping offers, and daily deals through a cleaner browsing experience.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'mysterycoder.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://mysterycoder.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

