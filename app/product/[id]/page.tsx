'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { mockProducts } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, ChevronLeft, Check, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { toast } from 'sonner';
import Image from 'next/image'; // Added import

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = mockProducts.find((p) => String(p.id) === String(id));
  const addItem = useCartStore((state) => state.addItem);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  // Initialize default variants
  useEffect(() => {
    if (product && Object.keys(selectedVariants).length === 0 && product.variants.length > 0) {
      const defaults: Record<string, string> = {};
      product.variants.forEach((variant) => {
        defaults[variant.id] = variant.options[0].value;
      });
      setSelectedVariants(defaults);
    }
    
  }, [product, selectedVariants]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    let total = product.price;
    Object.entries(selectedVariants).forEach(([variantId, optionValue]) => {
      const variant = product.variants.find((v) => v.id === variantId);
      const option = variant?.options.find((o) => o.value === optionValue);
      if (option) {
        total += option.priceAdjustment;
      }
    });
    return total;
  };

  const handleAddToCart = () => {
    addItem(product, selectedVariants, quantity);
    toast.success('Added to cart!', {
      description: `${quantity}x ${product.title}`,
    });
  };

  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gray-900">
          Shop
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.title}</span>
      </div>

      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/shop">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>
      </Button>

      {/* Product Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-gray-900' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">{product.rating}</span>
              </div>
              <span>({product.reviewCount} reviews)</span>
            </div>
            <p className="text-3xl font-bold">GH₵{calculateTotalPrice().toFixed(2)}</p>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Variants */}
          <div className="space-y-4">
            {product.variants.map((variant) => (
              <div key={variant.id}>
                <label className="block font-semibold mb-2 capitalize">{variant.name}</label>
                <Select
                  value={selectedVariants[variant.id]}
                  onValueChange={(value) =>
                    setSelectedVariants({ ...selectedVariants, [variant.id]: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {variant.options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={!option.inStock}
                      >
                        {option.label}
                        {option.priceAdjustment > 0 && ` (+GH₵${option.priceAdjustment.toFixed(2)})`}
                        {!option.inStock && ' (Out of Stock)'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-semibold mb-2">Quantity</label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              >
                +
              </Button>
              <span className="text-sm text-gray-500">available in stock</span>
            </div>
          </div>

          {/* Add to Cart */}
          <Button size="lg" className="w-full bg-gray-900 text-white hover:bg-gray-700" onClick={handleAddToCart}>
            Add to Cart
          </Button>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/233592515464?text=Hi, I'm interested in ${encodeURIComponent(product.title)} (GH₵${calculateTotalPrice().toFixed(2)})`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>

          {/* Features */}
          <Card>
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm">Premium materials and craftsmanship</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm">Free shipping on orders over GH500 in Capecoast and Accra Only</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm">7-days return guarantee</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 border-t">
          <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all">
                  <CardContent className="p-0">
                    <div className="aspect-square overflow-hidden rounded-t-lg">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.title}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold line-clamp-1">{relatedProduct.title}</h3>
                      <p className="font-semibold text-lg">GH₵{relatedProduct.price.toFixed(2)}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
