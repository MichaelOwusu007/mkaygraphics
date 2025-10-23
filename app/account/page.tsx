"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Package, MapPin, Edit2, Save, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
//import { useCartStore } from "@/stores/cartStore";

interface Profile {
  id: string;
  name: string;
  phone: string | null;
}

interface ShippingAddress {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  order_items: OrderItem[];
}

interface UserSession {
  id: string;
  email: string;
}

const statusColors: Record<string, string> = {
  delivered: "bg-green-500",
  shipped: "bg-blue-500",
  processing: "bg-yellow-500",
  pending: "bg-gray-500",
  confirmed: "bg-purple-500",
};

export default function AccountPage() {
  const router = useRouter();

  const [user, setUser] = useState<UserSession | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  // const { addItem } = useCartStore();

  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
    if (error) {
      toast.error("Error fetching profile");
      return;
    }
    setProfile(data);
    setEditedName(data.name);
  }, []);

  const fetchOrders = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        created_at,
        status,
        total,
        order_items (
          product_name,
          quantity,
          price
        )
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error fetching orders");
      return;
    }

    setOrders(data || []);
  }, []);

  const fetchShippingAddress = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("shipping_addresses")
      .select("*")
      .eq("user_id", userId)
      .eq("is_default", true)
      .single();

    if (!error && data) {
      setShippingAddress(data);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      router.push("/auth");
      return;
    }

    const currentUser = {
      id: data.session.user.id,
      email: data.session.user.email ?? "",
    };

    setUser(currentUser);

    await Promise.all([
      fetchProfile(currentUser.id),
      fetchOrders(currentUser.id),
      fetchShippingAddress(currentUser.id),
    ]);

    setIsLoading(false);
  }, [fetchProfile, fetchOrders, fetchShippingAddress, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleUpdateProfile = async () => {
    if (!profile) return;
    setIsLoading(true);

    if (editedName !== profile.name) {
      const { error } = await supabase.from("profiles").update({ name: editedName }).eq("id", profile.id);
      if (error) {
        toast.error("Error updating profile");
        setIsLoading(false);
        return;
      }
    }

    if (newPassword) {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        setIsLoading(false);
        return;
      }

      if (newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast.error("Error updating password");
        setIsLoading(false);
        return;
      }
    }

    toast.success("Profile updated successfully");
    setIsEditing(false);
    setNewPassword("");
    setConfirmPassword("");
    await fetchProfile(profile.id);
    setIsLoading(false);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDialogOpen(true);
  };

//   const handleBuyAgain = (order: Order) => {
//     order.order_items.forEach((item) => {
//       // You may want to fetch the real product object here if available
//       const product = {
//         id: item.product_name, // Use product_id if available
//         title: item.product_name,
//         name: item.product_name,
//         price: Number(item.price),
//         images: ["/placeholder.svg"],
//         image: "/placeholder.svg",
//         category: "Frame",
//         description: "",
//         variants: [],
//         stock: 10,
//         rating: 5,
//         reviewCount: 0,
//         reviews: [],
//         sku: item.product_name,
//         tags: [],
//       };
//       addItem(product, {}, item.quantity);
//     });
//     toast.success(`${order.order_items.length} item(s) added to cart!`);
//   };

  const totalSpent = orders.reduce((sum, order) => sum + Number(order.total), 0);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-serif text-4xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ✅ Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-gold mx-auto" />
            {!isEditing ? (
              <>
                <div className="text-center">
                  <p className="font-semibold text-lg">{profile?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  {profile?.phone && (
                    <p className="text-sm text-muted-foreground">{profile.phone}</p>
                  )}
                </div>
                <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password (optional)</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Leave blank to keep current"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleUpdateProfile} disabled={isLoading} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedName(profile?.name || "");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ✅ Stats */}
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
              <span className="text-2xl font-bold">{orders.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Spent</span>
              <span className="text-2xl font-bold">GH₵{totalSpent.toFixed(2)}</span>
            </div>
            <Button className="w-full" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>

        {/* ✅ Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {shippingAddress ? (
              <div className="text-sm space-y-1">
                <p className="font-semibold">{shippingAddress.name}</p>
                <p className="text-muted-foreground">{shippingAddress.address}</p>
                <p className="text-muted-foreground">
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
                </p>
                <p className="text-muted-foreground">{shippingAddress.country}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No shipping address saved yet</p>
            )}
            <Button variant="outline" className="w-full" onClick={() => router.push("/checkout")}>
              Update Address
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* ✅ Order History */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Order History</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">You haven&apos;t placed any orders yet</p>
              <Button asChild>
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</h3>
                        <Badge className={statusColors[order.status] || "bg-gray-500"}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">GH₵{Number(order.total).toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.order_items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.quantity}x {item.product_name}
                        </span>
                        <span className="font-semibold">
                          GH₵{(Number(item.price) * item.quantity).toFixed(2)} single
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-3">
                    <Button
                    className="cursor-pointer hover:bg-yellow-500"
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                    {/* <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBuyAgain(order)}
                    >
                      Order Again
                    </Button> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order #{selectedOrder?.id.slice(0, 8)}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-semibold">
                    {new Date(selectedOrder.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={statusColors[selectedOrder.status]}>
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="font-bold text-lg">GH₵{Number(selectedOrder.total).toFixed(2)}</p>
                </div>
              </div>
              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Items Ordered
                </h3>
                <div className="space-y-3">
                  {selectedOrder.order_items.map((item, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-semibold">{item.product_name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold">
                          GH₵{(Number(item.price) * item.quantity).toFixed(2)} single
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                {/* <Button
                  className="flex-1"
                  onClick={() => {
                    handleBuyAgain(selectedOrder);
                    setIsOrderDialogOpen(false);
                  }}
                >
                  Order Again
                </Button> */}
                <Button
                  variant="outline"
                  className="flex-1 hover:bg-red-600 cursor-pointer"
                  onClick={() => setIsOrderDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
