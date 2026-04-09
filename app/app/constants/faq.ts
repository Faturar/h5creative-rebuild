export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface FAQData {
  title: string
  description: string
  buttonText: string
  defaultActiveIndex: number
  faqs: FAQItem[]
}

export const liveStreamingFAQ: FAQData = {
  title: "FAQ LIVE STREAMING",
  description: "Temukan jawaban untuk pertanyaan umum tentang layanan live streaming kami",
  buttonText: "Hubungi Kami",
  defaultActiveIndex: 0,
  faqs: [
    {
      id: '1',
      question: 'Apa yang termasuk dalam layanan live streaming?',
      answer: 'Layanan kami mencakup host profesional, peralatan live streaming (iPhone atau kamera profesional + OBS), studio lengkap, penjadwalan live, dan laporan performa mingguan.'
    },
    {
      id: '2',
      question: 'Platform apa saja yang digunakan untuk live streaming?',
      answer: 'Kami mendukung berbagai platform live streaming seperti TikTok, Shopee, Instagram, Tokopedia, dan platform e-commerce lainnya sesuai kebutuhan brand Anda.'
    },
    {
      id: '3',
      question: 'Apakah saya bisa memilih jadwal live streaming sendiri?',
      answer: 'Tentu! Kami fleksibel dengan jadwal. Jam kerja standar adalah 09.00-20.00 (Senin-Sabtu untuk paket tertentu). Ada biaya tambahan untuk live sebelum jam 09.00 atau setelah jam 20.00.'
    },
    {
      id: '4',
      question: 'Apakah saya perlu menyediakan produk sendiri?',
      answer: 'Ya, Anda perlu menyediakan produk yang akan ditampilkan selama live streaming. Produk dapat dikirim ke studio kami di Depok atau Yogyakarta (ongkir ditanggung klien).'
    }
  ]
}

export const socialMediaFAQ: FAQData = {
  title: "FAQ SOCIAL MEDIA MANAGEMENT",
  description: "Temukan jawaban untuk pertanyaan umum tentang layanan social media management kami",
  buttonText: "Hubungi Kami",
  defaultActiveIndex: 0,
  faqs: [
    {
      id: '1',
      question: 'How long until I see results?',
      answer: 'Typically, you will see noticeable improvements in engagement and follower growth within the first month. However, significant results usually take 3-6 months as we build your brand presence and optimize content strategy.'
    },
    {
      id: '2',
      question: 'What platforms do you manage?',
      answer: 'We manage Instagram, TikTok, Facebook, and LinkedIn. Our team develops platform-specific strategies tailored to each social media channel and its audience demographics.'
    },
    {
      id: '3',
      question: 'Do you provide content design?',
      answer: 'Yes! We provide complete content creation including graphic design, copywriting, reels, stories, and carousels. Our creative team ensures your content aligns with your brand identity.'
    },
    {
      id: '4',
      question: 'Can I request revisions?',
      answer: 'Absolutely! We value your input and offer revisions on content to ensure it meets your expectations. We work collaboratively with you to perfect every post before publishing.'
    }
  ]
}

export const brandActivationFAQ: FAQData = {
  title: "FAQ BRAND ACTIVATION",
  description: "Temukan jawaban untuk pertanyaan umum tentang layanan brand activation kami",
  buttonText: "Hubungi Kami",
  defaultActiveIndex: 0,
  faqs: [
    {
      id: '1',
      question: 'What is brand activation?',
      answer: 'Brand activation is the process of bringing your brand to life through interactive experiences that connect emotionally with your target audience. It includes events, campaigns, and engagements that make your brand memorable and actionable.'
    },
    {
      id: '2',
      question: 'How long does a campaign take?',
      answer: 'Campaign duration varies based on scope and complexity. Simple activations can be executed in 2-4 weeks, while comprehensive campaigns typically require 4-8 weeks from planning to completion.'
    },
    {
      id: '3',
      question: 'Do you handle offline events?',
      answer: 'Absolutely! We specialize in both online and offline activations. From booth setups and roadshows to product launches and community events, we handle end-to-end event execution.'
    },
    {
      id: '4',
      question: 'Can activation be combined with digital marketing?',
      answer: 'Yes! We recommend integrated campaigns that combine offline events with digital marketing. This multi-channel approach amplifies reach and creates a cohesive brand experience across all touchpoints.'
    }
  ]
}
