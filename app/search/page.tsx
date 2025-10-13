'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { mockProducts } from '@/lib/mockData';
import { Search as SearchIcon, Star } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    return mockProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 🔸 Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="font-serif text-4xl font-bold mb-6 text-center">
          Search Products
        </h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search for frames, materials, or styles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
            autoFocus
          />
        </div>
      </div>

      {/* 🔸 Results */}
      {query.trim() && (
        <div>
          <p className="text-gray-500 mb-6">
            Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"
          </p>

          {searchResults.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500 mb-4">
                No products found matching your search.
              </p>
              <p className="text-sm text-gray-400">
                Try different keywords or browse all products.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map(product => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="aspect-square overflow-hidden rounded-t-lg">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold line-clamp-2">{product.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{product.rating}</span>
                          <span>({product.reviewCount})</span>
                        </div>
                        <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 🔸 Default State */}
      {!query.trim() && (
        <div className="text-center py-20 space-y-4">
          <SearchIcon className="h-20 w-20 mx-auto text-gray-400" />
          <p className="text-lg text-gray-500">
            Start typing to search for products
          </p>
        </div>
      )}
    </div>
  );
}
