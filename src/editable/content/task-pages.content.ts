import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: { eyebrow: 'Editorial lane', headline: 'In-depth posts and practical guides.', description: 'Read useful articles, how-to explainers, and informative updates in a cleaner editorial format.', filterLabel: 'Filter article topic', secondaryNote: 'Designed for clarity and long-form readability.', chips: ['Guides', 'News', 'Deep reads'] },
  classified: { eyebrow: 'Classified board', headline: 'Active offers from people ready to buy or sell.', description: 'Browse fast-moving classified posts with clear details and stronger action cues.', filterLabel: 'Filter offer category', secondaryNote: 'Built for speed, trust, and action.', chips: ['Offers', 'Price-first', 'Quick contact'] },
  sbm: { eyebrow: 'Bookmark board', headline: 'Saved resources and curated links.', description: 'Keep useful links and references organized in a practical board-style layout.', filterLabel: 'Filter bookmarks', secondaryNote: 'Simple, readable, and quick to scan.', chips: ['Curated', 'Useful links', 'Reference-ready'] },
  profile: { eyebrow: 'Profile lane', headline: 'People, sellers, and business profiles.', description: 'Discover profile pages with identity context and supporting details.', filterLabel: 'Filter profiles', secondaryNote: 'Trust signals remain easy to read.', chips: ['Sellers', 'Identity', 'Connections'] },
  pdf: { eyebrow: 'Document lane', headline: 'Files, guides, and downloadable resources.', description: 'Access document posts with cleaner context and direct download actions.', filterLabel: 'Filter documents', secondaryNote: 'Structured for archive-style browsing.', chips: ['PDF', 'Downloads', 'Reference'] },
  listing: { eyebrow: 'Business lane', headline: 'Local services and business listings.', description: 'Compare listings faster with clear structure, location cues, and straightforward details.', filterLabel: 'Filter businesses', secondaryNote: 'Built for practical comparison.', chips: ['Services', 'Local', 'Business'] },
  image: { eyebrow: 'Visual lane', headline: 'Image-led posts and gallery updates.', description: 'Explore image-rich posts with polished cards and compact browsing rhythm.', filterLabel: 'Filter visuals', secondaryNote: 'Visual-first presentation with safe fallbacks.', chips: ['Gallery', 'Visual', 'Discovery'] },
} satisfies Record<TaskKey, TaskPageVoice>
// redesign-refresh-marker



