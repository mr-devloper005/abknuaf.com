import { siteIdentity } from '@/config/site.identity'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'

const { recipe } = getFactoryState()
const productKind = getProductKind(recipe)

export const slot4BrandConfig = {
  siteName: siteIdentity.name,
  tagline: siteIdentity.tagline,
  domain: siteIdentity.domain,
  baseUrl: siteIdentity.url,
  productKind,
  ogImage: siteIdentity.ogImage,
  accents:
    productKind === 'visual'
      ? { primary: '#2d63f1', surface: '#f7f9fc' }
      : productKind === 'editorial'
        ? { primary: '#0d1a43', surface: '#ffffff' }
        : productKind === 'directory'
          ? { primary: '#2d63f1', surface: '#ffffff' }
          : { primary: '#2d63f1', surface: '#ffffff' },
} as const
// redesign-refresh-marker



