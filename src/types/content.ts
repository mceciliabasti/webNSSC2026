export type SectionData = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export type IconName = 'clock' | 'spark' | 'heart' | 'user' | 'book' | 'board' | 'info'

export type FactData = {
  label: string
  value: string
}

export type GalleryItem = {
  src: string
  alt: string
}

export type ResourceItem = {
  title: string
  file: string
}

export type DetailData = {
  title: string
  subtitle: string
  image: string
  highlights?: string[]
  facts?: FactData[]
  gallery?: GalleryItem[]
  resources?: ResourceItem[]
  sections: SectionData[]
}
