export interface LiveStreamingPackage {
  id: string
  name: string
  packageType: 'iPhone' | 'OBS Sistem'
  totalHours: number
  numberOfDays: number
  durationPerSession: number
  workTimeStart: string
  workTimeEnd: string
  workDays: string
  hostCount: number
  twibbonDesignCount: number
  weeklyReport: boolean
  accountReport: boolean
  price: number
  promoPrice: number
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
  price: number
  promoPrice: number
  isPopular?: boolean
}

export const iphonePackages: LiveStreamingPackage[] = [
  {
    id: 'iphone-a',
    name: 'Package A',
    packageType: 'iPhone',
    totalHours: 28,
    numberOfDays: 14,
    durationPerSession: 2,
    workTimeStart: '09:00',
    workTimeEnd: '20:00',
    workDays: 'Mon - Sat',
    hostCount: 1,
    twibbonDesignCount: 0,
    weeklyReport: false,
    accountReport: true,
    price: 2100000,
    promoPrice: 1680000,
  },
  {
    id: 'iphone-b',
    name: 'Package B',
    packageType: 'iPhone',
    totalHours: 52,
    numberOfDays: 26,
    durationPerSession: 2,
    workTimeStart: '09:00',
    workTimeEnd: '20:00',
    workDays: 'Mon - Sat',
    hostCount: 1,
    twibbonDesignCount: 1,
    weeklyReport: true,
    accountReport: true,
    price: 3640000,
    promoPrice: 2940000,
    isPopular: true,
  },
  {
    id: 'iphone-c',
    name: 'Package C',
    packageType: 'iPhone',
    totalHours: 104,
    numberOfDays: 26,
    durationPerSession: 2,
    workTimeStart: '09:00',
    workTimeEnd: '20:00',
    workDays: 'Mon - Sun',
    hostCount: 1,
    twibbonDesignCount: 1,
    weeklyReport: true,
    accountReport: true,
    price: 5070000,
    promoPrice: 3970000,
  },
  {
    id: 'iphone-d',
    name: 'Package D',
    packageType: 'iPhone',
    totalHours: 156,
    numberOfDays: 26,
    durationPerSession: 2,
    workTimeStart: '09:00',
    workTimeEnd: '20:00',
    workDays: 'Mon - Sun',
    hostCount: 1,
    twibbonDesignCount: 2,
    weeklyReport: true,
    accountReport: true,
    price: 6760000,
    promoPrice: 5460000,
  },
  {
    id: 'iphone-e',
    name: 'Package E',
    packageType: 'iPhone',
    totalHours: 156,
    numberOfDays: 26,
    durationPerSession: 2,
    workTimeStart: '09:00',
    workTimeEnd: '20:00',
    workDays: 'Mon - Sun',
    hostCount: 1,
    twibbonDesignCount: 2,
    weeklyReport: true,
    accountReport: true,
    price: 9360000,
    promoPrice: 7860000,
  },
]

export const cameraPackages: LiveStreamingPackage[] = [
  {
    id: 'camera-a',
    name: 'Package A',
    packageType: 'OBS Sistem',
    totalHours: 52,
    numberOfDays: 26,
    durationPerSession: 2,
    workTimeStart: '09:00',
    workTimeEnd: '20:00',
    workDays: 'Mon - Sat',
    hostCount: 1,
    twibbonDesignCount: 1,
    weeklyReport: true,
    accountReport: true,
    price: 6000000,
    promoPrice: 4500000,
  },
  {
    id: 'camera-b',
    name: 'Package B',
    packageType: 'OBS Sistem',
    totalHours: 78,
    numberOfDays: 26,
    durationPerSession: 2,
    workTimeStart: '09:00',
    workTimeEnd: '20:00',
    workDays: 'Mon - Sat',
    hostCount: 1,
    twibbonDesignCount: 1,
    weeklyReport: true,
    accountReport: true,
    price: 9000000,
    promoPrice: 7300000,
  },
  {
    id: 'camera-c',
    name: 'Package C',
    packageType: 'OBS Sistem',
    totalHours: 104,
    numberOfDays: 26,
    durationPerSession: 2,
    workTimeStart: '09:00',
    workTimeEnd: '20:00',
    workDays: 'Mon - Sat',
    hostCount: 1,
    twibbonDesignCount: 2,
    weeklyReport: true,
    accountReport: true,
    price: 10900000,
    promoPrice: 8600000,
    isPopular: true,
  },
  {
    id: 'camera-d',
    name: 'Package D',
    packageType: 'OBS Sistem',
    totalHours: 156,
    numberOfDays: 26,
    durationPerSession: 2,
    workTimeStart: '09:00',
    workTimeEnd: '20:00',
    workDays: 'Mon - Sun',
    hostCount: 2,
    twibbonDesignCount: 2,
    weeklyReport: true,
    accountReport: true,
    price: 14600000,
    promoPrice: 11900000,
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
    price: 4500000,
    promoPrice: 3500000,
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
    price: 7500000,
    promoPrice: 5800000,
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
    price: 12000000,
    promoPrice: 9500000,
  }
]
