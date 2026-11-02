/* ==========================================================================
   SITE CONTENT DATA — edit job titles, dates, projects, revenue figures,
   pricing plans and snapshots here. The page renders from these blocks.
   ========================================================================== */

window.SITE = {
  /* ---------- CONTACT ---------- */
  contact: {
    name: "Abubakar Baloch",
    email: "abubakarbaloch733@gmail.com",
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
      title: "Independent TikTok Shop Growth Partner (UK/US)",
      company: "Independent",
      type: "Freelance",
      location: "United Kingdom (Remote)",
      period: "January 2024 – Present",
      current: true,
      points: [
        "TikTok Shop management and operations for UK and US sellers.",
        "Affiliate and creator programs, including WhatsApp and Discord communities.",
        "Product listing and catalog management.",
        "Shop advertising and campaign support.",
        "Sales management and performance monitoring.",
        "Shop health and operational troubleshooting.",
      ],
    },
    {
      title: "Head of Affiliate Management",
      company: "Tikvix agency",
      companyUrl: "https://www.tikvix.com",
      companyLabel: "www.Tikvix.com",
      type: "Full-time",
      location: "Lahore, Pakistan",
      period: "August 2026 – 5 October 2026",
      current: false,
      points: [
        "Affiliate marketing strategy and management.",
        "TikTok Shop creator and affiliate relationships.",
        "Affiliate outreach and campaign coordination.",
        "Creator communities on WhatsApp, Discord and Lark.",
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

  /* ---------- AFFILIATE MANAGEMENT ----------
     steps render as numbered cards; channels render as chips (icon = chat | users | grid). */
  affiliate: {
    intro:
      "Affiliate is the engine of a TikTok Shop. I find the right creators, bring them in, and keep them engaged inside brand communities so they keep posting and selling.",
    steps: [
      { title: "Find the best affiliates", text: "Searching and shortlisting creators that fit the brand's products, using Cruva and Euka.ai." },
      { title: "Reach out", text: "Direct, consistent outreach and follow-up to bring the right creators into the program." },
      { title: "Build brand communities", text: "Creating and managing creator communities on WhatsApp, Discord and Lark, where affiliates engage with the brand." },
      { title: "Share daily updates", text: "Posting the brand's daily updates inside the WhatsApp and Discord communities, so creators stay informed and engaged." },
      { title: "Motivate with incentives", text: "Running campaigns with retainer bonuses and incentive bonuses to keep creators active." },
    ],
    channels: [
      { name: "WhatsApp", note: "Brand communities and daily updates", icon: "chat" },
      { name: "Discord", note: "Brand communities and daily updates", icon: "users" },
      { name: "Lark", note: "Creator communities and coordination", icon: "grid" },
    ],
  },

  /* ---------- TOOLS I USE MOST ----------
     logo: optional path (for example "img/tools/cruva.png"). Empty shows a monogram tile. */
  tools: [
    {
      name: "Cruva",
      role: "Affiliate search and campaigns",
      logo: "",
      how: [
        "Searching for affiliates that fit the brand",
        "Setting up campaigns, creator hubs and affiliate hubs",
        "Creating retainer bonuses and incentive bonuses",
      ],
    },
    {
      name: "Euka.ai",
      role: "Affiliate search and campaigns",
      logo: "",
      how: [
        "Searching for affiliates that fit the brand",
        "Setting up campaigns, creator hubs and affiliate hubs",
        "Creating retainer bonuses and incentive bonuses",
      ],
    },
  ],

  /* ---------- FEATURED CASE STUDY (client name withheld) ---------- */
  caseStudy: {
    market: "USA",
    category: "Health: herbal and nutrition products",
    title: "From about $17K to about $161K a month",
    intro:
      "A US health brand came to me in January 2026 doing roughly $17K a month on TikTok Shop. By September 2026 the shop reported $160,891 in a single month.",
    before: { label: "January 2026", value: 17288, sub: "132 orders" },
    after: { label: "September 2026", value: 160891, sub: "2,047 orders" },
    multiple: "9.3x",
    totals: [
      { value: "$882.8K", label: "Reported shop GMV, Jan–Oct 2026" },
      { value: "9,396", label: "Orders" },
      { value: "8,439", label: "Customers" },
      { value: "10,870", label: "Items sold" },
    ],
    did: [
      "Built the affiliate program as the core of the business.",
      "Brought in top creators and influencers across different channels to build brand awareness.",
      "Ran aggressive, wide-reach creator outreach, supported by social media marketing.",
      "Found winning content and scaled it across more creators.",
      "Optimized the shop every 3 days.",
      "Managed GMV Max ads every day.",
    ],
    affiliate: {
      title: "Affiliate results",
      period: "Feb 5 – Oct 31, 2026",
      stats: [
        { value: "$591.2K", label: "Creator-attributed GMV" },
        { value: "7,272", label: "Videos" },
        { value: "4,119", label: "LIVE streams" },
        { value: "24 / 11", label: "Avg. creators posting / with sales per day" },
      ],
      note: "Estimated creator commission over the period: $57.2K.",
    },
    ads: {
      title: "GMV Max ads results",
      period: "Jan – Oct 2026",
      stats: [
        { value: "$762.4K", label: "Gross revenue" },
        { value: "$303.1K", label: "Ad cost (client budget)" },
        { value: "2.52", label: "ROI" },
        { value: "7,493", label: "Ads orders" },
      ],
    },
    images: [
      { src: "img/case-study/case-sep.jpg", w: 1070, h: 510, alt: "Seller Center key metrics, September 2026: GMV $160,891.01 and 2,047 orders", cap: "September 2026" },
      { src: "img/case-study/case-jan.jpg", w: 1045, h: 410, alt: "Seller Center key metrics chart, January 2026: GMV $17,287.76 and 132 orders", cap: "January 2026" },
      { src: "img/case-study/case-overall.jpg", w: 1339, h: 647, alt: "Seller Center key metrics, January to October 2026: GMV $882,807.49 and 9,396 orders", cap: "January to October 2026" },
      { src: "img/case-study/case-affiliate.jpg", w: 1500, h: 520, alt: "Seller Center affiliate performance, Feb 5 to Oct 31, 2026: creator-attributed GMV $591,206.69", cap: "Affiliate performance" },
      { src: "img/case-study/case-ads.jpg", w: 1150, h: 635, alt: "GMV Max ads overview, January to October 2026: ROI 2.52", cap: "GMV Max ads" },
    ],
    note:
      "Brand name withheld for client privacy. Figures come from the shop's TikTok Shop Seller Center and reflect the whole shop's performance, not revenue generated by me alone.",
  },

  watermark: "Abubakar Baloch | Expert",
};
