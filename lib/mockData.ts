import { Product, EditingService, Testimonial } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: ' 12x16 Wooden Canvas Frame',
    description: 'Handcrafted Wooden Canvas frame with natural finish. Perfect for family photos, certificates, and artwork. Features premium natural wood and acid-free matting.',
    price: 120.00,
    images: [
      '/images/12X16_normal edge.jpg',
      '/images/12X16_goldedge.jpg',
    ],
    category: 'frames',
    variants: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        options: [
          { value: '12x16', label: '12" x 16"', priceAdjustment: 0, inStock: true },
            { value: '16x20', label: '16" x 20"', priceAdjustment: 20, inStock: true },
       
        ],
      },
      {
        id: 'edge style',
        name: 'Edge Style',
        type: 'edge style',
        options: [
          { value: 'Normal', label: 'Normal Edge', priceAdjustment: 0, inStock: true },
          { value: 'Gold', label: 'Gold Edge', priceAdjustment: 10, inStock: true },
       
        ],
      },
    ],
    dimensions: '12" x 16" (default)',
    stock: 999,
    rating: 4.8,
    reviewCount: 135,
    reviews: [
      {
        id: 'r1',
        author: 'Sarah M.',
        rating: 5,
        date: '2024-01-15',
        comment: 'Beautiful quality frame! The Wooden Canvas finish is stunning.',
        verified: true,
      },
    ],
    sku: 'FRAME-OAK-001',
    tags: ['wood', 'classic', 'goldedge', 'natural'],
    featured: true,
  },
  {
    id: '2',
    title: '16x20 Wooden Canvas Frame',
    description: 'Sleek contemporary Wooden Canvas frame with gold edge. Minimalist design that complements modern interiors.',
    price: 150.00,
    images: [
     '/images/16X20_goldedge.jpg',
      '/images/iedit.jpg',
    ],
    category: 'frames',
    variants: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        options: [
          { value: '16x20', label: '16" x 20"', priceAdjustment: 0, inStock: true },

        ],
      },
           {
        id: 'edge style',
        name: 'Edge Style',
        type: 'edge style',
        options: [
          { value: 'none', label: 'Normal Edge', priceAdjustment: 0, inStock: true },
          { value: 'Gold', label: 'Gold Edge', priceAdjustment: 10, inStock: true },
       
        ],
      },
    ],
    dimensions: '16" x 20" (default)',
    stock: 999,
    rating: 4.6,
    reviewCount: 89,
    reviews: [],
    sku: 'FRAME-MET-002',
    tags: ['metal', 'modern', 'black', 'minimalist'],
    featured: true,
  },
  {
    id: '3',
    title: '20x24 Wooden Canvas Frame',
    description: 'Authentic reclaimed barn wood frame with distressed finish. Each piece is unique with natural weathering and character. Perfect for farmhouse style decor.',
    price: 220.00,
    images: [
 '/images/20X24_goldedge.jpg',
      '/images/20X24_normaledge.jpg',
    ],
    category: 'frames',
    variants: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        options: [
          { value: '20x24', label: '20" x 24"', priceAdjustment: 0, inStock: true },
  
        ],
      },
           {
        id: 'edge style',
        name: 'Edge Style',
        type: 'edge style',
        options: [
          { value: 'none', label: 'Normal Edge', priceAdjustment: 0, inStock: true },
          { value: 'Gold', label: 'Gold Edge', priceAdjustment: 10, inStock: true },
       
        ],
      },
    
    ],
     dimensions: '20" x 24" (default)',
    stock: 999,
    rating: 4.9,
    reviewCount: 15,
    reviews: [],
    sku: 'FRAME-BARN-003',
    tags: ['wood', 'rustic', 'reclaimed', 'farmhouse'],
    featured: false,
  },
    {
    id: '4',
    title: '20x30 Wooden Canvas Frame',
    description: 'Authentic reclaimed barn wood frame with distressed finish. Each piece is unique with natural weathering and character. Perfect for farmhouse style decor.',
    price: 250.00,
    images: [
 '/images/20X30_goldedge.jpg',
      '/images/iedit.jpg',
    ],
    category: 'frames',
    variants: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        options: [
          { value: '20x30', label: '20" x 30"', priceAdjustment: 0, inStock: true },
  
        ],
      },
           {
        id: 'edge style',
        name: 'Edge Style',
        type: 'edge style',
        options: [
          { value: 'none', label: 'Normal Edge', priceAdjustment: 0, inStock: true },
          { value: 'Gold', label: 'Gold Edge', priceAdjustment: 10, inStock: true },
       
        ],
      },
    
    ],
     dimensions: '20" x 30" (default)',
    stock: 999,
    rating: 4.9,
    reviewCount: 20,
    reviews: [],
    sku: 'FRAME-BARN-003',
    tags: ['wood', 'rustic', 'reclaimed', 'farmhouse'],
    featured: true,
  },
    {
    id: '5',
    title: '12x16 Wooden Canvas (aluminium Edge) Frame',
    description: 'Authentic reclaimed barn wood frame with distressed finish and aluminium edge. Each piece is unique with natural weathering and character.',
    price: 135.00,
    images: [
 '/images/12X16_aluminiumedge.jpg',
      '/images/iedit.jpg',
    ],
    category: 'frames',
    variants: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        options: [
          { value: '12x16', label: '12" x 16"', priceAdjustment: 0, inStock: true },
  
        ],
      },
           {
        id: 'edge style',
        name: 'Edge Style',
        type: 'edge style',
        options: [
          { value: 'Aluminium', label: 'Aluminium Edge', priceAdjustment: 0, inStock: true },
          
       
        ],
      },
    
    ],
     dimensions: '8" x 12" (default)',
    stock: 999,
    rating: 4.9,
    reviewCount: 15,
    reviews: [],
    sku: 'FRAME-BARN-003',
    tags: ['wood', 'rustic', 'reclaimed', 'farmhouse'],
    featured: true,
  },
    {
    id: '6',
    title: '24x36 Normal Frame (Not Glass)',
    description: 'Quality picture printout and frame. Each piece is unique with natural weathering and character. Perfect for farmhouse style decor.',
    price: 350.00,
    images: [
 '/images/citation.jpg',
      '/images/iedit.jpg',
    ],
    category: 'frames',
    variants: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        options: [
          { value: '24x36', label: '24" x 36"', priceAdjustment: 0, inStock: true },
  
        ],
      },
           {
        id: 'edge style',
        name: 'Edge Style',
        type: 'edge style',
        options: [
          { value: 'Normal Frame Edge', label: 'Normal Frame Edge', priceAdjustment: 0, inStock: true },
          { value: 'Gold Edge', label: 'Gold Edge', priceAdjustment: 10, inStock: true },
       
        ],
      },
    
    ],
     dimensions: '8" x 12" (default)',
    stock: 999,
    rating: 4.9,
    reviewCount: 156,
    reviews: [],
    sku: 'FRAME-BARN-003',
    tags: ['wood', 'rustic', 'reclaimed', 'farmhouse'],
    featured: false,
  },
    {
    id: '7',
    title: '8x12 Wooden Canvas Frame',
    description: 'Authentic reclaimed barn wood frame with distressed finish. Each piece is unique with natural weathering and character. Perfect for farmhouse style decor.',
    price: 75.00,
    images: [
 '/images/ibrand1.jpg',
      '/images/iedit.jpg',
    ],
    category: 'frames',
    variants: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        options: [
          { value: '8x12', label: '8" x 12"', priceAdjustment: 0, inStock: true },
  
        ],
      },
           {
        id: 'edge style',
        name: 'Edge Style',
        type: 'edge style',
        options: [
          { value: 'none', label: 'Normal Edge', priceAdjustment: 0, inStock: true },
          { value: 'Gold', label: 'Gold Edge', priceAdjustment: 10, inStock: true },
       
        ],
      },
    
    ],
     dimensions: '8" x 12" (default)',
    stock: 999,
    rating: 4.9,
    reviewCount: 156,
    reviews: [],
    sku: 'FRAME-BARN-003',
    tags: ['wood', 'rustic', 'reclaimed', 'farmhouse'],
    featured: false,
  },
    {
    id: '8',
    title: '8x12 Wooden Canvas Frame',
    description: 'Authentic reclaimed barn wood frame with distressed finish. Each piece is unique with natural weathering and character. Perfect for farmhouse style decor.',
    price: 75.00,
    images: [
 '/images/ibrand1.jpg',
      '/images/iedit.jpg',
    ],
    category: 'frames',
    variants: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        options: [
          { value: '8x12', label: '8" x 12"', priceAdjustment: 0, inStock: true },
  
        ],
      },
           {
        id: 'edge style',
        name: 'Edge Style',
        type: 'edge style',
        options: [
          { value: 'none', label: 'Normal Edge', priceAdjustment: 0, inStock: true },
          { value: 'Gold', label: 'Gold Edge', priceAdjustment: 10, inStock: true },
       
        ],
      },
    
    ],
     dimensions: '8" x 12" (default)',
    stock: 999,
    rating: 4.9,
    reviewCount: 156,
    reviews: [],
    sku: 'FRAME-BARN-003',
    tags: ['wood', 'rustic', 'reclaimed', 'farmhouse'],
    featured: false,
  },
    {
    id: '9',
    title: '8x12 Wooden Canvas Frame',
    description: 'Authentic reclaimed barn wood frame with distressed finish. Each piece is unique with natural weathering and character. Perfect for farmhouse style decor.',
    price: 75.00,
    images: [
 '/images/ibrand1.jpg',
      '/images/iedit.jpg',
    ],
    category: 'frames',
    variants: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        options: [
          { value: '8x12', label: '8" x 12"', priceAdjustment: 0, inStock: true },
  
        ],
      },
           {
        id: 'edge style',
        name: 'Edge Style',
        type: 'edge style',
        options: [
          { value: 'none', label: 'Normal Edge', priceAdjustment: 0, inStock: true },
          { value: 'Gold', label: 'Gold Edge', priceAdjustment: 10, inStock: true },
       
        ],
      },
    
    ],
     dimensions: '8" x 12" (default)',
    stock: 999,
    rating: 4.9,
    reviewCount: 156,
    reviews: [],
    sku: 'FRAME-BARN-003',
    tags: ['wood', 'rustic', 'reclaimed', 'farmhouse'],
    featured: false,
  },
    {
    id: '10',
    title: '8x12 Wooden Canvas Frame',
    description: 'Authentic reclaimed barn wood frame with distressed finish. Each piece is unique with natural weathering and character. Perfect for farmhouse style decor.',
    price: 75.00,
    images: [
 '/images/ibrand1.jpg',
      '/images/iedit.jpg',
    ],
    category: 'frames',
    variants: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        options: [
          { value: '8x12', label: '8" x 12"', priceAdjustment: 0, inStock: true },
  
        ],
      },
           {
        id: 'edge style',
        name: 'Edge Style',
        type: 'edge style',
        options: [
          { value: 'none', label: 'Normal Edge', priceAdjustment: 0, inStock: true },
          { value: 'Gold', label: 'Gold Edge', priceAdjustment: 10, inStock: true },
       
        ],
      },
    
    ],
     dimensions: '8" x 12" (default)',
    stock: 999,
    rating: 4.9,
    reviewCount: 156,
    reviews: [],
    sku: 'FRAME-BARN-003',
    tags: ['wood', 'rustic', 'reclaimed', 'farmhouse'],
    featured: false,
  },
  {
    id: '11',
    title: '20x24 Wooden Canvas Frame',
    description: 'Elegant gold-leaf frame with ornate detailing. Museum-quality construction perfect for fine art and special photographs. Hand-finished by artisans.',
    price: 170.00,
    images: [
 '/images/ibrand1.jpg',
      '/images/iedit.jpg',
    ],
    category: 'frames',
    variants: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        options: [
          { value: '20x24', label: '20" x 24"', priceAdjustment: 0, inStock: true },
         
        ],
      },
      {
        id: 'eadge style',
        name: 'Edge Style',
        type: 'edge style',
        options: [
          { value: 'normal', label: 'Normal Edge', priceAdjustment: 0, inStock: true },
          { value: 'gold', label: 'Gold Edge', priceAdjustment: 10, inStock: true },
        ],
      },
    ],
    stock: 999,
    rating: 4.7,
    reviewCount: 73,
    reviews: [],
    sku: 'FRAME-GOLD-004',
    tags: ['gold', 'ornate', 'elegant', 'gallery'],
    featured: false,
  },
    {
    id: '12',
    title: '8x12 Wooden Canvas Frame',
    description: 'Authentic reclaimed barn wood frame with distressed finish. Each piece is unique with natural weathering and character. Perfect for farmhouse style decor.',
    price: 75.00,
    images: [
 '/images/ibrand1.jpg',
      '/images/iedit.jpg',
    ],
    category: 'frames',
    variants: [
      {
        id: 'size',
        name: 'Size',
        type: 'size',
        options: [
          { value: '8x12', label: '8" x 12"', priceAdjustment: 0, inStock: true },
  
        ],
      },
           {
        id: 'edge style',
        name: 'Edge Style',
        type: 'edge style',
        options: [
          { value: 'none', label: 'Normal Edge', priceAdjustment: 0, inStock: true },
          { value: 'Gold', label: 'Gold Edge', priceAdjustment: 10, inStock: true },
       
        ],
      },
    
    ],
     dimensions: '8" x 12" (default)',
    stock: 999,
    rating: 4.9,
    reviewCount: 156,
    reviews: [],
    sku: 'FRAME-BARN-003',
    tags: ['wood', 'rustic', 'reclaimed', 'farmhouse'],
    featured: false,
  },
  
  {
    id: '13',
    title: 'Custom Photo Framing Service',
    description: 'Professional custom framing service. Choose your photo, mat, frame style, and size. We handle the printing, matting, and framing. Ships in 5-7 business days.',
    price: 129.99,
    images: [
      '/images/ibrand1.jpg',
      '/images/iedit.jpg',
    ],
    category: 'custom',
    variants: [
      {
        id: 'size',
        name: 'Print Size',
        type: 'size',
        options: [
          { value: '11x14', label: '11" x 14"', priceAdjustment: 0, inStock: true },
          { value: '16x20', label: '16" x 20"', priceAdjustment: 40, inStock: true },
          { value: '20x24', label: '20" x 24"', priceAdjustment: 70, inStock: true },
          { value: '24x36', label: '24" x 36"', priceAdjustment: 120, inStock: true },
        ],
      },
      {
        id: 'material',
        name: 'Frame Material',
        type: 'material',
        options: [
          { value: 'wood', label: 'Natural Wood', priceAdjustment: 0, inStock: true },
          { value: 'metal', label: 'Metal', priceAdjustment: 20, inStock: true },
          { value: 'gold', label: 'Gold Leaf', priceAdjustment: 50, inStock: true },
        ],
      },
    ],
    stock: 999,
    rating: 4.9,
    reviewCount: 234,
    reviews: [],
    sku: 'CUSTOM-FRAME-005',
    tags: ['custom', 'service', 'professional', 'printing'],
    featured: false,
  },
   {
    id: '14',
    title: 'Custom Photo Framing Service',
    description: 'Professional custom framing service. Choose your photo, mat, frame style, and size. We handle the printing, matting, and framing. Ships in 5-7 business days.',
    price: 129.99,
    images: [
      '/images/ibrand1.jpg',
      '/images/iedit.jpg',
    ],
    category: 'custom',
    variants: [
      {
        id: 'size',
        name: 'Print Size',
        type: 'size',
        options: [
          { value: '11x14', label: '11" x 14"', priceAdjustment: 0, inStock: true },
          { value: '16x20', label: '16" x 20"', priceAdjustment: 40, inStock: true },
          { value: '20x24', label: '20" x 24"', priceAdjustment: 70, inStock: true },
          { value: '24x36', label: '24" x 36"', priceAdjustment: 120, inStock: true },
        ],
      },
      {
        id: 'material',
        name: 'Frame Material',
        type: 'material',
        options: [
          { value: 'wood', label: 'Natural Wood', priceAdjustment: 0, inStock: true },
          { value: 'metal', label: 'Metal', priceAdjustment: 20, inStock: true },
          { value: 'gold', label: 'Gold Leaf', priceAdjustment: 50, inStock: true },
        ],
      },
    ],
    stock: 999,
    rating: 4.9,
    reviewCount: 234,
    reviews: [],
    sku: 'CUSTOM-FRAME-005',
    tags: ['custom', 'service', 'professional', 'printing'],
    featured: false,
  },
   {
    id: '15',
    title: 'Custom Photo Framing Service',
    description: 'Professional custom framing service. Choose your photo, mat, frame style, and size. We handle the printing, matting, and framing. Ships in 5-7 business days.',
    price: 129.99,
    images: [
      '/images/ibrand1.jpg',
      '/images/iedit.jpg',
    ],
    category: 'custom',
    variants: [
      {
        id: 'size',
        name: 'Print Size',
        type: 'size',
        options: [
          { value: '11x14', label: '11" x 14"', priceAdjustment: 0, inStock: true },
          { value: '16x20', label: '16" x 20"', priceAdjustment: 40, inStock: true },
          { value: '20x24', label: '20" x 24"', priceAdjustment: 70, inStock: true },
          { value: '24x36', label: '24" x 36"', priceAdjustment: 120, inStock: true },
        ],
      },
      {
        id: 'material',
        name: 'Frame Material',
        type: 'material',
        options: [
          { value: 'wood', label: 'Natural Wood', priceAdjustment: 0, inStock: true },
          { value: 'metal', label: 'Metal', priceAdjustment: 20, inStock: true },
          { value: 'gold', label: 'Gold Leaf', priceAdjustment: 50, inStock: true },
        ],
      },
    ],
    stock: 999,
    rating: 4.9,
    reviewCount: 234,
    reviews: [],
    sku: 'CUSTOM-FRAME-005',
    tags: ['custom', 'service', 'professional', 'printing'],
    featured: true,
  },
];

export const categories = [
  { id: 'all', name: 'All Products', count: mockProducts.length },
  { id: 'frames', name: 'Frames for you', count: mockProducts.filter(p => p.category === 'frames').length },
  { id: 'custom', name: 'Custom/already made frame', count: mockProducts.filter(p => p.category === 'custom').length },
];

export const editingServices: EditingService[] = [
  {
    id: 'basic-retouch',
    title: 'Basic Retouching',
    description: 'Perfect for everyday photos that need a quick polish',
    price: 20,
    image: '/images/iedit.jpg',
    category: 'basic',
    turnaroundTime: '24-48 hours',
    features: [
      'Color correction & brightness adjustment',
      'Basic blemish removal',
      'Cropping & straightening',
      'Light & shadow enhancement',
      'Red-eye removal',
    ],
  },
  {
    id: 'advanced-retouch',
    title: 'Advanced Retouching',
    description: 'Professional-grade editing for portraits and special occasions',
    price: 50,
    image: '/images/edit.jpg',
    category: 'advanced',
    popular: true,
    turnaroundTime: '2-3 days',
    features: [
      'Everything in Basic Retouching',
      'Advanced skin smoothing & texture refinement',
      'Teeth whitening & eye enhancement',
      'Body contouring & reshaping',
      'Background cleanup & object removal',
      'Professional color grading',
    ],
  },
  {
    id: 'premium-editing',
    title: 'Premium Creative Editing',
    description: 'Complete artistic transformation for commercial and creative projects',
    price: 80,
    image: '/images/iedit.jpg',
    category: 'premium',
    turnaroundTime: '2 days',
    features: [
      'Everything in Advanced Retouching',
      'Complex background replacement',
      'Advanced compositing & photo manipulation',
      'Custom artistic effects & filters',
      'HDR processing & frequency separation',
      'Magazine-quality final output',
      'Unlimited revision rounds',
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Lydia Owusu',
    role: 'Wedding Photographer',
    content: 'The advanced retouching service transformed my wedding photos into absolute masterpieces. The attention to detail is incredible!',
    rating: 5,
    avatar: '/images/edit.jpg',
  },
  {
    id: '2',
    author: 'Jacinta',
    role: 'University Of CapeCoast',
    content: 'Their custom framing service is unmatched. They helped me frame my entire collection with expert guidance and premium materials.',
    rating: 5,
    avatar: '/images/edit.jpg',
  },
  {
    id: '3',
    author: 'Veronica',
    role: 'Student Nurse',
    content: 'I order frames for all my client projects. The quality is consistently excellent and the delivery is always on time.',
    rating: 5,
    avatar: '/images/design1.jpg',
  },
];
