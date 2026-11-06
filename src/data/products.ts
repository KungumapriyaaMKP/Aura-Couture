export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  collectionId?: string;
  price: number;
  rating: number;
  reviewsCount: number;
  materials: string;
  description: string;
  details: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  position3D: [number, number, number];
  chapterIndex: number;
  image: string;
  secondaryImages: string[];
  featured?: boolean;
  artisanHours?: number;
  edition?: string;
}

export interface CoutureCollection {
  id: string;
  season: string;
  title: string;
  frenchSubtitle: string;
  description: string;
  inspiration: string;
  heroImage: string;
  runwayFrames: string[];
  pieceCount: number;
  artisanHoursTotal: string;
  keyMaterials: string[];
  locationShowcase: string;
}

export function formatCouturePrice(inrPrice: number, _currency: 'INR' | 'AED' | 'USD' = 'INR'): string {
  return `INR ${inrPrice.toLocaleString('en-IN')}`;
}

export const PRODUCTS: Product[] = [
  {
    id: "royal-crimson-rose-gown",
    name: "The Celestial Orchid Architectural Gown",
    tagline: "Sculpted 3D Orchid-Petal Bodice and Fan-Pleated Iridescent Silk Organza",
    category: "Haute Couture Runway Centerpiece",
    collectionId: "imperatrice-du-desert",
    price: 185000,
    rating: 5.0,
    reviewsCount: 48,
    materials: "Iridescent Metallic Silk Organza, Silver Crystal Vine Beadwork, Sculpted Silk Satin",
    description: "An avant-garde architectural masterpiece featuring sculptural 3D fan-pleated shoulder wings, an asymmetrical blooming orchid waist sculpture, and a tiered spiral silk organza train accented with crystal vines.",
    details: [
      "Hand-pleated sculptural fan shoulder wings and 3D orchid waist motif",
      "Asymmetrical corset bodice with crystal vine embroidery",
      "Tiered architectural spiral train in iridescent mauve and rose-gold silk",
      "Includes bespoke signature velvet garment box and white-glove delivery"
    ],
    sizes: ["EU 34 / US 0", "EU 36 / US 2", "EU 38 / US 4", "EU 40 / US 6", "EU 42 / US 8", "Bespoke Measure"],
    colors: [
      { name: "Iridescent Orchid Mauve", hex: "#b589a6" },
      { name: "Liquid Rose Gold", hex: "#d8a499" },
      { name: "Amethyst Pearl", hex: "#8c6582" }
    ],
    position3D: [0, 1.85, -21],
    chapterIndex: 0,
    image: "/products/celestial_orchid_gown.webp",
    secondaryImages: [
      "/products/about_heritage_gown.webp"
    ],
    featured: true,
    artisanHours: 340,
    edition: "Numbered Edition of 15"
  },
  {
    id: "scarlet-velvet-siren-gown",
    name: "The Scarlet Velvet Siren Gown",
    tagline: "Deep Ruby Silk Velvet with Architectural Cowl Back",
    category: "Haute Couture Evening Wear",
    collectionId: "nuit-dor-dubai",
    price: 145000,
    rating: 4.9,
    reviewsCount: 34,
    materials: "Pure Silk-Rayon Velvet, Ruby Crystal Straps",
    description: "Crafted from heavy bias-cut ruby velvet that contours the silhouette with fluid grandeur. Features an architectural open cowl back and hand-set ruby crystal shoulder chains.",
    details: [
      "Bias-cut floor length siren silhouette with 45cm train",
      "Hand-set ruby crystal shoulder drapes",
      "Concealed side silk zipper",
      "100% Mulberry silk satin inner lining"
    ],
    sizes: ["EU 34 / US 0", "EU 36 / US 2", "EU 38 / US 4", "EU 40 / US 6", "EU 42 / US 8", "Bespoke Measure"],
    colors: [
      { name: "Scarlet Ruby", hex: "#990000" },
      { name: "Midnight Burgundy", hex: "#4a0e17" }
    ],
    position3D: [-4.2, 1.5, -14],
    chapterIndex: 3,
    image: "/products/scarlet_velvet_siren.webp",
    secondaryImages: [
      "/products/crimson_silk_empress.webp"
    ],
    featured: true,
    artisanHours: 210,
    edition: "Atelier Exclusive"
  },
  {
    id: "vendome-peony-bridal-sovereign",
    name: "The Sovereign Blush Bridal Gown",
    tagline: "Fine Floral Lace and 3D Silk Organza Peonies with Cathedral Veil",
    category: "Bridal and Royal Trousseau",
    collectionId: "jardin-de-soie",
    price: 265000,
    rating: 5.0,
    reviewsCount: 39,
    materials: "Fine Floral Lace, Hand-Cut Silk Organza Petals, Swarovski Pearls",
    description: "An heirloom bridal creation crafted from whisper-soft blush ivory floral lace and adorned with over 1,400 individually hand-sculpted silk organza rose petals.",
    details: [
      "Includes matching 3.5-meter hand-appliquéd cathedral veil",
      "Internal custom corsetry for effortless poise",
      "Over 1,400 hand-sculpted silk organza petals and seed pearls",
      "Dedicated master couturier for 3 private bridal fittings"
    ],
    sizes: ["EU 34 / US 0", "EU 36 / US 2", "EU 38 / US 4", "EU 40 / US 6", "Bespoke Measure"],
    colors: [
      { name: "Blush Ivory Pearl", hex: "#fdf2f5" },
      { name: "Champagne Rose", hex: "#f3d6ce" }
    ],
    position3D: [2.5, 1.5, -19],
    chapterIndex: 7,
    image: "/products/souveraine_bridal_gown.webp",
    secondaryImages: [
      "/products/blush_couture_gala.webp"
    ],
    featured: true,
    artisanHours: 460,
    edition: "Royal Bridal Bespoke"
  },
  {
    id: "al-amira-crystal-cape-kaftan",
    name: "The Imperial Rose Cape Gown",
    tagline: "Floor-Sweeping Rose Silk Satin with 24K Gold and Ruby Cape",
    category: "Royal Cape and Modest Couture",
    collectionId: "majlis-prive",
    price: 225000,
    rating: 5.0,
    reviewsCount: 54,
    materials: "Pure Silk Satin, 24K Gold Bullion Embroidery, Ruby Crystal Accents",
    description: "Designed exclusively for private royal receptions and grand evening galas. Features a detachable cathedral-length silk cape hand-embroidered with imperial rose motifs.",
    details: [
      "Detachable 2.4-meter hand-embroidered cathedral cape",
      "Modest high jewel neckline with crystal-cuffed bishop sleeves",
      "24K gold threadwork along collar, cuffs, and train border",
      "Complimentary private residence fitting by senior couturier"
    ],
    sizes: ["EU 36 / US 2", "EU 38 / US 4", "EU 40 / US 6", "EU 42 / US 8", "EU 44 / US 10", "Bespoke Measure"],
    colors: [
      { name: "Imperial Rose and Gold", hex: "#a02e46" },
      { name: "Desert Blush Pearl", hex: "#e8c3cd" },
      { name: "Royal Burgundy", hex: "#581c2b" }
    ],
    position3D: [0, 1.6, -16],
    chapterIndex: 5,
    image: "/products/al_amira_cape_gown.webp",
    secondaryImages: [
      "/products/sultana_velvet_ensemble.webp"
    ],
    featured: true,
    artisanHours: 380,
    edition: "Flagship Exclusive"
  },
  {
    id: "rose-gold-chiffon-ballgown",
    name: "Rose Gold Chiffon Couture Ballgown",
    tagline: "Multi-Layered Rose Gold and Blush Silk Chiffon",
    category: "Haute Couture Runway Centerpiece",
    collectionId: "nuit-dor-dubai",
    price: 165000,
    rating: 5.0,
    reviewsCount: 42,
    materials: "100% Silk Chiffon, Rose Gold Shimmer Leaf Embroidery",
    description: "An ethereal blush pink and rose gold masterpiece with gossamer layers of silk chiffon that flutter with every step, shimmering subtly in warm palace and opera salon lighting.",
    details: [
      "Sculpted sweetheart bodice with delicate rose gold boning",
      "Subtle metallic rose gold dust shimmer across full skirt",
      "Graceful floor-sweeping royal train",
      "Includes matching silk chiffon stole"
    ],
    sizes: ["EU 36 / US 2", "EU 38 / US 4", "EU 40 / US 6", "EU 42 / US 8", "Bespoke Measure"],
    colors: [
      { name: "Blush Rose Gold", hex: "#e8c3b9" },
      { name: "Pastel Pearl Pink", hex: "#fce4ec" }
    ],
    position3D: [4.2, 1.5, -14],
    chapterIndex: 3,
    image: "/products/rose_gold_ballgown.webp",
    secondaryImages: [
      "/products/blush_couture_gala.webp"
    ],
    featured: true,
    artisanHours: 260,
    edition: "Grand Opera Capsule"
  },
  {
    id: "crimson-silk-empress-gown",
    name: "The Crimson Silk Empress Gown",
    tagline: "Pure Mulberry Crimson Silk Satin with Micro Crystal Brooch",
    category: "Haute Couture Evening Wear",
    collectionId: "imperatrice-du-desert",
    price: 125000,
    rating: 4.8,
    reviewsCount: 29,
    materials: "100% Pure Mulberry Silk Satin, Rhodium Crystal Brooch",
    description: "Sleek, regal, and captivating. A crimson silk satin gown with a dramatic pleated waist drape, architectural posture, and custom vintage-inspired crystal brooch.",
    details: [
      "Sculpted waist drapery for regal proportion",
      "Draped asymmetrical neckline",
      "Custom detachable rhodium crystal waist pin",
      "Fully lined in soft rose mulberry silk"
    ],
    sizes: ["EU 34 / US 0", "EU 36 / US 2", "EU 38 / US 4", "EU 40 / US 6", "EU 42 / US 8"],
    colors: [
      { name: "Crimson Red", hex: "#a11d29" },
      { name: "Blush Champagne", hex: "#f5d0c5" }
    ],
    position3D: [-3.8, 1.3, -18],
    chapterIndex: 3,
    image: "/products/crimson_silk_empress.webp",
    secondaryImages: [
      "/products/scarlet_velvet_siren.webp"
    ],
    artisanHours: 175,
    edition: "Limited Salon Release"
  },
  {
    id: "blush-couture-gala-gown",
    name: "The Blush Couture Gala Gown",
    tagline: "Pastel Blush Pink and Crimson Gradient Hand-Beaded Tulle",
    category: "Bridal and Royal Trousseau",
    collectionId: "jardin-de-soie",
    price: 195000,
    rating: 4.9,
    reviewsCount: 31,
    materials: "Pure Silk Tulle, Hand-beaded Ruby Crystals and Seed Pearls",
    description: "A soft pastel blush pink base seamlessly transitions into a deep crimson rose skirt. Intricately beaded by master artisans with over 290 hours of hand needlework.",
    details: [
      "Hand-beaded crystal and freshwater pearl cascade",
      "Sculpted illusion tulle neckline",
      "Multi-tier layered silk organza structure",
      "Tailored to order in our flagship ateliers"
    ],
    sizes: ["EU 36 / US 2", "EU 38 / US 4", "EU 40 / US 6", "EU 42 / US 8", "Bespoke Measure"],
    colors: [
      { name: "Blush Crimson", hex: "#d87093" },
      { name: "Pastel Rose", hex: "#ffb6c1" }
    ],
    position3D: [3.8, 1.3, -18],
    chapterIndex: 3,
    image: "/products/blush_couture_gala.webp",
    secondaryImages: [
      "/products/rose_gold_ballgown.webp"
    ],
    featured: true,
    artisanHours: 290,
    edition: "Royal Bridal Series"
  },
  {
    id: "d3-architectural-silk-column",
    name: "The Starlight Draped Silk Column",
    tagline: "Sculpted Rose-Burgundy Silk Crepe with Asymmetric Gold Clasp",
    category: "Haute Couture Evening Wear",
    collectionId: "nuit-dor-dubai",
    price: 138000,
    rating: 4.9,
    reviewsCount: 27,
    materials: "Double-Faced Pure Silk Crepe, 18K Rose-Gold Plated Hardware",
    description: "Modern architectural minimalism meets classical drapery. Tailored in heavyweight double-faced silk crepe that sculpts the frame while a fluid shoulder panel trails behind.",
    details: [
      "Hand-cast rose-gold sculptural shoulder clasp",
      "Floor-length asymmetric back drape",
      "Crease-resistant heavyweight pure silk crepe",
      "Ideal for gala dinners, art receptions, and red carpet arrivals"
    ],
    sizes: ["EU 34 / US 0", "EU 36 / US 2", "EU 38 / US 4", "EU 40 / US 6", "EU 42 / US 8"],
    colors: [
      { name: "Rose Burgundy", hex: "#801c30" },
      { name: "Soft Peony", hex: "#d88a9a" }
    ],
    position3D: [-2.5, 1.4, -17],
    chapterIndex: 8,
    image: "/products/etoile_draped_column.webp",
    secondaryImages: [
      "/products/scarlet_velvet_siren.webp"
    ],
    artisanHours: 190,
    edition: "Grand Salon Edition"
  },
  {
    id: "desert-rose-velvet-abaya-couture",
    name: "The Royal Rose-Velvet Couture Ensemble",
    tagline: "Two-Piece Mulberry Silk Slip and Embroidered Organza Opera Coat",
    category: "Royal Cape and Modest Couture",
    collectionId: "majlis-prive",
    price: 175000,
    rating: 5.0,
    reviewsCount: 44,
    materials: "Pure Silk Organza, Crushed Silk Velvet, Rose-Cut Crystal Beadwork",
    description: "A luminous two-piece couture ensemble combining a bias-cut mulberry silk satin inner gown with a structured translucent silk organza opera coat traced in velvet scrollwork.",
    details: [
      "Two-piece ensemble: full-length silk slip gown and couture organza coat",
      "Hand-appliquéd crimson velvet botanical scrollwork",
      "Mother-of-pearl and crystal button closures at wrists",
      "Presented in a cedarwood-scented Aura Couture trunk"
    ],
    sizes: ["EU 36 / US 2", "EU 38 / US 4", "EU 40 / US 6", "EU 42 / US 8", "EU 44 / US 10", "Bespoke Measure"],
    colors: [
      { name: "Crimson and Blush Frost", hex: "#a02e46" },
      { name: "Antique Rose Gold", hex: "#c4607e" }
    ],
    position3D: [0, 1.5, -20],
    chapterIndex: 9,
    image: "/products/sultana_velvet_ensemble.webp",
    secondaryImages: [
      "/products/al_amira_cape_gown.webp"
    ],
    artisanHours: 310,
    edition: "Imperial Capsule"
  }
];

export const COLLECTIONS_DATA: CoutureCollection[] = [
  {
    id: "imperatrice-du-desert",
    season: "AUTUMN / WINTER COUTURE",
    title: "The Celestial Orchid Collection",
    frenchSubtitle: "THE GRAND RUNWAY GALLERY",
    description: "Our signature avant-garde runway narrative featuring sculptural 3D fan-pleated shoulder wings, blooming orchid silk corsetry, and iridescent metallic organza trains engineered to command every room.",
    inspiration: "Inspired by blooming twilight orchids and architectural origami silk drapery.",
    heroImage: "/products/celestial_orchid_gown.webp",
    runwayFrames: ["/products/celestial_orchid_gown.webp", "/products/about_heritage_gown.webp", "/products/crimson_silk_empress.webp", "/products/rose_gold_ballgown.webp"],
    pieceCount: 14,
    artisanHoursTotal: "4,200 Hours",
    keyMaterials: ["Iridescent Silk Organza", "3D Sculpted Silk Petals", "Crystal Vine Beadwork", "Liquid Rose-Gold Satin"],
    locationShowcase: "Presented at Flagship Couture Salons"
  },
  {
    id: "majlis-prive",
    season: "ROYAL CAPSULE EXCLUSIVE",
    title: "The Imperial Cape Collection",
    frenchSubtitle: "MODEST AND IMPERIAL CAPE COUTURE",
    description: "Regal floor-sweeping capes, structured silk organza opera coats, and 24K gold embroidery celebrating grace, modesty, and sovereign presence.",
    inspiration: "Architectural arches, rose-water gardens, and private candlelit royal gatherings.",
    heroImage: "/products/al_amira_cape_gown.webp",
    runwayFrames: ["/products/al_amira_cape_gown.webp", "/products/sultana_velvet_ensemble.webp", "/products/about_heritage_gown.webp", "/products/celestial_orchid_gown.webp"],
    pieceCount: 10,
    artisanHoursTotal: "3,600 Hours",
    keyMaterials: ["Pure Silk Satin", "24K Gold Bullion Embroidery", "Pure Silk Organza", "Ruby Crystal Accents"],
    locationShowcase: "Exclusive Private Salon Capsule"
  },
  {
    id: "nuit-dor-dubai",
    season: "RESORT AND GALA EVENING COUTURE",
    title: "Golden Night Gala",
    frenchSubtitle: "GRAND OPERA AND RED CARPET",
    description: "Fluid bias-cut silhouettes, rose-gold metallic silk chiffon, and architectural drapery that catches every chandelier reflection. Designed for red-carpet premieres, charity galas, and grand evening receptions.",
    inspiration: "The shimmering rose-gold reflection of palace chandeliers across evening silk.",
    heroImage: "/products/scarlet_velvet_siren.webp",
    runwayFrames: ["/products/scarlet_velvet_siren.webp", "/products/rose_gold_ballgown.webp", "/products/etoile_draped_column.webp", "/products/celestial_orchid_gown.webp"],
    pieceCount: 12,
    artisanHoursTotal: "2,950 Hours",
    keyMaterials: ["Rose-Gold Silk Chiffon", "Double-Faced Silk Crepe", "Rhodium Crystal Drapery", "Mulberry Silk Lining"],
    locationShowcase: "Showcased at Grand Opera and Red Carpet Salons"
  },
  {
    id: "jardin-de-soie",
    season: "BRIDAL AND ROYAL WEDDING BESPOKE",
    title: "The Silk Rose Garden",
    frenchSubtitle: "ROYAL BRIDAL AND WEDDING COUTURE",
    description: "Heirloom bridal and royal wedding creations crafted entirely to individual measurements. Each gown blooms with hand-cut silk organza peonies, fine floral lace, and thousands of freshwater seed pearls.",
    inspiration: "The timeless romance of blooming Damask roses at dawn in a private palace conservatory.",
    heroImage: "/products/souveraine_bridal_gown.webp",
    runwayFrames: ["/products/souveraine_bridal_gown.webp", "/products/blush_couture_gala.webp", "/products/about_heritage_gown.webp", "/products/rose_gold_ballgown.webp"],
    pieceCount: 8,
    artisanHoursTotal: "5,100 Hours",
    keyMaterials: ["Fine Floral Lace", "3D Silk Organza Peonies", "Freshwater Seed Pearls", "Illusion Silk Tulle"],
    locationShowcase: "By Private Appointment Only"
  }
];
