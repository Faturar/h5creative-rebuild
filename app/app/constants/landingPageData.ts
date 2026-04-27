import services1 from "@/public/assets/images/services1.png"
import services2 from "@/public/assets/images/services2.png"
import services3 from "@/public/assets/images/services3.png"
import logo from "@/public/assets/images/logos/logo.svg"
import eclipseImage from "@/public/assets/images/Ellipse.svg"
import { Box, MessageCircle, ChevronDown, Phone, Mail } from "lucide-react"

// Services Data
export const SERVICES_DATA = [
  {
    id: 1,
    slug: "brand-identity-visual-design",
    title: "Brand Identity & Visual Design",
    description:
      "Membangun identitas visual yang kuat, konsisten, dan mudah diingat untuk memperkuat positioning brand Anda.",
    image: services1,
    alt: "Brand Identity Design",
  },
  {
    id: 2,
    slug: "creative-content-campaign",
    title: "Creative Content & Campaign",
    description:
      "Menciptakan konten dan campaign kreatif yang menarik perhatian dan meningkatkan engagement.",
    image: services2,
    alt: "Creative Content & Campaign",
  },
  {
    id: 3,
    slug: "website-digital-experience",
    title: "Website & Digital Experience",
    description:
      "Menghadirkan pengalaman digital yang modern, cepat, dan berorientasi pada konversi.",
    image: services2,
    alt: "Website & Digital Experience",
  },
  {
    id: 4,
    slug: "live-streaming",
    title: "Live Streaming",
    description:
      "Platform live streaming profesional dengan host berpengalaman, device berkualitas, dan studio lengkap untuk kebutuhan bisnis Anda.",
    image: services2,
    alt: "Live Streaming",
  },
]

// Featured Service Data
export const FEATURED_SERVICE_DATA = {
  id: 4,
  slug: "strategi-eksekusi-kreatif-terintegrasi",
  title: "Strategi & Eksekusi Kreatif yang Terintegrasi",
  description:
    "Dari ide hingga implementasi, kami membantu brand Anda berkembang dengan pendekatan kreatif yang terarah dan terukur.",
  image: services3,
  icon: Box,
  alt: "Strategi & Eksekusi Kreatif yang Terintegrasi",
}

// Header Data
export const HEADER_DATA = {
  title: "WE COOK THE IDEAS AND SPEED",
  highlightedText: "YOUR GROWTH",
  description:
    "We focus on artistic + innovative digital ideas for brand and business growth. Comprehensive 360° campaign solutions to help your brand succeed.",
  buttonText: "Get Started Now",
  buttonIcon: "→",
  heroImage: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
  heroAlt: "Digital Marketing",
}

// Services Section Data
export const SERVICES_SECTION_DATA = {
  titleLine1: "What We Can Do",
  titleLine2: "for Your Brand",
  buttonText: "All Services",
  buttonLink: "/service",
}

// Recent Work Section Data
export const RECENT_WORK_SECTION_DATA = {
  titleLine1: "TAKE A LOOK AT",
  titleLine2: "OUR RECENT WORK",
  description:
    "Beberapa project yang kami kerjakan untuk membantu brand berkembang.",
  buttonText: "More Projects",
  buttonIcon: "→",
  projects: [
    {
      id: 1,
      slug: "social-media-growth-campaign",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
      height: "h-[460px]",
      year: "2024",
      author: "Brand Project",
      title: "Pengembangan Identitas Brand untuk Meningkatkan Kepercayaan",
    },
    {
      id: 2,
      slug: "ecommerce-platform-redesign",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
      height: "h-[420px]",
      year: "2024",
      author: "Creative Campaign",
      title: "Campaign Kreatif untuk Meningkatkan Engagement Audience",
    },
    {
      id: 3,
      slug: "mobile-app-development",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
      height: "h-[440px]",
      year: "2024",
      author: "Digital Experience",
      title: "Desain Website Modern dengan Fokus pada Konversi",
    },
    {
      id: 4,
      slug: "multi-power-aditama-brand-campaign",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      height: "h-[420px]",
      year: "2024",
      author: "Brand Strategy",
      title: "Strategi Visual & Komunikasi untuk Memperkuat Positioning Brand",
    },
  ],
}

// Business Section Data
export const BUSINESS_SECTION_DATA = {
  title: "Bagaimana Kami Membantu Brand Anda Bertumbuh",
  description:
    "Kami menggabungkan strategi, kreativitas, dan eksekusi untuk membangun brand yang kuat, relevan, dan mampu memberikan dampak nyata bagi bisnis Anda.",
  buttonText: "Lihat Semua Layanan",
  buttonIcon: "→",
  services: [
    {
      id: 1,
      title: "Brand Identity",
      description:
        "Kami membangun identitas brand yang kuat, konsisten, dan mudah diingat untuk memperkuat positioning bisnis Anda.",
      image: "/assets/images/laptop.png",
    },
    {
      id: 2,
      title: "Konten Kreatif",
      description:
        "Kami menciptakan konten yang menarik, relevan, dan mampu meningkatkan engagement serta kepercayaan terhadap brand Anda.",
      image: "/assets/images/laptop.png",
    },
    {
      id: 3,
      title: "Website & Digital Experience",
      description:
        "Kami menghadirkan pengalaman digital yang modern, cepat, dan dirancang untuk meningkatkan konversi bisnis Anda.",
      image: "/assets/images/laptop.png",
    },
    {
      id: 4,
      title: "Campaign Kreatif",
      description:
        "Kami merancang dan mengeksekusi campaign kreatif untuk meningkatkan awareness, engagement, dan pertumbuhan brand Anda.",
      image: "/assets/images/laptop.png",
    },
  ],
  defaultActiveService: "Website & Digital Experience",
}

// FAQ Section Data
export const FAQ_SECTION_DATA = {
  title: "Pertanyaan yang Sering Diajukan",
  description:
    "Punya pertanyaan? Kami siap membantu dan menjawab kebutuhan Anda.",
  buttonText: "Hubungi Kami",
  icon: MessageCircle,
  arrowIcon: ChevronDown,
  defaultActiveIndex: 0,
  faqs: [
    {
      id: 1,
      question: "Bagaimana proses kerja kami?",
      answer:
        "Kami memulai dengan memahami kebutuhan dan tujuan brand Anda, dilanjutkan dengan perencanaan strategi, eksekusi kreatif, hingga evaluasi untuk memastikan hasil yang maksimal.",
    },
    {
      id: 2,
      question: "Berapa biaya untuk setiap project?",
      answer:
        "Biaya disesuaikan dengan kebutuhan dan scope project. Kami menyediakan solusi yang fleksibel agar tetap relevan dengan budget dan tujuan bisnis Anda.",
    },
    {
      id: 3,
      question: "Apakah bisa bekerja jangka panjang?",
      answer:
        "Tentu. Kami terbuka untuk kolaborasi jangka panjang sebagai creative partner untuk membantu brand Anda terus berkembang.",
    },
    {
      id: 4,
      question: "Berapa lama pengerjaan sebuah project?",
      answer:
        "Durasi pengerjaan tergantung pada kompleksitas dan kebutuhan project. Kami akan memberikan estimasi timeline yang jelas di awal agar proses berjalan transparan dan terarah.",
    },
  ],
}

// Contact Section Data
export const CONTACT_SECTION_DATA = {
  title: "Contact Us",
  subtitle: "Let's Create Something Amazing Together",
  description:
    "Have a project you want to develop? We're ready to help bring your ideas to life with impactful results.",
  buttonText: "Send Message",
  buttonIcon: "→",
  contactInfo: [
    {
      id: 1,
      type: "Phone",
      value: "+62 812-3456-7890",
      icon: Phone,
      link: "tel:+6281234567890",
    },
    {
      id: 2,
      type: "Email",
      value: "hello@h5creative.com",
      icon: Mail,
      link: "mailto:hello@h5creative.com",
    },
  ],
  formFields: [
    {
      id: "name",
      type: "text",
      placeholder: "Your Name",
      required: true,
    },
    {
      id: "email",
      type: "email",
      placeholder: "Your Email",
      required: true,
    },
    {
      id: "subject",
      type: "text",
      placeholder: "Subject",
      required: true,
    },
    {
      id: "message",
      type: "textarea",
      placeholder: "Your Message",
      required: true,
    },
  ],
}

// CTA Section Data
export const CTA_SECTION_DATA = {
  title: "Ready to Grow Your Brand?",
  subtitle: "Let's Collaborate and Achieve Your Vision Together",
  description:
    "With creative and strategic approaches, we're ready to help your brand reach its maximum potential and compete in the dynamic market.",
  primaryButtonText: "Start Your Project",
  primaryButtonIcon: "→",
  secondaryButtonText: "View Portfolio",
  stats: [
    {
      id: 1,
      value: "100+",
      label: "Brands",
    },
    {
      id: 2,
      value: "150+",
      label: "Projects",
    },
    {
      id: 3,
      value: "3 Years",
      label: "Experience",
    },
    {
      id: 4,
      value: "100M+",
      label: "Ads Spending",
    },
  ],
}

// Footer Section Data
export const FOOTER_DATA = {
  logo: logo,
  eclipseImage: eclipseImage,
  sections: [
    {
      title: "Explore",
      links: [
        { text: "Services", href: "#" },
        { text: "Testimonials", href: "#" },
        { text: "Pricing", href: "#" },
        { text: "About", href: "#" },
      ],
    },
    {
      title: "Services",
      links: [
        { text: "UI/UX Design", href: "#" },
        { text: "Web Development", href: "#" },
        { text: "Data Science", href: "#" },
        { text: "Digital Marketing", href: "#" },
      ],
    },
    {
      title: "About",
      links: [
        { text: "My Profile", href: "#" },
        { text: "How do I work", href: "#" },
        { text: "Achievements", href: "#" },
        { text: "Team A", href: "#" },
      ],
    },
    {
      title: "Connect",
      links: [
        {
          text: "+1 2208 1996",
          href: "#",
          icon: "Phone",
        },
        {
          text: "buildwithangga",
          href: "#",
          icon: "Dribbble",
        },
        {
          text: "team@bwa.com",
          href: "#",
          icon: "Mail",
        },
      ],
    },
  ],
  copyright: "All Rights Reserved. Copyright BuildWithAngga 2024.",
}
