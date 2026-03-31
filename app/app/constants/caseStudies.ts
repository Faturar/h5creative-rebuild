import { type StaticImageData } from "next/image"

import detailsThumbnail from "@/public/assets/images/thumbnails/details-thumbnail.png"
import thumbnail1 from "@/public/assets/images/thumbnails/thumbnail1.png"
import thumbnail2 from "@/public/assets/images/thumbnails/thumbnail2.png"
import thumbnail3 from "@/public/assets/images/thumbnails/thumbnail3.png"
import personPhoto from "@/public/assets/images/photo/photo5.png"
import logoTesti5 from "@/public/assets/images/logos/logo-testi5.svg"
import crownBlackIcon from "@/public/assets/images/icons/crown-black.svg"
import codeBlackIcon from "@/public/assets/images/icons/code-black.svg"
import chartBlackIcon from "@/public/assets/images/icons/chart-2-black.svg"

// Types
export interface ProjectMetadata {
  label: string
  value: string
}

export interface ChallengeItem {
  title: string
  items: string[]
}

export interface SolutionItem {
  title: string
  description: string
}

export interface ProcessItem {
  step: number
  title: string
  description: string
}

export interface ShowcaseItem {
  image: StaticImageData
  title: string
  description: string
}

export interface StatItem {
  value: string
  label: string
  color: string
  iconName: "TrendingUp" | "TrendingDown" | "Users" | "Clock" | "Star"
}

export interface ServiceItem {
  icon: StaticImageData
  title: string
  description: string
}

export interface AchievementItem {
  iconColor: string
  text: string
}

export interface CaseStudy {
  slug: string
  heroImage: StaticImageData
  logo: StaticImageData
  title: string
  subtitle: string
  metadata: ProjectMetadata[]
  overview: string[]
  challenges: ChallengeItem[]
  solutions: SolutionItem[]
  processItems: ProcessItem[]
  showcaseItems: ShowcaseItem[]
  statItems: StatItem[]
  achievements: AchievementItem[]
  testimonial: {
    quote: string
    author: string
    role: string
    avatar: StaticImageData
    companyLogo?: StaticImageData
  }
  services: ServiceItem[]
  ctaTitle: string
  ctaSubtitle: string
}

// Case Studies Data
export const caseStudies: CaseStudy[] = [
  {
    slug: "financeai-platform",
    heroImage: detailsThumbnail,
    logo: logoTesti5,
    title: "Transforming Financial Management Through AI",
    subtitle:
      "How we helped a fintech startup build an intelligent finance platform that increased user engagement by 45%",
    metadata: [
      { label: "Client", value: "FinTech Innovations Inc." },
      { label: "Industry", value: "Financial Services" },
      { label: "Timeline", value: "12 weeks" },
      {
        label: "Services",
        value: "UI/UX Design, Web Development, Brand Identity",
      },
    ],
    overview: [
      "FinanceAI is a cutting-edge fintech platform that revolutionizes personal finance management through artificial intelligence. Built for modern professionals who want to take control of their financial future, the platform provides real-time insights, personalized recommendations, and automated budget management.",
      "We partnered with FinTech Innovations Inc. to design and develop a complete web application that combines sophisticated AI algorithms with an intuitive user experience, making financial management accessible and engaging for everyone.",
    ],
    challenges: [
      {
        title: "Client Problem",
        items: [
          "Existing finance apps were complex and overwhelming for average users",
          "Users struggled to understand their financial health at a glance",
          "Low engagement rates (only 15% monthly active users) and high churn",
        ],
      },
      {
        title: "Business Pain Points",
        items: [
          "Difficult to attract and retain users in a competitive market",
          "Competing against established financial institutions with bigger budgets",
          "Needed to differentiate and prove value quickly to new users",
        ],
      },
      {
        title: "User Problems",
        items: [
          "Information overload with too many data points",
          "Lack of actionable insights and personalized recommendations",
          "Poor mobile experience and slow load times",
        ],
      },
    ],
    solutions: [
      {
        title: "Strategy",
        description:
          "Simplify complexity with intelligent AI that learns from user behavior. Focus on actionable insights, not data overload. Create delightful micro-interactions that make finance engaging.",
      },
      {
        title: "UX Decisions",
        description:
          "Progressive disclosure of information based on user expertise. Personalized dashboard that adapts to individual financial goals. Gamification elements (progress bars, achievements) to increase engagement.",
      },
      {
        title: "Design Thinking",
        description:
          "User-centered design throughout the entire process. Rapid prototyping and A/B testing with real users. Iterative refinement based on continuous feedback.",
      },
    ],
    processItems: [
      {
        step: 1,
        title: "Research",
        description:
          "Conducted extensive user research, including 20+ interviews, competitive analysis, and persona development to understand user needs and pain points.",
      },
      {
        step: 2,
        title: "Wireframing",
        description:
          "Created low-fidelity wireframes to map out user flows and information architecture, focusing on simplicity and clarity.",
      },
      {
        step: 3,
        title: "UI Design",
        description:
          "Developed high-fidelity designs with a modern, clean aesthetic that balances functionality with visual appeal.",
      },
      {
        step: 4,
        title: "Development",
        description:
          "Built platform using React and Next.js, implementing AI algorithms and ensuring optimal performance and accessibility.",
      },
    ],
    showcaseItems: [
      {
        image: thumbnail1,
        title: "Dashboard UI",
        description:
          "Main dashboard with real-time insights and personalized recommendations",
      },
      {
        image: thumbnail2,
        title: "Analytics View",
        description: "Comprehensive analytics with visual data representations",
      },
      {
        image: thumbnail3,
        title: "Mobile Experience",
        description:
          "Optimized mobile interface for on-the-go financial management",
      },
      {
        image: detailsThumbnail,
        title: "Settings Panel",
        description: "Intuitive settings and configuration options",
      },
      {
        image: thumbnail1,
        title: "Budget Tracker",
        description: "Interactive budget tracking with AI-powered suggestions",
      },
      {
        image: thumbnail2,
        title: "Investment View",
        description: "Portfolio management and investment insights",
      },
    ],
    statItems: [
      {
        value: "+45%",
        label: "User Engagement",
        color: "#2E2BFF",
        iconName: "TrendingUp",
      },
      {
        value: "-30%",
        label: "Bounce Rate",
        color: "#12BB74",
        iconName: "TrendingDown",
      },
      {
        value: "+60%",
        label: "Conversion Rate",
        color: "#2E2BFF",
        iconName: "Users",
      },
      {
        value: "+2.5x",
        label: "Time on Site",
        color: "#FFE7C2",
        iconName: "Clock",
      },
      {
        value: "4.8/5",
        label: "User Rating",
        color: "#FFE7C2",
        iconName: "Star",
      },
    ],
    achievements: [
      {
        iconColor: "#2E2BFF",
        text: "Increased user engagement from 15% to 45% within first month",
      },
      {
        iconColor: "#12BB74",
        text: "Reduced bounce rate by 30% through improved UX",
      },
      {
        iconColor: "#2E2BFF",
        text: "Achieved 60% increase in conversion rate for key actions",
      },
      {
        iconColor: "#FFE7C2",
        text: "Maintained 4.8/5 user rating across all reviews",
      },
    ],
    testimonial: {
      quote:
        "The team transformed our vision into reality. The new platform exceeded our expectations and delivered measurable business results. Our user engagement increased by 45% within first month of launch.",
      author: "Sarah Chen",
      role: "CEO, FinTech Innovations Inc.",
      avatar: personPhoto,
      companyLogo: logoTesti5,
    },
    services: [
      {
        icon: crownBlackIcon,
        title: "UI/UX Design",
        description: "User-centered design with focus on conversion",
      },
      {
        icon: codeBlackIcon,
        title: "Web Development",
        description: "Modern React & Next.js implementation",
      },
      {
        icon: chartBlackIcon,
        title: "Brand Identity",
        description: "Cohesive visual language and guidelines",
      },
      {
        icon: crownBlackIcon,
        title: "Motion Design",
        description: "Engaging animations and micro-interactions",
      },
    ],
    ctaTitle: "Let's Build Something Great Together",
    ctaSubtitle:
      "Ready to transform your digital presence? Let's create something amazing that drives real business results.",
  },
  {
    slug: "ecommerce-redesign",
    heroImage: thumbnail1,
    logo: logoTesti5,
    title: "E-commerce Platform Redesign",
    subtitle:
      "How we increased conversion rates by 60% through strategic UX improvements",
    metadata: [
      { label: "Client", value: "RetailMax Inc." },
      { label: "Industry", value: "E-commerce & Retail" },
      { label: "Timeline", value: "16 weeks" },
      {
        label: "Services",
        value: "UI/UX Design, Frontend Development, CRO",
      },
    ],
    overview: [
      "RetailMax is a leading e-commerce platform specializing in fashion and lifestyle products. Despite having a strong product catalog, the platform was struggling with low conversion rates and poor user experience.",
      "Our mission was to completely redesign the platform to create a seamless shopping experience that drives conversions while maintaining brand identity.",
    ],
    challenges: [
      {
        title: "Client Problem",
        items: [
          "Low conversion rate of 1.2% (industry average is 2.5%)",
          "High cart abandonment rate of 75%",
          "Poor mobile experience contributing to lost sales",
        ],
      },
      {
        title: "Business Pain Points",
        items: [
          "Revenue stagnation despite increased traffic",
          "Difficulty competing with major e-commerce platforms",
          "Need to improve average order value",
        ],
      },
      {
        title: "User Problems",
        items: [
          "Complex checkout process with too many steps",
          "Poor product discovery and search functionality",
          "Lack of personalized recommendations",
        ],
      },
    ],
    solutions: [
      {
        title: "Strategy",
        description:
          "Streamline the checkout process to reduce friction. Implement AI-powered product recommendations. Optimize mobile experience for on-the-go shopping.",
      },
      {
        title: "UX Decisions",
        description:
          "One-page checkout with guest checkout option. Smart search with autocomplete. Personalized product suggestions based on browsing history.",
      },
      {
        title: "Design Thinking",
        description:
          "Mobile-first design approach. A/B testing of key conversion points. Continuous optimization based on user behavior data.",
      },
    ],
    processItems: [
      {
        step: 1,
        title: "Research",
        description:
          "Analyzed user behavior data, conducted 30+ user interviews, and performed competitive analysis of top e-commerce platforms.",
      },
      {
        step: 2,
        title: "Wireframing",
        description:
          "Created wireframes for key user flows, focusing on reducing steps to checkout and improving product discovery.",
      },
      {
        step: 3,
        title: "UI Design",
        description:
          "Designed a clean, modern interface with emphasis on product photography and clear calls-to-action.",
      },
      {
        step: 4,
        title: "Development",
        description:
          "Implemented responsive design using Next.js, optimized for performance and SEO.",
      },
    ],
    showcaseItems: [
      {
        image: thumbnail2,
        title: "Homepage Design",
        description: "Modern homepage with featured collections",
      },
      {
        image: thumbnail3,
        title: "Product Grid",
        description: "Responsive product listing with filters",
      },
      {
        image: thumbnail1,
        title: "Product Detail",
        description: "Enhanced product page with recommendations",
      },
      {
        image: thumbnail2,
        title: "Quick View",
        description: "Modal for quick product preview",
      },
      {
        image: thumbnail3,
        title: "Cart Page",
        description: "Simplified cart with cross-sell suggestions",
      },
      {
        image: thumbnail1,
        title: "Checkout Flow",
        description: "Streamlined checkout process",
      },
    ],
    statItems: [
      {
        value: "+60%",
        label: "Conversion Rate",
        color: "#2E2BFF",
        iconName: "TrendingUp",
      },
      {
        value: "-45%",
        label: "Cart Abandonment",
        color: "#12BB74",
        iconName: "TrendingDown",
      },
      {
        value: "+35%",
        label: "Average Order Value",
        color: "#2E2BFF",
        iconName: "Users",
      },
      {
        value: "+40%",
        label: "Mobile Revenue",
        color: "#FFE7C2",
        iconName: "Clock",
      },
      {
        value: "4.9/5",
        label: "User Rating",
        color: "#FFE7C2",
        iconName: "Star",
      },
    ],
    achievements: [
      {
        iconColor: "#2E2BFF",
        text: "Increased conversion rate from 1.2% to 1.92%",
      },
      {
        iconColor: "#12BB74",
        text: "Reduced cart abandonment from 75% to 41%",
      },
      {
        iconColor: "#2E2BFF",
        text: "Achieved 35% increase in average order value",
      },
      {
        iconColor: "#FFE7C2",
        text: "Mobile revenue increased by 40%",
      },
    ],
    testimonial: {
      quote:
        "The redesign transformed our business. We saw immediate improvements in conversion rates and customer satisfaction. The team's attention to detail and focus on user experience was exceptional.",
      author: "Michael Torres",
      role: "COO, RetailMax Inc.",
      avatar: personPhoto,
      companyLogo: logoTesti5,
    },
    services: [
      {
        icon: crownBlackIcon,
        title: "UI/UX Design",
        description: "Conversion-focused design",
      },
      {
        icon: codeBlackIcon,
        title: "Frontend Development",
        description: "Next.js implementation",
      },
      {
        icon: chartBlackIcon,
        title: "CRO",
        description: "Conversion rate optimization",
      },
      {
        icon: crownBlackIcon,
        title: "Analytics",
        description: "Data-driven insights",
      },
    ],
    ctaTitle: "Transform Your E-commerce Experience",
    ctaSubtitle:
      "Ready to boost your conversion rates? Let's create a shopping experience that converts.",
  },
  {
    slug: "mobile-app-development",
    heroImage: thumbnail2,
    logo: logoTesti5,
    title: "Cross-Platform Mobile App",
    subtitle:
      "How we built a successful mobile app serving 100K+ users across iOS and Android",
    metadata: [
      { label: "Client", value: "HealthTrack Pro" },
      { label: "Industry", value: "Health & Fitness" },
      { label: "Timeline", value: "20 weeks" },
      {
        label: "Services",
        value: "Mobile Development, UI/UX Design, Backend Integration",
      },
    ],
    overview: [
      "HealthTrack Pro is a comprehensive health and fitness tracking application that helps users monitor their daily activities, nutrition, and workout routines. The client needed a cross-platform solution that could deliver native-like performance on both iOS and Android.",
      "We developed a feature-rich mobile application using React Native, ensuring consistent user experience across platforms while maintaining optimal performance and battery efficiency.",
    ],
    challenges: [
      {
        title: "Client Problem",
        items: [
          "Needed to launch on both iOS and Android simultaneously",
          "Complex data synchronization requirements",
          "Performance concerns with real-time tracking features",
        ],
      },
      {
        title: "Business Pain Points",
        items: [
          "Tight deadline to beat competitors to market",
          "Limited budget for native development on both platforms",
          "Need for rapid iteration and updates",
        ],
      },
      {
        title: "User Problems",
        items: [
          "Inconsistent experience across different devices",
          "Battery drain from continuous tracking",
          "Difficulty syncing data between devices",
        ],
      },
    ],
    solutions: [
      {
        title: "Strategy",
        description:
          "Use React Native for cross-platform development. Implement efficient state management for real-time sync. Optimize battery usage with smart tracking algorithms.",
      },
      {
        title: "UX Decisions",
        description:
          "Native-like animations and gestures. Offline-first architecture with background sync. Personalized dashboards based on user goals.",
      },
      {
        title: "Design Thinking",
        description:
          "Platform-specific design adaptations. Accessibility-first approach. Continuous user testing throughout development.",
      },
    ],
    processItems: [
      {
        step: 1,
        title: "Research",
        description:
          "Conducted market research, analyzed competitor apps, and interviewed 50+ potential users to understand fitness tracking needs.",
      },
      {
        step: 2,
        title: "Prototyping",
        description:
          "Created interactive prototypes for both iOS and Android, testing platform-specific interactions and gestures.",
      },
      {
        step: 3,
        title: "Development",
        description:
          "Built the app using React Native with native modules for performance-critical features like GPS and sensors.",
      },
      {
        step: 4,
        title: "Testing",
        description:
          "Conducted extensive testing on 20+ devices, performed beta testing with 500 users, and optimized based on feedback.",
      },
    ],
    showcaseItems: [
      {
        image: thumbnail3,
        title: "Onboarding",
        description: "Personalized setup experience",
      },
      {
        image: thumbnail1,
        title: "Dashboard",
        description: "Daily activity overview",
      },
      {
        image: thumbnail2,
        title: "Workout Tracking",
        description: "Real-time exercise monitoring",
      },
      {
        image: thumbnail3,
        title: "Nutrition Log",
        description: "Meal and calorie tracking",
      },
      {
        image: thumbnail1,
        title: "Progress Charts",
        description: "Visual progress analytics",
      },
      {
        image: thumbnail2,
        title: "Social Features",
        description: "Community and challenges",
      },
    ],
    statItems: [
      {
        value: "100K+",
        label: "Active Users",
        color: "#2E2BFF",
        iconName: "Users",
      },
      {
        value: "4.7/5",
        label: "App Store Rating",
        color: "#FFE7C2",
        iconName: "Star",
      },
      {
        value: "+80%",
        label: "User Retention",
        color: "#2E2BFF",
        iconName: "TrendingUp",
      },
      {
        value: "30min",
        label: "Avg Daily Usage",
        color: "#FFE7C2",
        iconName: "Clock",
      },
      {
        value: "-25%",
        label: "Battery Impact",
        color: "#12BB74",
        iconName: "TrendingDown",
      },
    ],
    achievements: [
      {
        iconColor: "#2E2BFF",
        text: "Achieved 100K+ active users within 6 months",
      },
      {
        iconColor: "#FFE7C2",
        text: "Maintained 4.7/5 rating on both app stores",
      },
      {
        iconColor: "#2E2BFF",
        text: "80% user retention rate after 30 days",
      },
      {
        iconColor: "#12BB74",
        text: "Reduced battery consumption by 25%",
      },
    ],
    testimonial: {
      quote:
        "The team delivered an exceptional mobile app that exceeded our expectations. The cross-platform approach saved us significant time and resources while delivering native-quality performance.",
      author: "Emily Johnson",
      role: "CEO, HealthTrack Pro",
      avatar: personPhoto,
      companyLogo: logoTesti5,
    },
    services: [
      {
        icon: crownBlackIcon,
        title: "Mobile Development",
        description: "React Native implementation",
      },
      {
        icon: codeBlackIcon,
        title: "Backend Integration",
        description: "API and database design",
      },
      {
        icon: chartBlackIcon,
        title: "UI/UX Design",
        description: "Platform-specific adaptations",
      },
      {
        icon: crownBlackIcon,
        title: "QA Testing",
        description: "Device compatibility testing",
      },
    ],
    ctaTitle: "Build Your Mobile App",
    ctaSubtitle:
      "Ready to bring your app idea to life? Let's create a mobile experience users love.",
  },
]

// Helper functions
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug)
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((caseStudy) => caseStudy.slug)
}
