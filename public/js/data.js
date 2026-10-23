/* ==========================================================================
   SITE CONTENT DATA — edit job titles, dates, projects, revenue figures,
   pricing plans and snapshots here. The page renders from these blocks.
   ========================================================================== */

window.SITE = {
  /* ---------- CONTACT ---------- */
  contact: {
    name: "Abubakar Baloch",
    email: "bakarbaloch733@gmail.com",
    phoneDisplay: "+44 7587 910296",
    whatsapp: "https://wa.me/447587910296",
    // No booking tool was provided, so consultations are booked via WhatsApp.
    consultation:
      "https://wa.me/447587910296?text=" +
      encodeURIComponent("Hi Abubakar, I'd like to book a consultation about my TikTok Shop."),
    linkedin: "https://www.linkedin.com/in/abubakar-8341b7403",
  },

  /* ---------- EXPERIENCE (newest / current first) ---------- */
  experience: [
    {
      title: "Head of Affiliate Management",
      company: "Tikvix agency",
      companyUrl: "https://www.tikvix.com",
      companyLabel: "www.Tikvix.com",
      type: "Full-time",
      location: "Lahore, Pakistan",
      period: "August 2026 – Present",
      current: true,
      points: [
        "Affiliate marketing strategy and management.",
        "TikTok Shop creator and affiliate relationships.",
        "Affiliate outreach and campaign coordination.",
        "Creator communities, including WhatsApp and Lark.",
        "Affiliate performance monitoring.",
        "Creator content and sales tracking.",
        "Supporting shop growth through affiliate partnerships.",
      ],
    },
    {
      title: "Senior TikTok Brands Manager",
      company: "SocialSTag agency",
      companyUrl: "https://www.socialstag.com",
      companyLabel: "www.SocialStag.com",
      type: "Full-time",
      location: "Lahore, Pakistan",
      period: "11 January 2024 – 2 October 2026",
      current: false,
      points: [
        "Managing TikTok Shop brand operations.",
        "Brand management and account performance.",
        "Shop growth and operational strategy.",
        "Affiliate and creator management.",
        "Advertising and performance optimization.",
        "Coordinating daily operations across multiple shops.",
      ],
    },
    {
      title: "Virtual Assistant & Shop Expert",
      company: "TikTok Shop",
      type: "Freelance",
      location: "United Kingdom (Remote)",
      period: "January 2024 – Present",
      current: true,
      points: [
        "TikTok Shop management and operations.",
        "Product listing and catalog management.",
        "Shop advertising and campaign support.",
        "Sales management and performance monitoring.",
        "Shop health and operational troubleshooting.",
        "Supporting UK TikTok Shop sellers remotely.",
      ],
    },
    {
      title: "Team Lead",
      company: "Tikvix.pk",
      type: "", // empty = shows "Role details to be added"
      location: "",
      period: "June 2025 – February 2026",
      current: false,
      points: [
        "Supporting team operations.",
        "Coordinating shop management activities.",
        "Assisting with operational workflows.",
        "Monitoring team performance and shop activities.",
      ],
    },
  ],

  /* ---------- PROJECTS ----------
     Cards render in this order and are numbered Case 01, 02... automatically.
     revenue: number used for the count-up; currency: "$" or "£".
     image: path in /img/brands, or "" to show an initials tile.
     growth: optional "Reported growth" line. link: optional website. */
  projects: [
    {
      brand: "Mother's Dose",
      market: "USA",
      category: "Health, Beauty & Personal Care",
      currency: "$",
      revenue: 55000,
      growth: "Reported growth: from shop setup to ~$55K per month in 180 days",
      image: "img/brands/mothers-dose.jpg",
      imageFit: "cover",
      role: "Shop setup and ongoing operations from launch.",
      activities: [
        "Shop setup and product listings",
        "Affiliate program coordination",
        "Shop health monitoring",
      ],
    },
    {
      brand: "I Wanna Gummies",
      market: "USA",
      category: "Health / Gummies and supplements",
      currency: "$",
      revenue: 100000,
      image: "img/brands/i-wanna-gummies.jpg",
      imageFit: "cover",
      role: "Affiliate and creator coordination for a high-volume shop.",
      activities: [
        "Creator campaign coordination",
        "Affiliate relationship management",
        "Listing compliance checks",
      ],
    },
    {
      brand: "In the Lab",
      market: "USA",
      category: "Sports and golf products",
      currency: "$",
      revenue: 40000,
      image: "img/brands/in-the-lab.jpg",
      imageFit: "cover",
      role: "Shop operations and listings support for a US sports brand.",
      activities: [
        "Product listing and catalog upkeep",
        "Daily shop operations",
        "Advertising support",
      ],
    },
    {
      brand: "Birdie Blend",
      market: "USA",
      category: "Sports & Outdoor",
      currency: "$",
      revenue: 44000,
      growth: "Reported growth: from ~$11K to ~$44K per month in 60 days",
      image: "img/brands/birdie-blend.jpg",
      imageFit: "contain",
      role: "Growth-phase shop management and creator coordination.",
      activities: [
        "Affiliate and creator outreach",
        "Advertising support",
        "Performance monitoring",
      ],
    },
    {
      brand: "Izkan",
      market: "UK",
      category: "Health / Gummies",
      currency: "£",
      revenue: 37000,
      link: "https://izkan.co",
      image: "img/brands/izkan.jpg",
      imageFit: "cover",
      role: "UK shop operations and advertising support.",
      activities: [
        "Advertising campaign support",
        "Product listing management",
        "Creator sample coordination",
      ],
    },
    {
      brand: "8hoursleepwell",
      market: "UK",
      category: "Gummies",
      currency: "£",
      revenue: 21000,
      link: "https://www.8hrsleepwell.com",
      image: "img/brands/8hoursleepwell.jpg",
      imageFit: "cover",
      role: "Remote shop management for a UK seller.",
      activities: [
        "Day-to-day shop operations",
        "Shop health and troubleshooting",
        "Affiliate outreach",
      ],
    },
    {
      brand: "Star Supplies",
      market: "UK",
      category: "Household / Home Accessories",
      currency: "£",
      revenue: 33000,
      link: "", // add when available
      image: "img/brands/star-supplies.jpg",
      imageFit: "contain",
      role: "Catalog and operations support across a broad home range.",
      activities: [
        "Large catalog and listing management",
        "Order and operations monitoring",
        "Advertising support",
      ],
    },
    {
      brand: "Naturealm",
      market: "UK",
      category: "Health / Coffee brand",
      currency: "£",
      revenue: 17000,
      image: "img/brands/naturealm.jpg",
      imageFit: "cover",
      role: "Shop operations and creator partnerships for a UK coffee brand.",
      activities: [
        "Creator and affiliate coordination",
        "Product listing optimization",
        "Shop health monitoring",
      ],
    },
  ],

  /* ---------- PRICING ----------
     Set `featured: true` on the highlighted plan. */
  pricing: [
    {
      name: "Launch",
      description: "TikTok Shop setup, listings & basic ad management for new sellers.",
      price: "$500",
      period: "/mo",
      features: [
        "TikTok Shop account setup & verification",
        "Up to 25 product listings",
        "1 ad campaign managed",
        "Weekly performance report",
        "Email support",
      ],
      cta: "Get Started",
      link: "https://wa.me/447587910296?text=" + encodeURIComponent("Hi Abubakar, I'm interested in the Launch plan."),
    },
    {
      name: "Scale",
      badge: "Most Popular",
      featured: true,
      description: "Full-funnel growth: ads, affiliates and live shopping.",
      price: "$700",
      period: "/mo",
      features: [
        "Everything in Launch",
        "Unlimited product listings",
        "Affiliate program management",
        "2 weekly live shopping sessions",
        "Dedicated growth strategist",
        "Bi-weekly strategy calls",
      ],
      cta: "Get Started",
      link: "https://wa.me/447587910296?text=" + encodeURIComponent("Hi Abubakar, I'm interested in the Scale plan."),
    },
    {
      name: "Dominate",
      description: "Bespoke programs for 7-figure brands ready to own the platform.",
      price: "Custom",
      period: "",
      features: [
        "Everything in Scale",
        "Daily live shopping operations",
        "In-house creator network access",
        "Multi-platform integration",
        "24/7 priority support",
        "Quarterly executive reviews",
      ],
      cta: "Get Started",
      link: "https://wa.me/447587910296?text=" + encodeURIComponent("Hi Abubakar, I'd like a custom plan for my brand."),
    },
  ],

  /* ---------- SELLER CENTER SNAPSHOTS ---------- */
  snapshots: [
    { src: "img/snapshots/snapshot-1.jpg", w: 1600, h: 721, alt: "Seller Center shop analytics, US pet shop, June–September 2026" },
    { src: "img/snapshots/snapshot-8.jpg", w: 1600, h: 728, alt: "Seller Center shop analytics, US pet shop, April–May 2026" },
    { src: "img/snapshots/snapshot-3.jpg", w: 1600, h: 735, alt: "Seller Center shop analytics, In The Lab, June–September 2026" },
    { src: "img/snapshots/snapshot-2.jpg", w: 1600, h: 728, alt: "Seller Center shop analytics, In The Lab, April–May 2026" },
    { src: "img/snapshots/snapshot-4.jpg", w: 1600, h: 664, alt: "Seller Centre analytics, Spain shop, July–October 2026" },
    { src: "img/snapshots/snapshot-5.jpg", w: 1600, h: 662, alt: "Seller Centre analytics, Spain shop, May–June 2026" },
    { src: "img/snapshots/snapshot-6.jpg", w: 1600, h: 736, alt: "Seller Center shop analytics, US nutrition shop, June–October 2026" },
    { src: "img/snapshots/snapshot-7.jpg", w: 1600, h: 724, alt: "Seller Center shop analytics, US nutrition shop, April–June 2026" },
    { src: "img/snapshots/snapshot-9.jpg", w: 1371, h: 643, alt: "Seller Center key metrics chart, January–October 2026" },
  ],

  watermark: "Abubakar Baloch | Expert",
};
