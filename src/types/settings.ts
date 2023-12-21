export interface CreateSettings {
  logo?: string
  siteName?: string
  siteSubtitle?: string
  currency?: string
  metaTitle?: string
  metaDescription?: string
  metaTags?: string
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterHandle?: string
  twitterCardType?: string

  location?: string
  contactNumber?: string
  website?: string

  facebookUrl?: string
  twitterUrl?: string
  instagramUrl?: string
  youtubeUrl?: string
  linkedinUrl?: string
  tiktokUrl?: string

  whoWeAre?: string
  whatWeAre?: string
  whyCommunity?: string
  createdAt?: string | Date
  artists?: number
  people?: number
  communities?: number
}

export interface Settings extends CreateSettings {
  id?: number
}
