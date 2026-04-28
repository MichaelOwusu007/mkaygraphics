'use client';

import { useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Clock, Shield, Star } from "lucide-react";
import { editingServices } from "@/lib/mockData"; // your mock data
import { toast } from "sonner";

export default function ServiceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [photoCount, setPhotoCount] = useState<number>(1);

  const service = useMemo(
    () => editingServices.find((s) => s.id === params?.id),
    [params?.id]
  );

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Service not found</h1>
        <Link href="/services">
          <Button>Back to Services</Button>
        </Link>
      </div>
    );
  }

  const totalPrice = service.price * photoCount;

  const handleProceedToCheckout = () => {
    if (photoCount < 1) {
      toast.error("Please select at least one photo");
      return;
    }

    // Save a small draft to sessionStorage (no long query params)
    const draft = {
      serviceId: service.id,
      title: service.title,
      image: service.image,
      price: service.price,
      photoCount,
      turnaroundTime: service.turnaroundTime || "",
    };

    try {
      sessionStorage.setItem("mkaygraphix_service_checkout_draft", JSON.stringify(draft));
      router.push("/service-checkout");
    } catch (err) {
      console.error("Failed to save draft:", err);
      toast.error("Unable to start checkout — please try again");
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/services")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Service Info */}
            <div className="space-y-6 animate-fade-in">
              <div className="aspect-square rounded-lg overflow-hidden shadow-elegant relative">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <h1 className=" text-4xl font-bold mb-2">
                      {service.title}
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      {service.description}
                    </p>
                  </div>
                  {service.popular && (
                    <Badge className="bg-secondary text-secondary-foreground">
                      Most Popular
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{service.turnaroundTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Money-back guarantee</span>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-semibold text-lg mb-4">What&apos;s Included:</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
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
                      <span className="text-sm text-muted-foreground">
                        Price per photo
                      </span>
                      <span className=" text-3xl font-bold">
                        GH{service.price}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="photoCount"
                        className="text-base font-semibold"
                      >
                        Number of Photos
                      </Label>
                      <p className="text-sm text-muted-foreground mb-3">
                        How many photos do you need edited?
                      </p>
                      <Input
                        id="photoCount"
                        type="number"
                        min={1}
                        max={1000}
                        value={photoCount}
                        onChange={(e) =>
                          setPhotoCount(
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        className="text-lg font-semibold"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        💡 You&apos;ll share your files after checkout via secure
                        transfer
                      </p>
                    </div>
                  </div>

                  {/* Pricing Summary */}
                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Number of photos
                      </span>
                      <span className="font-semibold">{photoCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Price per photo
                      </span>
                      <span className="font-semibold">${service.price}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-3">
                      <span>Total</span>
                      <span className="text-secondary">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full" onClick={handleProceedToCheckout}>
                    Proceed to Checkout
                  </Button>

                  <div className="space-y-2 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-secondary fill-secondary" />
                      <span>Professional editing by experts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-secondary" />
                      <span>Secure file handling &amp; privacy</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 text-secondary" />
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
                    .slice(0, 2)
                    .map((s) => (
                      <Card
                        key={s.id}
                        className="hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => router.push(`/services/${s.id}`)}
                      >
                        <CardContent className="p-4 flex items-center gap-4">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={s.image}
                              alt={s.title}
                              fill
                              className="rounded object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{s.title}</p>
                            <p className="text-xs text-muted-foreground">
                              GH{s.price} per photo
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
