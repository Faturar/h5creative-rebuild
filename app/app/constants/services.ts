import { type StaticImageData } from "next/image"
import services1 from "@/public/assets/images/services1.png"
import services2 from "@/public/assets/images/services2.png"
import services3 from "@/public/assets/images/services3.png"
import { Box } from "lucide-react"

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
}

export const services: Service[] = [
  {
    slug: "brand-identity-visual-design",
    title: "Brand Identity & Visual Design",
    description:
      "Membangun identitas visual yang kuat, konsisten, dan mudah diingat untuk memperkuat positioning brand Anda.",
    image: services1,
    alt: "Brand Identity Design",
    icon: Box,
    detailedDescription:
      "Kami membantu Anda menciptakan identitas brand yang unik dan berkesan. Melalui pendekatan strategis, kami mengembangkan sistem visual yang mencakup logo, palet warna, tipografi, dan panduan penggunaan yang konsisten di semua touchpoint brand Anda.",
    features: [
      "Logo Design & Identity System",
      "Color Palette & Typography",
      "Brand Guidelines & Style Guide",
      "Visual Assets & Templates",
      "Brand Voice & Messaging",
    ],
    benefits: [
      "Meningkatkan brand recognition dan recall",
      "Menciptakan kesan profesional dan terpercaya",
      "Membedakan brand dari kompetitor",
      "Konsistensi visual di semua channel",
      "Memudahkan scaling brand ke berbagai media",
    ],
    process: [
      "Discovery & Research - Memahami bisnis, target audience, dan kompetitor",
      "Strategy Development - Mendefinisikan positioning dan personality brand",
      "Concept Creation - Mengembangkan konsep visual dan eksplorasi desain",
      "Design Refinement - Menyempurnakan desain berdasarkan feedback",
      "Final Delivery - Menyerahkan semua aset dan panduan penggunaan",
    ],
  },
  {
    slug: "creative-content-campaign",
    title: "Creative Content & Campaign",
    description:
      "Menciptakan konten dan campaign kreatif yang menarik perhatian dan meningkatkan engagement.",
    image: services2,
    alt: "Creative Content & Campaign",
    icon: Box,
    detailedDescription:
      "Kami menciptakan konten dan campaign yang tidak hanya menarik perhatian tetapi juga memberikan dampak nyata. Dari strategi konten hingga eksekusi kreatif, kami memastikan setiap konten yang kami buat relevan dengan audience dan sesuai dengan tujuan bisnis Anda.",
    features: [
      "Content Strategy & Planning",
      "Social Media Content",
      "Campaign Concept & Creative",
      "Copywriting & Storytelling",
      "Content Calendar Management",
    ],
    benefits: [
      "Meningkatkan engagement dan interaksi audience",
      "Membangun brand awareness yang kuat",
      "Meningkatkan traffic dan reach organik",
      "Menciptakan komunitas yang loyal",
      "Mendukung conversion dan sales goals",
    ],
    process: [
      "Audience Research - Memahami siapa target audience dan apa yang mereka cari",
      "Content Strategy - Merencanakan jenis konten dan channel yang tepat",
      "Creative Development - Menciptakan konten yang engaging dan relevan",
      "Distribution & Promotion - Mendistribusikan konten di channel yang tepat",
      "Analytics & Optimization - Mengukur performa dan mengoptimalkan strategi",
    ],
  },
  {
    slug: "website-digital-experience",
    title: "Website & Digital Experience",
    description:
      "Menghadirkan pengalaman digital yang modern, cepat, dan berorientasi pada konversi.",
    image: services3,
    alt: "Website & Digital Experience",
    icon: Box,
    detailedDescription:
      "Kami merancang dan mengembangkan website yang tidak hanya indah secara visual tetapi juga fungsional dan berorientasi pada hasil. Dengan pendekatan user-centered design dan teknologi terkini, kami menciptakan pengalaman digital yang meningkatkan konversi dan memuaskan pengguna.",
    features: [
      "UI/UX Design & Prototyping",
      "Frontend Development",
      "Backend Development",
      "CMS Integration",
      "Performance Optimization",
    ],
    benefits: [
      "Meningkatkan conversion rate dan sales",
      "Memperbaiki user experience dan satisfaction",
      "Meningkatkan SEO dan organic traffic",
      "Mempercepat loading time dan performance",
      "Memudahkan management konten dan update",
    ],
    process: [
      "Discovery & Requirements - Memahami kebutuhan bisnis dan user",
      "UX Research & Design - Riset user dan desain user experience",
      "UI Design & Prototyping - Desain visual dan prototyping",
      "Development - Implementasi teknis dengan best practices",
      "Testing & Launch - Testing, optimization, dan peluncuran",
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug)
}
