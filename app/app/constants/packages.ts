export interface LiveStreamingPackage {
  id: string
  name: string
  type: 'iphone' | 'camera'
  totalHours: number
  days: number
  durationPerSession: number
  worktime: string
  workdays: string
  hosts: number
  twibbonDesigns: number
  weeklyReport: boolean
  accountReport: boolean
  normalPrice: number
  specialPrice: number
  isPopular?: boolean
}

export interface SocialMediaPackage {
  id: string
  name: string
  platforms: string
  postsPerMonth: number
  reelsPerMonth: number
  storiesPerMonth: number
  contentTypes: string[]
  features: string[]
  normalPrice: number
  specialPrice: number
  isPopular?: boolean
}

export const iphonePackages: LiveStreamingPackage[] = [
  {
    id: 'iphone-a',
    name: 'Package A',
    type: 'iphone',
    totalHours: 28,
    days: 14,
    durationPerSession: 2,
    worktime: '09.00 – 20.00',
    workdays: 'Mon – Sat',
    hosts: 1,
    twibbonDesigns: 0,
    weeklyReport: false,
    accountReport: true,
    normalPrice: 3000000,
    specialPrice: 2100000,
  },
  {
    id: 'iphone-b',
    name: 'Package B',
    type: 'iphone',
    totalHours: 52,
    days: 26,
    durationPerSession: 2,
    worktime: '09.00 – 20.00',
    workdays: 'Mon – Sat',
    hosts: 1,
    twibbonDesigns: 1,
    weeklyReport: true,
    accountReport: true,
    normalPrice: 4500000,
    specialPrice: 3640000,
    isPopular: true,
  },
  {
    id: 'iphone-c',
    name: 'Package C',
    type: 'iphone',
    totalHours: 104,
    days: 26,
    durationPerSession: 4,
    worktime: '09.00 – 20.00',
    workdays: 'Mon – Sun',
    hosts: 1,
    twibbonDesigns: 1,
    weeklyReport: true,
    accountReport: true,
    normalPrice: 8000000,
    specialPrice: 6760000,
  },
  {
    id: 'iphone-e',
    name: 'Package E',
    type: 'iphone',
    totalHours: 156,
    days: 26,
    durationPerSession: 6,
    worktime: '09.00 – 20.00',
    workdays: 'Mon – Sun',
    hosts: 1,
    twibbonDesigns: 2,
    weeklyReport: true,
    accountReport: true,
    normalPrice: 11700000,
    specialPrice: 9360000,
  },
]

export const cameraPackages: LiveStreamingPackage[] = [
  {
    id: 'camera-a',
    name: 'Package A',
    type: 'camera',
    totalHours: 52,
    days: 26,
    durationPerSession: 2,
    worktime: '09.00 – 20.00',
    workdays: 'Mon – Sat',
    hosts: 1,
    twibbonDesigns: 1,
    weeklyReport: true,
    accountReport: true,
    normalPrice: 9000000,
    specialPrice: 6500000,
  },
  {
    id: 'camera-b',
    name: 'Package B',
    type: 'camera',
    totalHours: 78,
    days: 26,
    durationPerSession: 3,
    worktime: '09.00 – 20.00',
    workdays: 'Mon – Sat',
    hosts: 1,
    twibbonDesigns: 1,
    weeklyReport: true,
    accountReport: true,
    normalPrice: 14000000,
    specialPrice: 9000000,
  },
  {
    id: 'camera-c',
    name: 'Package C',
    type: 'camera',
    totalHours: 104,
    days: 26,
    durationPerSession: 4,
    worktime: '09.00 – 20.00',
    workdays: 'Mon – Sat',
    hosts: 1,
    twibbonDesigns: 2,
    weeklyReport: true,
    accountReport: true,
    normalPrice: 16000000,
    specialPrice: 10900000,
    isPopular: true,
  },
  {
    id: 'camera-d',
    name: 'Package D',
    type: 'camera',
    totalHours: 156,
    days: 26,
    durationPerSession: 6,
    worktime: '09.00 – 20.00',
    workdays: 'Mon – Sun',
    hosts: 2,
    twibbonDesigns: 2,
    weeklyReport: true,
    accountReport: true,
    normalPrice: 22000000,
    specialPrice: 14600000,
  },
]

export const liveStreamingPackages = {
  iphone: iphonePackages,
  camera: cameraPackages,
}

export const cameraEquipment = [
  'OBS Software',
  'Sony Camera',
  'Professional Lighting',
  'Wireless Microphone',
]

export const socialMediaPackages: SocialMediaPackage[] = [
  {
    id: 'smm-starter',
    name: 'Starter Package',
    platforms: '1 Platform',
    postsPerMonth: 12,
    reelsPerMonth: 4,
    storiesPerMonth: 12,
    contentTypes: ['Carousels', 'Static Posts'],
    features: [
      'Content Planning & Strategy',
      'Content Creation (Design + Copy)',
      'Posting & Scheduling',
      'Hashtag Research',
      'Basic Analytics Report'
    ],
    normalPrice: 4500000,
    specialPrice: 3500000,
  },
  {
    id: 'smm-growth',
    name: 'Growth Package',
    platforms: '2 Platforms',
    postsPerMonth: 20,
    reelsPerMonth: 8,
    storiesPerMonth: 20,
    contentTypes: ['Carousels', 'Reels', 'Static Posts'],
    features: [
      'Content Planning & Strategy',
      'Content Creation (Design + Copy)',
      'Posting & Scheduling',
      'Engagement (Reply Comments & DMs)',
      'Hashtag & Trend Research',
      'Monthly Analytics Report',
      '2 Revisions per Month'
    ],
    normalPrice: 7500000,
    specialPrice: 5800000,
    isPopular: true,
  },
  {
    id: 'smm-premium',
    name: 'Premium Package',
    platforms: '3+ Platforms',
    postsPerMonth: 30,
    reelsPerMonth: 12,
    storiesPerMonth: 30,
    contentTypes: ['Carousels', 'Reels', 'Static Posts', 'Stories'],
    features: [
      'Content Planning & Strategy',
      'Content Creation (Design + Copy)',
      'Posting & Scheduling',
      'Engagement (Reply Comments & DMs)',
      'Hashtag & Trend Research',
      'Weekly Analytics Report',
      'Community Management',
      'Unlimited Revisions',
      'Priority Support',
      'LinkedIn Included (Optional)'
    ],
    normalPrice: 12000000,
    specialPrice: 9500000,
  }
]
