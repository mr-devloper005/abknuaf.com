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
  article: { eyebrow: 'Editorial feed', headline: 'Readable stories and practical guides.', description: 'Browse longer pieces in a clean reading layout with easier scanning and related suggestions.', filterLabel: 'Filter article topic', secondaryNote: 'Designed for clarity and long-form reading.', chips: ['Guides', 'Updates', 'Deep reads'] },
  classified: { eyebrow: 'Classified ads', headline: 'Local ads, services, jobs, property, and deals.', description: 'Scan active classified posts by category with photos, summaries, location cues, and quick contact paths.', filterLabel: 'Filter ad category', secondaryNote: 'Built for faster classified browsing.', chips: ['Local ads', 'Services', 'Quick contact'] },
  sbm: { eyebrow: 'Bookmark board', headline: 'Saved references and curated links.', description: 'Keep useful links organized in a calm, board-style archive.', filterLabel: 'Filter bookmarks', secondaryNote: 'Simple, readable, and quick to scan.', chips: ['Curated', 'Useful links', 'Reference'] },
  profile: { eyebrow: 'Profile lane', headline: 'People, sellers, and business profiles.', description: 'Review profile pages with identity context and supporting details.', filterLabel: 'Filter profiles', secondaryNote: 'Trust signals stay easy to read.', chips: ['Sellers', 'Identity', 'Connections'] },
  pdf: { eyebrow: 'Document lane', headline: 'Files, guides, and downloadable resources.', description: 'Access document posts with clearer context and direct file actions.', filterLabel: 'Filter documents', secondaryNote: 'Structured for archive-style browsing.', chips: ['PDF', 'Downloads', 'Reference'] },
  listing: { eyebrow: 'Business lane', headline: 'Local services and business listings.', description: 'Compare listings with clear structure, location cues, and concise details.', filterLabel: 'Filter businesses', secondaryNote: 'Built for practical comparison.', chips: ['Services', 'Local', 'Business'] },
  image: { eyebrow: 'Visual lane', headline: 'Image-led posts and gallery updates.', description: 'Explore image-rich posts with a polished feed and compact browsing rhythm.', filterLabel: 'Filter visuals', secondaryNote: 'Visual-first presentation with safe fallbacks.', chips: ['Gallery', 'Visual', 'Discovery'] },
} satisfies Record<TaskKey, TaskPageVoice>
// redesign-refresh-marker



