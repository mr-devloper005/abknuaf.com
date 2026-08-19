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
      ? { primary: '#4d63ff', surface: '#f4f5f7' }
      : productKind === 'editorial'
        ? { primary: '#08132f', surface: '#ffffff' }
        : productKind === 'directory'
          ? { primary: '#4d63ff', surface: '#ffffff' }
          : { primary: '#4d63ff', surface: '#ffffff' },
} as const
// redesign-refresh-marker



