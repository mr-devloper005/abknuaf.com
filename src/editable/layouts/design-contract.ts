import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#EAE0CF',
  '--slot4-page-text': '#111844',
  '--slot4-panel-bg': '#7288AE',
  '--slot4-surface-bg': '#fff8f1',
  '--slot4-muted-text': '#5f6b93',
  '--slot4-soft-muted-text': '#936666',
  '--slot4-accent': '#4B5694',
  '--slot4-accent-fill': '#4B5694',
  '--slot4-accent-soft': '#d9dff0',
  '--slot4-dark-bg': '#111844',
  '--slot4-dark-text': '#fff7f0',
  '--slot4-media-bg': '#e8d5c3',
  '--slot4-cream': '#EAE0CF',
  '--slot4-warm': '#fff4ea',
  '--slot4-lavender': '#f5e8ef',
  '--slot4-gray': '#f7ece1',
  '--slot4-body-gradient': 'radial-gradient(circle at 8% 10%, rgba(75,86,148,0.16), transparent 42%), radial-gradient(circle at 88% 8%, rgba(17,24,68,0.16), transparent 35%), linear-gradient(180deg, #e9e7dd 0%, #EAE0CF 45%, #d8d2c5 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[#7288AE]/30',
  darkBorder: 'border-[#d9dff0]/25',
  shadow: 'shadow-[0_14px_42px_rgba(17,24,68,0.12)]',
  shadowStrong: 'shadow-[0_24px_70px_rgba(17,24,68,0.22)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(84,26,26,0.08),rgba(84,26,26,0.74))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-5 sm:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start',
    rail: 'flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[180px] shrink-0 snap-start',
  },
  type: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.22em]',
    heroTitle: 'text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl',
    sectionTitle: 'text-3xl font-black tracking-[-0.04em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-3xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-3xl border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `rounded-3xl ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary: `inline-flex items-center justify-center rounded-full ${editablePalette.accentBg} px-7 py-3 text-sm font-black text-white transition hover:opacity-90`,
    secondary: `inline-flex items-center justify-center rounded-full border ${editablePalette.border} ${editablePalette.surfaceBg} px-7 py-3 text-sm font-black ${editablePalette.surfaceText} transition hover:bg-black/[0.03]`,
    accent: `inline-flex items-center justify-center rounded-full ${editablePalette.darkBg} px-7 py-3 text-sm font-black text-white transition hover:opacity-90`,
  },
  media: {
    frame: `relative overflow-hidden rounded-2xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(17,24,68,0.20)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Use visual variety across cards: featured, compact, horizontal, editorial list, and image-first.',
  'Keep all task routes and data wiring intact; redesign layout only.',
  'Maintain safe fallbacks for post image, summary, category, and metadata fields.',
  'Favor classified-style clarity: searchable hero, quick actions, and scan-friendly cards.',
  'Preserve mobile polish with stacked sections and no overflow.',
] as const
// redesign-refresh-marker



