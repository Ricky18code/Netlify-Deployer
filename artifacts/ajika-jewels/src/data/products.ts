export interface Product {
  id: string;
  name: string;
  category: 'earrings' | 'necklaces' | 'rings' | 'bracelets';
  price: number;
  originalPrice?: number;
  images: string[];
  shortDescription: string;
  description: string;
  material: string;
  careInstructions: string;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  // EARRINGS
  {
    id: 'e1',
    name: 'Sitara Gold Drop Earrings',
    category: 'earrings',
    price: 3500,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      'https://images.unsplash.com/photo-1678894565769-36a7568fe7ea?w=600&q=80'
    ],
    shortDescription: 'Elegant gold drop earrings with pearl accents.',
    description: 'The Sitara Gold Drop Earrings are a testament to exquisite craftsmanship, featuring a cascading design that catches the light beautifully. Perfect for both festive occasions and elegant evening wear.',
    material: '22k Gold Plated Brass, Cultured Pearls',
    careInstructions: 'Store in a dry place. Avoid direct contact with perfume and water.',
    inStock: true,
    isNew: true,
    isBestseller: true,
    isFeatured: true
  },
  {
    id: 'e2',
    name: 'Ananya Kundan Studs',
    category: 'earrings',
    price: 2800,
    originalPrice: 3500,
    images: [
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80'
    ],
    shortDescription: 'Classic kundan studded earrings for a royal look.',
    description: 'Embrace traditional elegance with our Ananya Kundan Studs. Handcrafted with precision, these studs feature intricate kundan work that brings a touch of royalty to your everyday style.',
    material: 'Kundan stones, 18k Gold Plating',
    careInstructions: 'Wipe with a soft cloth after use. Keep away from moisture.',
    inStock: true,
    isBestseller: true
  },
  {
    id: 'e3',
    name: 'Tara Diamond Hoops',
    category: 'earrings',
    price: 8500,
    images: [
      'https://images.unsplash.com/photo-1678894565769-36a7568fe7ea?w=600&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80'
    ],
    shortDescription: 'Modern minimalist hoop earrings with subtle sparkle.',
    description: 'Redefine everyday luxury with the Tara Diamond Hoops. A sleek and modern design embedded with carefully selected stones for a subtle yet captivating sparkle.',
    material: '14k Solid Gold, Lab-grown Diamonds',
    careInstructions: 'Clean gently with mild soap and water.',
    inStock: true,
    isNew: true
  },
  {
    id: 'e4',
    name: 'Maya Filigree Chandbalis',
    category: 'earrings',
    price: 4200,
    originalPrice: 5000,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80'
    ],
    shortDescription: 'Intricate filigree work inspired by heritage designs.',
    description: 'The Maya Filigree Chandbalis celebrate the rich heritage of Indian jewellery making. Lightweight yet statement-making, these earrings are perfect for festive celebrations.',
    material: 'Sterling Silver with Gold Polish',
    careInstructions: 'Store in the provided pouch to prevent tarnishing.',
    inStock: false
  },

  // NECKLACES
  {
    id: 'n1',
    name: 'Mahal Pearl Choker',
    category: 'necklaces',
    price: 12000,
    images: [
      'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94f7f20?w=600&q=80'
    ],
    shortDescription: 'A statement choker woven with lustrous pearls and gold.',
    description: 'The Mahal Pearl Choker is a breathtaking masterpiece. Woven with the finest cultured pearls and interspersed with gold accents, it sits beautifully on the collarbone, evoking timeless grace.',
    material: 'Freshwater Pearls, 22k Gold Plated Base',
    careInstructions: 'Pearls are delicate. Keep away from perfumes and cosmetics.',
    inStock: true,
    isBestseller: true,
    isFeatured: true
  },
  {
    id: 'n2',
    name: 'Zara Layered Gold Chain',
    category: 'necklaces',
    price: 4500,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=600&q=80'
    ],
    shortDescription: 'Contemporary layered chain for effortless styling.',
    description: 'Achieve the perfect layered look effortlessly with the Zara Layered Gold Chain. Delicate, versatile, and beautifully polished, it is an essential addition to your everyday wardrobe.',
    material: '18k Gold Plated Brass',
    careInstructions: 'Avoid contact with water and harsh chemicals.',
    inStock: true,
    isNew: true
  },
  {
    id: 'n3',
    name: 'Isha Emerald Pendant',
    category: 'necklaces',
    price: 7800,
    originalPrice: 9500,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80'
    ],
    shortDescription: 'A delicate chain featuring a striking emerald-cut green stone.',
    description: 'The Isha Emerald Pendant brings a touch of vintage glamour. The deep green stone is perfectly framed by a halo of smaller zircons, suspended on a delicate gold chain.',
    material: 'Simulated Emerald, Cubic Zirconia, Gold Vermeil',
    careInstructions: 'Clean gently with a soft cloth.',
    inStock: true
  },
  {
    id: 'n4',
    name: 'Devi Temple Necklace',
    category: 'necklaces',
    price: 18000,
    images: [
      'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?w=600&q=80',
      'https://images.unsplash.com/photo-1576022162028-e4e72c1c0523?w=600&q=80'
    ],
    shortDescription: 'Traditional temple jewellery motif with antique finish.',
    description: 'An ode to ancient artistry, the Devi Temple Necklace features intricate carvings of divine motifs. Finished with an antique polish, it is a heirloom piece meant to be cherished.',
    material: 'Antique Gold Plated Silver Alloy',
    careInstructions: 'Store in an airtight box. Do not use liquid cleaners.',
    inStock: true,
    isFeatured: true
  },

  // RINGS
  {
    id: 'r1',
    name: 'Aarav Solitaire Ring',
    category: 'rings',
    price: 6500,
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80'
    ],
    shortDescription: 'A brilliant solitaire set in a minimalist band.',
    description: 'The Aarav Solitaire Ring is the epitome of understated luxury. A brilliantly cut central stone set in a sleek, polished band that speaks of timeless romance.',
    material: '14k Gold, Premium Moissanite',
    careInstructions: 'Regular cleaning with a soft brush and mild soap keeps the stone brilliant.',
    inStock: true,
    isBestseller: true
  },
  {
    id: 'r2',
    name: 'Riya Floral Band',
    category: 'rings',
    price: 3200,
    originalPrice: 4000,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80'
    ],
    shortDescription: 'Delicate floral motifs forming an eternity band.',
    description: 'Inspired by blooming gardens, the Riya Floral Band features delicate petals intricately carved along the band, creating a beautifully textured and romantic piece.',
    material: '18k Rose Gold Plated',
    careInstructions: 'Avoid heavy impact or wearing during rigorous activities.',
    inStock: true,
    isNew: true
  },
  {
    id: 'r3',
    name: 'Kavya Polki Ring',
    category: 'rings',
    price: 5400,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80'
    ],
    shortDescription: 'Uncut diamond style polki ring with traditional meenakari.',
    description: 'The Kavya Polki Ring is a modern take on royal Rajasthani jewellery. Featuring brilliant uncut-style stones and intricate enamel work on the reverse.',
    material: 'Gold Plated Copper, Glass Polki, Enamel',
    careInstructions: 'Keep away from moisture to preserve the enamel work.',
    inStock: true,
    isFeatured: true
  },
  {
    id: 'r4',
    name: 'Navya Stackable Rings',
    category: 'rings',
    price: 2200,
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80'
    ],
    shortDescription: 'Set of three minimalist textured rings.',
    description: 'Versatile and chic, the Navya Stackable Rings come as a set of three beautifully textured bands. Wear them together for a bolder look or separately for subtle elegance.',
    material: 'Sterling Silver',
    careInstructions: 'Use a silver polishing cloth to maintain shine.',
    inStock: false
  },

  // BRACELETS
  {
    id: 'b1',
    name: 'Meera Beaded Bracelet',
    category: 'bracelets',
    price: 1500,
    images: [
      'https://images.unsplash.com/photo-1631982690223-8aa4049484d7?w=600&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80'
    ],
    shortDescription: 'A delicate everyday bracelet with gold beads.',
    description: 'The Meera Beaded Bracelet is your perfect everyday companion. Lightweight and comfortable, stringing together polished gold beads on a durable chain.',
    material: '18k Gold Plated Brass',
    careInstructions: 'Wipe with a dry cloth after wearing.',
    inStock: true
  },
  {
    id: 'b2',
    name: 'Aanya Cuff Bangle',
    category: 'bracelets',
    price: 4800,
    originalPrice: 6000,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&q=80',
      'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=600&q=80'
    ],
    shortDescription: 'Statement open cuff with geometric details.',
    description: 'Make a statement with the Aanya Cuff Bangle. Its bold geometric design and polished finish make it a striking accessory that easily transitions from day to night.',
    material: 'Gold Plated Stainless Steel',
    careInstructions: 'Store separately to prevent scratches.',
    inStock: true,
    isBestseller: true
  },
  {
    id: 'b3',
    name: 'Diya Tennis Bracelet',
    category: 'bracelets',
    price: 7500,
    images: [
      'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=600&q=80',
      'https://images.unsplash.com/photo-1631982690223-8aa4049484d7?w=600&q=80'
    ],
    shortDescription: 'A continuous line of brilliant cut stones.',
    description: 'A classic redefined. The Diya Tennis Bracelet features a seamless row of brilliant stones, hand-set to ensure maximum sparkle from every angle.',
    material: 'Sterling Silver, Cubic Zirconia',
    careInstructions: 'Clean with a soft brush and mild soapy water.',
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: 'b4',
    name: 'Suhana Charm Bracelet',
    category: 'bracelets',
    price: 3600,
    images: [
      'https://images.unsplash.com/photo-1631982690223-8aa4049484d7?w=600&q=80',
      'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=600&q=80'
    ],
    shortDescription: 'Playful charm bracelet with intricate motifs.',
    description: 'Tell your story with the Suhana Charm Bracelet. Adorned with delicate, handcrafted charms that jingle softly with your every movement.',
    material: 'Gold Vermeil',
    careInstructions: 'Avoid direct contact with perfumes and lotions.',
    inStock: true
  }
];
