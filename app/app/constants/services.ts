import { type StaticImageData } from "next/image"
import services1 from "@/public/assets/images/services1.png"
import services2 from "@/public/assets/images/services2.png"
import services3 from "@/public/assets/images/services3.png"
import {
  Box,
  Video,
  Users,
  Smartphone,
  Monitor,
  Target,
  Camera,
  Megaphone,
  Palette,
  ShoppingCart,
  TrendingUp,
  Zap,
  Star,
} from "lucide-react"

export interface Service {
  slug: string
  title: string
  description: string
  image: StaticImageData
  alt: string
  icon?: React.ComponentType<{ className?: string }>
  detailedDescription?: string
  features?: string[]
  benefits?: string[]
  process?: string[]
  pricing?: {
    packages?: Array<{
      name: string
      price: string
      features: string[]
    }>
    startingFrom?: string
  }
}

export const services: Service[] = [
  {
    slug: "brand-activation",
    title: "Brand Activation",
    description:
      "Comprehensive brand transformation services including rename, reposition, rebrand, and relaunch strategies.",
    image: services1,
    alt: "Brand Activation Service",
    icon: Target,
    detailedDescription:
      "We help brands undergo complete transformations - rename, reposition, rebrand, or relaunch - to stay relevant and competitive in the digital age. Our strategic approach ensures your brand resonates with your target audience and achieves sustainable growth.",
    features: [
      "Brand strategy development",
      "Market positioning analysis",
      "Brand identity refresh",
      "Launch campaign planning",
      "Brand messaging framework",
    ],
    benefits: [
      "Stronger brand recognition",
      "Improved market positioning",
      "Increased customer engagement",
      "Competitive differentiation",
      "Long-term brand equity",
    ],
    process: [
      "Discovery & Research - Understanding your business, audience, and market",
      "Strategy Development - Defining brand positioning and personality",
      "Creative Concept - Developing visual and messaging concepts",
      "Implementation Planning - Creating launch roadmap and timeline",
      "Launch & Monitoring - Executing launch and tracking performance",
    ],
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    description:
      "Full-service social media management to build and grow your brand presence across all platforms.",
    image: services2,
    alt: "Social Media Management Service",
    icon: Users,
    detailedDescription:
      "We manage your social media presence across all major platforms, creating engaging content that builds community and drives results. From strategy to execution, we handle everything so you can focus on running your business.",
    features: [
      "Content strategy & planning",
      "Content creation & posting",
      "Community management",
      "Analytics & reporting",
      "Paid social advertising",
    ],
    benefits: [
      "Consistent brand presence",
      "Increased engagement",
      "Growing follower base",
      "Improved brand awareness",
      "Data-driven decisions",
    ],
    process: [
      "Platform Audit - Analyzing current presence and performance",
      "Strategy Development - Creating platform-specific strategies",
      "Content Calendar - Planning and scheduling content",
      "Daily Management - Posting, engaging, and monitoring",
      "Performance Analysis - Reviewing metrics and optimizing",
    ],
  },
  {
    slug: "tiktok-management",
    title: "TikTok Management",
    description:
      "Specialized TikTok content creation and growth strategies to reach younger audiences.",
    image: services2,
    alt: "TikTok Management Service",
    icon: Smartphone,
    detailedDescription:
      "Tap into the power of TikTok with our specialized management services. We create engaging short-form content that resonates with Gen Z and drives viral growth for your brand.",
    features: [
      "Trend analysis & adaptation",
      "Short-form video production",
      "Influencer collaboration",
      "Hashtag strategy",
      "Engagement optimization",
    ],
    benefits: [
      "Viral potential",
      "Reach Gen Z audience",
      "High engagement rates",
      "Brand authenticity",
      "Trend participation",
    ],
    process: [
      "Account Setup & Audit - Optimizing profile and analyzing competitors",
      "Content Strategy - Planning content themes and trends",
      "Video Production - Creating engaging TikTok videos",
      "Posting & Engagement - Publishing and interacting with audience",
      "Analytics & Optimization - Tracking performance and improving",
    ],
  },
  {
    slug: "live-streaming",
    title: "Live Streaming & Live Shopping",
    description:
      "Professional live streaming services with hosts, equipment, and studio setup for engaging live commerce.",
    image: services2,
    alt: "Live Streaming Service",
    icon: Video,
    detailedDescription:
      "Elevate your live streaming experience with our professional setup. We provide hosts with 6M+ salary, iPhone devices for quality, and complete studio equipment worth 3M+. Starting from 2M for 2 hours of live streaming per month.",
    features: [
      "Professional hosts (6M+ salary)",
      "iPhone devices for quality",
      "Complete studio setup (3M+ value)",
      "Professional lighting & audio",
      "Full service management",
    ],
    benefits: [
      "Real-time engagement",
      "Instant trust building",
      "Increased sales conversion",
      "Professional presentation",
      "Stress-free execution",
    ],
    process: [
      "Consultation - Discuss products and sales targets",
      "Planning - Define live concept and rundown",
      "Setup - Prepare studio, devices, and host",
      "Live Execution - Run live with real-time interaction",
      "Follow-up - Analyze results and optimize for next live",
    ],
  },
  {
    slug: "content-production",
    title: "Content Production (Photo & Video)",
    description:
      "Professional photo and video production services for all your content needs.",
    image: services3,
    alt: "Content Production Service",
    icon: Camera,
    detailedDescription:
      "From product photography to promotional videos, we deliver high-quality content that showcases your brand in the best light. Our professional team and equipment ensure stunning results every time.",
    features: [
      "Professional photography",
      "Video production",
      "Post-production editing",
      "Studio or on-location",
      "Equipment & crew",
    ],
    benefits: [
      "High-quality visuals",
      "Professional presentation",
      "Brand consistency",
      "Versatile content",
      "Multiple formats",
    ],
    process: [
      "Concept Development - Define creative direction and style",
      "Pre-production - Plan shots, locations, and logistics",
      "Production - Execute photography or video shoot",
      "Post-production - Edit, color grade, and finalize",
      "Delivery - Provide final assets in required formats",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Comprehensive digital marketing solutions to grow your online presence and drive conversions.",
    image: services1,
    alt: "Digital Marketing Service",
    icon: TrendingUp,
    detailedDescription:
      "We provide end-to-end digital marketing services that drive real business results. From SEO to paid advertising, we create strategies that increase visibility, engagement, and conversions.",
    features: [
      "SEO optimization",
      "PPC advertising",
      "Email marketing",
      "Marketing automation",
      "Analytics & reporting",
    ],
    benefits: [
      "Increased online visibility",
      "Higher conversion rates",
      "Targeted reach",
      "Measurable results",
      "ROI optimization",
    ],
    process: [
      "Goal Setting - Define KPIs and objectives",
      "Strategy Development - Create comprehensive marketing plan",
      "Campaign Setup - Implement tracking and launch campaigns",
      "Execution & Monitoring - Manage campaigns daily",
      "Optimization & Reporting - Analyze data and improve performance",
    ],
  },
  {
    slug: "logo-print-packaging-design",
    title: "Logo, Print & Packaging Design",
    description:
      "Complete visual design services including logo creation, print materials, and packaging design.",
    image: services3,
    alt: "Logo Print Packaging Design Service",
    icon: Palette,
    detailedDescription:
      "We create stunning visual designs that make your brand stand out. From logos to packaging, we ensure every touchpoint reflects your brand identity and appeals to your target audience.",
    features: [
      "Logo design",
      "Brand identity system",
      "Print design (brochures, flyers)",
      "Packaging design",
      "Brand guidelines",
    ],
    benefits: [
      "Professional brand image",
      "Consistent visual identity",
      "Standout packaging",
      "Professional materials",
      "Brand recognition",
    ],
    process: [
      "Brief & Research - Understand brand and requirements",
      "Concept Development - Create initial design concepts",
      "Design Creation - Develop and refine designs",
      "Refinement - Polish based on feedback",
      "Final Delivery - Provide all final assets and files",
    ],
  },
  {
    slug: "product-photography",
    title: "Product Photography",
    description:
      "Professional product photography services to showcase your products in the best light.",
    image: services1,
    alt: "Product Photography Service",
    icon: Camera,
    detailedDescription:
      "Showcase your products with professional photography that highlights their best features. Our expert photographers use professional lighting and equipment to create stunning images that drive sales.",
    features: [
      "Professional lighting",
      "High-resolution images",
      "Multiple angles",
      "White background or lifestyle",
      "Quick turnaround",
    ],
    benefits: [
      "Professional product presentation",
      "Increased sales conversion",
      "Better customer trust",
      "Versatile usage",
      "E-commerce ready",
    ],
    process: [
      "Product consultation - Discuss requirements and style",
      "Setup & styling - Prepare products and lighting",
      "Photography session - Capture all required shots",
      "Post-production - Edit and retouch images",
      "Delivery - Provide final images in various formats",
    ],
    pricing: {
      packages: [
        {
          name: "Package A",
          price: "~IDR 2,000,000",
          features: [
            "Up to 5 products",
            "3 angles per product",
            "Basic editing",
            "Web-ready images",
          ],
        },
        {
          name: "Package B",
          price: "~IDR 3,700,000",
          features: [
            "Up to 10 products",
            "5 angles per product",
            "Advanced editing",
            "Web + print ready",
            "Lifestyle shots",
          ],
        },
      ],
    },
  },
  {
    slug: "meta-ads-optimization",
    title: "Meta Ads Optimization",
    description:
      "Expert Facebook and Instagram advertising management and optimization.",
    image: services2,
    alt: "Meta Ads Optimization Service",
    icon: Target,
    detailedDescription:
      "Maximize your advertising ROI with our expert Meta Ads management. We create, optimize, and scale campaigns that reach your target audience and drive conversions on Facebook and Instagram.",
    features: [
      "Campaign strategy",
      "Ad creation & testing",
      "Audience targeting",
      "Budget management",
      "Performance optimization",
    ],
    benefits: [
      "Targeted reach",
      "Cost-effective advertising",
      "Higher conversion rates",
      "Detailed analytics",
      "Continuous optimization",
    ],
    process: [
      "Account Audit - Analyze current campaigns and performance",
      "Strategy Development - Create comprehensive advertising strategy",
      "Campaign Setup - Build campaigns with proper tracking",
      "Ongoing Management - Monitor and optimize daily",
      "Reporting & Optimization - Provide insights and improve results",
    ],
    pricing: {
      packages: [
        {
          name: "Monthly Service",
          price: "~IDR 6,000,000 / month",
          features: [
            "Campaign management",
            "Ad creation (up to 10 ads/month)",
            "A/B testing",
            "Weekly reporting",
            "Optimization",
          ],
        },
      ],
    },
  },
  {
    slug: "ecommerce-handling",
    title: "E-commerce Handling",
    description:
      "Complete e-commerce management services to run your online store efficiently.",
    image: services3,
    alt: "E-commerce Handling Service",
    icon: ShoppingCart,
    detailedDescription:
      "Let us handle the day-to-day operations of your e-commerce store. From product listings to order processing, we manage everything so you can focus on growing your business.",
    features: [
      "Product listing",
      "Inventory management",
      "Order processing",
      "Customer service",
      "Platform management",
    ],
    benefits: [
      "Hands-off operation",
      "Professional management",
      "Increased sales",
      "Better customer experience",
      "Time savings",
    ],
    process: [
      "Onboarding & Setup - Integrate with your platform",
      "Product Integration - Upload and optimize products",
      "Daily Operations - Manage listings and orders",
      "Order Management - Process and track orders",
      "Monthly Review - Analyze performance and improve",
    ],
    pricing: {
      packages: [
        {
          name: "Monthly Service",
          price: "~IDR 2,500,000 / month",
          features: [
            "Product uploads (up to 20/month)",
            "Order processing",
            "Customer inquiries",
            "Basic inventory tracking",
            "Monthly reporting",
          ],
        },
      ],
    },
  },
  {
    slug: "logo-identity-design",
    title: "Logo & Identity Design",
    description:
      "Professional logo and brand identity design services to establish your brand.",
    image: services1,
    alt: "Logo Identity Design Service",
    icon: Star,
    detailedDescription:
      "Create a memorable brand identity with our professional logo and identity design services. We craft unique logos and comprehensive brand systems that set you apart from competitors.",
    features: [
      "Logo design concepts",
      "Color palette",
      "Typography selection",
      "Brand guidelines",
      "Multiple file formats",
    ],
    benefits: [
      "Unique brand identity",
      "Professional appearance",
      "Brand recognition",
      "Versatile usage",
      "Scalable assets",
    ],
    process: [
      "Discovery & Brief - Understand brand and requirements",
      "Research & Concept - Research market and develop concepts",
      "Design Development - Create and refine logo designs",
      "Refinement - Polish based on feedback",
      "Final Delivery - Provide all files and guidelines",
    ],
    pricing: {
      startingFrom: "IDR 2,000,000",
    },
  },
  {
    slug: "website-digital-experience",
    title: "Website & Digital Experience",
    description:
      "Modern, fast, and conversion-oriented website development and digital experiences.",
    image: services3,
    alt: "Website & Digital Experience",
    icon: Monitor,
    detailedDescription:
      "We design and develop websites that are not only visually stunning but also highly functional and conversion-focused. Using user-centered design and cutting-edge technology, we create digital experiences that drive results.",
    features: [
      "UI/UX Design & Prototyping",
      "Frontend Development",
      "Backend Development",
      "CMS Integration",
      "Performance Optimization",
    ],
    benefits: [
      "Higher conversion rates",
      "Improved user experience",
      "Better SEO and organic traffic",
      "Faster loading times",
      "Easy content management",
    ],
    process: [
      "Discovery & Requirements - Understand business needs and users",
      "UX Research & Design - Research users and design experience",
      "UI Design & Prototyping - Design visuals and create prototypes",
      "Development - Implement with best practices",
      "Testing & Launch - Test, optimize, and launch",
    ],
  },
  {
    slug: "creative-content-campaign",
    title: "Creative Content & Campaign",
    description:
      "Engaging creative content and campaign development to boost brand engagement.",
    image: services2,
    alt: "Creative Content & Campaign",
    icon: Zap,
    detailedDescription:
      "We create content and campaigns that not only capture attention but also deliver real impact. From content strategy to creative execution, we ensure every piece of content is relevant to your audience and aligned with your business goals.",
    features: [
      "Content Strategy & Planning",
      "Social Media Content",
      "Campaign Concept & Creative",
      "Copywriting & Storytelling",
      "Content Calendar Management",
    ],
    benefits: [
      "Increased engagement and interaction",
      "Stronger brand awareness",
      "Higher organic traffic and reach",
      "Loyal community building",
      "Support for conversion and sales goals",
    ],
    process: [
      "Audience Research - Understand target audience and their needs",
      "Content Strategy - Plan content types and appropriate channels",
      "Creative Development - Create engaging and relevant content",
      "Distribution & Promotion - Distribute content on right channels",
      "Analytics & Optimization - Measure performance and optimize strategy",
    ],
  },
  {
    slug: "brand-identity-visual-design",
    title: "Brand Identity & Visual Design",
    description:
      "Building strong, consistent, and memorable visual identity for brand positioning.",
    image: services1,
    alt: "Brand Identity Design",
    icon: Box,
    detailedDescription:
      "We help you create a unique and memorable brand identity. Through a strategic approach, we develop visual systems that include logos, color palettes, typography, and usage guidelines consistent across all your brand touchpoints.",
    features: [
      "Logo Design & Identity System",
      "Color Palette & Typography",
      "Brand Guidelines & Style Guide",
      "Visual Assets & Templates",
      "Brand Voice & Messaging",
    ],
    benefits: [
      "Increased brand recognition and recall",
      "Professional and trustworthy impression",
      "Differentiation from competitors",
      "Visual consistency across all channels",
      "Easy brand scaling to various media",
    ],
    process: [
      "Discovery & Research - Understand business, target audience, and competitors",
      "Strategy Development - Define positioning and brand personality",
      "Concept Creation - Develop visual concepts and design exploration",
      "Design Refinement - Perfect designs based on feedback",
      "Final Delivery - Deliver all assets and usage guidelines",
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug)
}
