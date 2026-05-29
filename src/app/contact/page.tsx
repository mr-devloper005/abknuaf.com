import { pagesContent } from '@/editable/content/pages.content'
import { buildPageMetadata } from '@/lib/seo'

export const generateMetadata = () =>
  buildPageMetadata({
    path: '/contact',
    title: pagesContent.contact.metadata.title,
    description: pagesContent.contact.metadata.description,
  })

export { default } from '@/editable/pages/ContactPage'
