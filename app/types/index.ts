/**
 * Content Related Types
 * Types for CMS content, portfolio items, and collections
 */

export interface PortofolioCollectionItem {
  _path?: string
  path?: string
  title?: string
  description?: string
  image?: string
  category?: string
  tags?: string[]
  date?: string
  // Extended fields for detail page
  services?: string[]
  client?: string
  status?: string
  industry?: string
  // Content body
  body?: any
  [key: string]: any
}

export interface BlogCollectionItem {
  path?: string
  title?: string
  description?: string
  coverImage?: string
  author?: string
  date?: string
  category?: string
  tags?: string[]
  readTime?: string
  // Content body
  body?: any
  [key: string]: any
}