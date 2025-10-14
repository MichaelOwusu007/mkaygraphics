import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ServiceCartItem, EditingService } from '@/types';

interface CartState {
  items: CartItem[];
  serviceItems: ServiceCartItem[];
  isOpen: boolean;
  addItem: (product: Product, selectedVariants: Record<string, string>, quantity?: number) => void;
  addServiceItem: (service: EditingService, photoCount: number, instructions?: string, files?: File[]) => void;
  removeItem: (productId: string, variantKey: string) => void;
  removeServiceItem: (serviceId: string) => void;
  updateQuantity: (productId: string, variantKey: string, quantity: number) => void;
  updateServiceQuantity: (serviceId: string, photoCount: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const getVariantKey = (variants: Record<string, string>) => {
  return Object.entries(variants)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value]) => value) // removed unused variable _
    .join('-');
};

const calculateItemPrice = (product: Product, selectedVariants: Record<string, string>): number => {
  let price = product.price;
  
  Object.entries(selectedVariants).forEach(([variantId, optionValue]) => {
    const variant = product.variants.find(v => v.id === variantId);
    const option = variant?.options.find(o => o.value === optionValue);
    if (option) {
      price += option.priceAdjustment;
    }
  });
  
  return price;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      serviceItems: [],
      isOpen: false,

      addItem: (product, selectedVariants, quantity = 1) => {
        const variantKey = getVariantKey(selectedVariants);
        const existingItem = get().items.find(
          item => item.productId === product.id && getVariantKey(item.selectedVariants) === variantKey
        );

        if (existingItem) {
          set({
            items: get().items.map(item =>
              item.productId === product.id && getVariantKey(item.selectedVariants) === variantKey
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          const totalPrice = calculateItemPrice(product, selectedVariants);
          set({
            items: [
              ...get().items,
              {
                productId: product.id,
                product,
                quantity,
                selectedVariants,
                totalPrice,
              },
            ],
          });
        }
      },

      removeItem: (productId, variantKey) => {
        set({
          items: get().items.filter(
            item => !(item.productId === productId && getVariantKey(item.selectedVariants) === variantKey)
          ),
        });
      },

      updateQuantity: (productId, variantKey, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantKey);
          return;
        }

        set({
          items: get().items.map(item =>
            item.productId === productId && getVariantKey(item.selectedVariants) === variantKey
              ? { ...item, quantity }
              : item
          ),
        });
      },

      addServiceItem: (service, photoCount, instructions = '', files = []) => {
        const existingItem = get().serviceItems.find(item => item.serviceId === service.id);
        
        if (existingItem) {
          set({
            serviceItems: get().serviceItems.map(item =>
              item.serviceId === service.id
                ? { ...item, photoCount: item.photoCount + photoCount }
                : item
            ),
          });
        } else {
          set({
            serviceItems: [
              ...get().serviceItems,
              {
                serviceId: service.id,
                service,
                photoCount,
                specialInstructions: instructions,
                uploadedFiles: files,
                totalPrice: service.price * photoCount,
              },
            ],
          });
        }
      },

      removeServiceItem: (serviceId) => {
        set({
          serviceItems: get().serviceItems.filter(item => item.serviceId !== serviceId),
        });
      },

      updateServiceQuantity: (serviceId, photoCount) => {
        if (photoCount <= 0) {
          get().removeServiceItem(serviceId);
          return;
        }

        set({
          serviceItems: get().serviceItems.map(item =>
            item.serviceId === serviceId
              ? { ...item, photoCount, totalPrice: item.service.price * photoCount }
              : item
          ),
        });
      },

      clearCart: () => set({ items: [], serviceItems: [] }),

      toggleCart: () => set({ isOpen: !get().isOpen }),

      getTotalItems: () => {
        const productItems = get().items.reduce((total, item) => total + item.quantity, 0);
        const serviceCount = get().serviceItems.reduce((total, item) => total + item.photoCount, 0);
        return productItems + serviceCount;
      },

      getTotalPrice: () => {
        const productTotal = get().items.reduce((total, item) => total + item.totalPrice * item.quantity, 0);
        const serviceTotal = get().serviceItems.reduce((total, item) => total + item.totalPrice, 0);
        return productTotal + serviceTotal;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
