import type { EditingService } from '@/types';

// This catalog is also imported by the payment backend. The server always looks
// up the service and price here instead of accepting a price from the browser.
export const editingServices: ReadonlyArray<EditingService> = [
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
    image: '/images/shop2.jpg',
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

export function getEditingService(serviceId: string) {
  return editingServices.find((service) => service.id === serviceId);
}
