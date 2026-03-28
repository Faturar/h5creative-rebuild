import { type StaticImageData } from "next/image"
import detailsThumbnail from "@/public/assets/images/thumbnails/details-thumbnail.png"
import thumbnail1 from "@/public/assets/images/thumbnails/thumbnail1.png"
import thumbnail2 from "@/public/assets/images/thumbnails/thumbnail2.png"
import thumbnail3 from "@/public/assets/images/thumbnails/thumbnail3.png"
import porto1 from "@/public/assets/images/portofolio/porto-2.png"
import crownBlackIcon from "@/public/assets/images/icons/crown-black.svg"
import codeBlackIcon from "@/public/assets/images/icons/code-black.svg"
import chartBlackIcon from "@/public/assets/images/icons/chart-2-black.svg"

export interface FeatureTag {
  icon: StaticImageData
  label: string
}

export interface ScreenshotItem {
  image: StaticImageData
  title: string
}

export interface Project {
  slug: string
  title: string
  subtitle: string
  heroImage: StaticImageData
  challenge: string
  featureTags: FeatureTag[]
  screenshots: ScreenshotItem[]
  ctaTitle: string
  ctaSubtitle: string
}

export const projects: Project[] = [
  {
    slug: "social-media-growth-campaign",
    title: "Social Media Growth Campaign",
    subtitle: "Social Media Management & Digital Marketing",
    heroImage: detailsThumbnail,
    challenge:
      "Klien kami menghadapi stagnasi pertumbuhan di social media, dengan engagement yang rendah dan konten yang belum memiliki arah strategi yang jelas. Tujuan utama campaign ini adalah membangun brand presence yang kuat, meningkatkan interaksi audience, serta mengkonversi traffic menjadi leads melalui pendekatan digital marketing yang terstruktur.",
    featureTags: [
      {
        icon: crownBlackIcon,
        label: "Brand Growth",
      },
      {
        icon: codeBlackIcon,
        label: "Content Strategy",
      },
      {
        icon: chartBlackIcon,
        label: "Performance Marketing",
      },
    ],
    screenshots: [
      {
        image: thumbnail1,
        title: "Dashboard UI",
      },
      {
        image: thumbnail2,
        title: "Analytics View",
      },
      {
        image: thumbnail3,
        title: "Mobile Experience",
      },
      {
        image: thumbnail1,
        title: "Settings Panel",
      },
      {
        image: thumbnail2,
        title: "Budget Tracker",
      },
      {
        image: thumbnail3,
        title: "Investment View",
      },
      {
        image: thumbnail1,
        title: "Campaign Overview",
      },
      {
        image: thumbnail2,
        title: "Performance Metrics",
      },
    ],
    ctaTitle: "Let's Grow Your Brand Through Digital Campaign",
    ctaSubtitle:
      "We help you scale with strategic content and performance-driven marketing",
  },
  {
    slug: "ecommerce-platform-redesign",
    title: "E-commerce Platform Redesign",
    subtitle: "UI/UX Design & Development",
    heroImage: thumbnail1,
    challenge:
      "Platform e-commerce klien mengalami penurunan conversion rate dan user engagement akibat antarmuka yang kompleks dan pengalaman pengguna yang tidak optimal. Fokus utama dari proyek ini adalah menyederhanakan user journey, meningkatkan kecepatan loading, dan mengoptimalkan proses checkout untuk meningkatkan penjualan.",
    featureTags: [
      {
        icon: crownBlackIcon,
        label: "UI/UX Design",
      },
      {
        icon: codeBlackIcon,
        label: "Frontend Development",
      },
      {
        icon: chartBlackIcon,
        label: "Conversion Optimization",
      },
    ],
    screenshots: [
      {
        image: thumbnail2,
        title: "Homepage Design",
      },
      {
        image: thumbnail3,
        title: "Product Listing",
      },
      {
        image: thumbnail1,
        title: "Product Detail",
      },
      {
        image: thumbnail2,
        title: "Cart Page",
      },
      {
        image: thumbnail3,
        title: "Checkout Flow",
      },
      {
        image: thumbnail1,
        title: "User Account",
      },
      {
        image: thumbnail2,
        title: "Search Results",
      },
      {
        image: thumbnail3,
        title: "Mobile View",
      },
    ],
    ctaTitle: "Transform Your E-commerce Experience",
    ctaSubtitle:
      "We create seamless shopping experiences that drive conversions and customer loyalty",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    subtitle: "iOS & Android Development",
    heroImage: thumbnail2,
    challenge:
      "Klien membutuhkan aplikasi mobile cross-platform yang dapat berjalan di iOS dan Android dengan fitur real-time synchronization, offline capabilities, dan integrasi dengan sistem backend yang sudah ada. Tantangan utamanya adalah menjaga konsistensi UX di kedua platform sambil mengoptimalkan performa aplikasi.",
    featureTags: [
      {
        icon: crownBlackIcon,
        label: "Cross-Platform",
      },
      {
        icon: codeBlackIcon,
        label: "React Native",
      },
      {
        icon: chartBlackIcon,
        label: "Real-time Sync",
      },
    ],
    screenshots: [
      {
        image: thumbnail3,
        title: "Onboarding Screen",
      },
      {
        image: thumbnail1,
        title: "Dashboard",
      },
      {
        image: thumbnail2,
        title: "Profile Settings",
      },
      {
        image: thumbnail3,
        title: "Notifications",
      },
      {
        image: thumbnail1,
        title: "Search Feature",
      },
      {
        image: thumbnail2,
        title: "Chat Interface",
      },
      {
        image: thumbnail3,
        title: "Settings",
      },
      {
        image: thumbnail1,
        title: "Dark Mode",
      },
    ],
    ctaTitle: "Build Your Mobile App Today",
    ctaSubtitle:
      "We create powerful mobile applications that connect with your users on the go",
  },
  {
    slug: "multi-power-aditama-brand-campaign",
    title: "PT Multi Power Aditama Brand Campaign",
    subtitle: "Industrial Brand Campaign",
    heroImage: porto1,

    challenge:
      "PT Multi Power Aditama membutuhkan strategi social media yang mampu meningkatkan awareness dan positioning sebagai solusi alat berat yang efisien dan terpercaya. Tantangan utama adalah menyampaikan konten yang edukatif dan menarik di industri yang cenderung teknis, serta membangun engagement dengan audience B2B melalui konten visual yang kuat dan konsisten.",

    featureTags: [
      {
        icon: crownBlackIcon,
        label: "Brand Awareness",
      },
      {
        icon: codeBlackIcon,
        label: "Content Strategy",
      },
      {
        icon: chartBlackIcon,
        label: "Engagement Growth",
      },
    ],

    screenshots: [
      {
        image: porto1,
        title: "Educational Content - Tips & Insights",
      },
      {
        image: porto1,
        title: "Branding Visual Consistency",
      },
      {
        image: porto1,
        title: "Product Highlight Content",
      },
      {
        image: porto1,
        title: "Event & Exhibition Promotion",
      },
      {
        image: porto1,
        title: "Audience Engagement Post",
      },
      {
        image: porto1,
        title: "Company Activity Documentation",
      },
      {
        image: porto1,
        title: "Campaign Visual Design",
      },
      {
        image: porto1,
        title: "Social Media Feed Layout",
      },
    ],

    ctaTitle: "Grow Your Brand Through Social Media",
    ctaSubtitle:
      "We help industrial brands build strong presence with strategic content, consistent visuals, and impactful digital campaigns",
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug)
}
