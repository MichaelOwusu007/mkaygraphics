"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Package, MapPin } from "lucide-react";

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-03-15",
    status: "delivered",
    total: 149.98,
    items: [
      { name: "Classic Wood Frame - Oak", quantity: 2, price: 49.99 },
      { name: "Modern Black Metal Frame", quantity: 1, price: 39.99 },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-03-10",
    status: "shipped",
    total: 89.99,
    items: [{ name: "Gallery Gold Frame", quantity: 1, price: 89.99 }],
  },
  {
    id: "ORD-003",
    date: "2024-03-05",
    status: "processing",
    total: 129.99,
    items: [{ name: "Custom Photo Framing Service", quantity: 1, price: 129.99 }],
  },
];

const statusColors: Record<string, string> = {
  delivered: "bg-green-500",
  shipped: "bg-blue-500",
  processing: "bg-yellow-500",
  pending: "bg-gray-500",
};

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-gold mx-auto" />
            <div className="text-center">
              <p className="font-semibold text-lg">John Doe</p>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Orders</span>
              <span className="text-2xl font-bold">{mockOrders.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Spent</span>
              <span className="text-2xl font-bold">
                ${mockOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </span>
            </div>
            <Button className="w-full" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm space-y-1">
              <p className="font-semibold">John Doe</p>
              <p className="text-muted-foreground">123 Main Street</p>
              <p className="text-muted-foreground">New York, NY 10001</p>
              <p className="text-muted-foreground">United States</p>
            </div>
            <Button variant="outline" className="w-full">
              Update Address
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Order History */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <Badge className={statusColors[order.status]}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Placed on {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity}× {item.name}
                      </span>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-3">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {order.status === "delivered" && (
                    <Button variant="outline" size="sm">
                      Buy Again
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
