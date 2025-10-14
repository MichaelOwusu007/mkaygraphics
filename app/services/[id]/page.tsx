"use client";

import { useState, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Upload, Star, Clock, Shield } from "lucide-react";
import { editingServices } from "@/lib/mockData";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export default function ServiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addServiceItem, toggleCart } = useCartStore();

  const service = editingServices.find((s) => s.id === id);
  const [photoCount, setPhotoCount] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Service not found</h1>
        <Button onClick={() => router.push("/services")}>Back to Services</Button>
      </div>
    );
  }

  const totalPrice = service.price * photoCount;

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
    setPhotoCount(uploadedFiles.length + files.length);
    toast.success(`${files.length} photo(s) uploaded`);
  };

  const handleOrder = () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please upload at least one photo");
      return;
    }

    addServiceItem(service, photoCount, specialInstructions, uploadedFiles);
    toast.success("Service added to cart!");
    toggleCart();
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/services")}
          className="mb-6 flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Service Info */}
          <div className="space-y-6 animate-fade-in">
            <div className="aspect-video rounded-lg overflow-hidden shadow-md">
              <Image
                src={service.image}
                alt={service.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-serif text-4xl font-bold mb-2">
                    {service.title}
                  </h1>
                  <p className="text-gray-600 text-lg">{service.description}</p>
                </div>
                {service.popular && (
                  <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                )}
              </div>

              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{service.turnaroundTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>Money-back guarantee</span>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-semibold text-lg mb-4">What&apos;s Included:</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Order Form */}
          <div className="lg:sticky lg:top-20 h-fit">
            <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-gray-500">Price per photo</span>
                    <span className="font-serif text-3xl font-bold">${service.price}</span>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-3">
                  <Label>Upload Your Photos</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-blue-600 transition-colors cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="font-semibold mb-1">Click to upload</p>
                      <p className="text-sm text-gray-500">PNG, JPG, HEIC up to 50MB each</p>
                    </label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-semibold">
                        {uploadedFiles.length} photo(s) uploaded:
                      </p>
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="text-sm text-gray-600 flex items-center gap-2"
                          >
                            <Check className="h-3 w-3 text-blue-600" />
                            {file.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Special Instructions */}
                <div className="space-y-3">
                  <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Tell us about any specific requirements, areas of focus, or preferences..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Pricing Summary */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Number of photos</span>
                    <span className="font-semibold">{photoCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price per photo</span>
                    <span className="font-semibold">${service.price}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-3">
                    <span>Total</span>
                    <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Button size="lg" className="w-full" onClick={handleOrder}>
                  Add to Cart
                </Button>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Star className="h-4 w-4 text-blue-600 fill-blue-600" />
                    <span>Professional editing by experts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span>Secure file handling &amp; privacy</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span>Fast turnaround guaranteed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Services */}
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Other Services</h3>
              <div className="space-y-3">
                {editingServices
                  .filter((s) => s.id !== service.id)
                  .map((s) => (
                    <Link key={s.id} href={`/services/${s.id}`}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4 flex items-center gap-4">
                          <Image
                            src={s.image}
                            alt={s.title}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{s.title}</p>
                            <p className="text-xs text-gray-500">${s.price} per photo</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
