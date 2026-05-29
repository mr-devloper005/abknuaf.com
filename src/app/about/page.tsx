import { pagesContent } from '@/editable/content/pages.content'
import { buildPageMetadata } from '@/lib/seo'

export const generateMetadata = () =>
  buildPageMetadata({
    path: '/about',
    title: pagesContent.about.metadata.title,
    description: pagesContent.about.metadata.description,
  })

export { default } from '@/editable/pages/AboutPage'
