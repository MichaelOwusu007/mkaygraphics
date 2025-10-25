import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page




// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { useCartStore } from "@/stores/cartStore";
// import { X, ShoppingBag, Image as ImageIcon } from "lucide-react";

// export default function ServiceCartPage() {
//   const router = useRouter();
//   const { serviceItems, removeServiceItem } = useCartStore();
//   const [promoCode, setPromoCode] = useState("");
//   const [promoApplied, setPromoApplied] = useState(false);

//   const serviceTotal = serviceItems.reduce(
//     (total, item) => total + item.totalPrice,
//     0
//   );
//   const discount = promoApplied ? serviceTotal * 0.1 : 0;
//   const total = serviceTotal - discount;

//   const handleApplyPromo = () => {
//     if (promoCode.toLowerCase() === "save10") {
//       setPromoApplied(true);
//     }
//   };

//   if (serviceItems.length === 0) {
//     return (
//       <>
//         {/* <Head>
//           <title>Service Cart | Editing Services</title>
//           <meta
//             name="description"
//             content="Your service cart is empty. Browse our professional editing services and add items to your cart."
//           />
//         </Head> */}

//         <div className="container mx-auto px-4 py-20">
//           <div className="max-w-md mx-auto text-center space-y-6">
//             <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
//             <h1 className="font-serif text-3xl font-bold">
//               Your Service Cart is Empty
//             </h1>
//             <p className="text-muted-foreground">
//               Looks like you haven't added any services yet.
//             </p>
//             <Button size="lg" asChild>
//               <Link href="/services/editing">Browse Services</Link> 
//             </Button>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       {/* <Head>
//         <title>Service Cart | Editing Services</title>
//         <meta
//           name="description"
//           content="View and manage the services in your cart. Apply promo codes and proceed to checkout securely."
//         />
//       </Head> */}

//       <div className="container mx-auto px-4 py-8">
//         <h1 className="font-serif text-4xl font-bold mb-8">Service Cart</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Service Items */}
//           <div className="lg:col-span-2 space-y-4">
//             {serviceItems.map((item) => (
//               <Card key={item.serviceId}>
//                 <CardContent className="p-6">
//                   <div className="flex gap-6 flex-col sm:flex-row">
//                     <div className="shrink-0 w-full sm:w-32 h-48 sm:h-32 bg-secondary/10 rounded-lg flex items-center justify-center relative">
//                       {/* You can replace this placeholder with actual image if service has one */}
//                       {item.service.image ? (
//                         <Image
//                           src={item.service.image}
//                           alt={item.service.title}
//                           fill
//                           className="object-cover rounded-lg"
//                         />
//                       ) : (
//                         <ImageIcon className="h-16 w-16 text-secondary" />
//                       )}
//                     </div>

//                     <div className="flex-1 space-y-3">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <Link href={`/services/${item.serviceId}`}>
//                             <h3 className="font-semibold text-lg hover:text-secondary transition-colors">
//                               {item.service.title}
//                             </h3>
//                           </Link>
//                           <Badge
//                             variant="outline"
//                             className="mt-1 capitalize"
//                           >
//                             {item.service.category} Service
//                           </Badge>
//                           <div className="text-sm text-muted-foreground mt-2 space-y-1">
//                             <div className="font-medium">
//                               {item.photoCount} photo
//                               {item.photoCount > 1 ? "s" : ""}
//                             </div>
//                             <div className="text-xs">
//                               ${item.service.price} per photo
//                             </div>
//                             <div className="text-xs">
//                               Turnaround: {item.service.turnaroundTime}
//                             </div>
//                           </div>
//                           {item.specialInstructions && (
//                             <div className="mt-2 text-xs text-muted-foreground">
//                               <span className="font-medium">
//                                 Instructions:{" "}
//                               </span>
//                               {item.specialInstructions}
//                             </div>
//                           )}
//                         </div>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => removeServiceItem(item.serviceId)}
//                         >
//                           <X className="h-5 w-5" />
//                         </Button>
//                       </div>

//                       <div className="flex items-center justify-between pt-2 border-t">
//                         <div className="text-sm text-muted-foreground">
//                           Digital Service - No Shipping Required
//                         </div>
//                         <p className="text-xl font-bold">
//                           ${item.totalPrice.toFixed(2)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-20">
//               <CardContent className="p-6 space-y-6">
//                 <h2 className="font-serif text-2xl font-bold">Service Summary</h2>

//                 <div className="space-y-3">
//                   <div className="flex justify-between">
//                     <span className="text-muted-foreground">Service Total</span>
//                     <span className="font-semibold">
//                       ${serviceTotal.toFixed(2)}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">Shipping</span>
//                     <span className="font-semibold text-secondary">
//                       Not Required
//                     </span>
//                   </div>
//                   {promoApplied && (
//                     <div className="flex justify-between text-secondary">
//                       <span>Promo Code</span>
//                       <span>-${discount.toFixed(2)}</span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="border-t pt-3">
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total</span>
//                     <span>${total.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Input
//                     placeholder="Promo code"
//                     value={promoCode}
//                     onChange={(e) => setPromoCode(e.target.value)}
//                     disabled={promoApplied}
//                   />
//                   <Button
//                     variant="outline"
//                     className="w-full"
//                     onClick={handleApplyPromo}
//                     disabled={promoApplied}
//                   >
//                     {promoApplied ? "Code Applied" : "Apply Code"}
//                   </Button>
//                   {promoApplied && (
//                     <p className="text-xs text-center text-secondary">
//                       10% discount applied!
//                     </p>
//                   )}
//                   <p className="text-xs text-center text-muted-foreground">
//                     Try code: SAVE10
//                   </p>
//                 </div>

//                 <Button size="lg" className="w-full" asChild>
//                   <Link href="/service-checkout">Proceed to Checkout</Link>
//                 </Button>

//                 <Button variant="outline" className="w-full" asChild>
//                   <Link href="/services/editing">Browse More Services</Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
