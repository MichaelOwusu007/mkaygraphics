"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  email: string;
  created_at: string;
}

interface OrderItem {
  product_name: string;
  quantity: number;
}

interface Profile {
  id: string;
  name: string;
  phone: string;
  email: string;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  order_items: OrderItem[];
  profile: Profile;
}

const statusOptions = ["pending", "processing", "confirmed", "shipped", "delivered"];

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, ordersRes] = await Promise.all([
          fetch("/api/admin/users"),
          fetch("/api/admin/orders"),
        ]);

        const usersData = await usersRes.json();
        const ordersData = await ordersRes.json();

        if (usersRes.ok) setUsers(usersData);
        else toast.error(usersData.error || "Failed to load users");

        if (ordersRes.ok) setOrders(ordersData);
        else toast.error(ordersData.error || "Failed to load orders");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
   try {
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || "Failed to update order");
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast.success(`Order status updated to "${newStatus}"`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          {/* Users Section */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({users.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {users.length === 0 ? (
                <p>No users found.</p>
              ) : (
                <ul className="space-y-2">
                  {users.map((u) => (
                    <li key={u.id} className="flex justify-between border-b pb-2">
                      <span>{u.email}</span>
                      <span></span>
                      <span className="text-sm text-gray-500">
                        Joined: {new Date(u.created_at).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Orders Section */}
          <Card>
            <CardHeader>
              <CardTitle>Orders ({orders.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <ul className="space-y-4">
                  {orders.map((order) => (
                    <li key={order.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleString()}
                          </p>
                          {order.profile && (
                            <p className="text-sm mt-1">
                              👤 {order.profile?.name} • 📞 {order.profile?.phone || "N/A"}
                            </p>
                          )}
                        </div>

                        <div className="mt-2 md:mt-0 flex items-center space-x-2">
                          <Badge>{order.status}</Badge>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="border rounded px-2 py-1 text-sm"
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <ul className="ml-4 text-sm list-disc">
                        {order.order_items.map((item, idx) => (
                          <li key={idx}>
                            {item.product_name} × {item.quantity}
                          </li>
                        ))}
                      </ul>

                      <p className="mt-2 font-medium">Total: ₵{order.total}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}







// "use client";

// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// interface User {
//   id: string;
//   email: string;
//   created_at: string;
// }

// interface Order {
//   id: string;
//   created_at: string;
//   status: string;
//   total: number;
//   order_items: { product_name: string; quantity: number }[];
// }

// export default function AdminPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [usersRes, ordersRes] = await Promise.all([
//           fetch("/api/admin/users"),
//           fetch("/api/admin/orders"),
//         ]);

//         const usersData = await usersRes.json();
//         const ordersData = await ordersRes.json();

//         if (usersRes.ok) setUsers(usersData);
//         else toast.error(usersData.error || "Failed to load users");

//         if (ordersRes.ok) setOrders(ordersData);
//         else toast.error(ordersData.error || "Failed to load orders");
//       } catch (err) {
//         console.error(err);
//         toast.error("Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchData();
//   }, []);

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-3xl font-bold">Admin Dashboard</h1>

//       {loading && <p>Loading...</p>}

//       {!loading && (
//         <>
//           {/* Users Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Users ({users.length})</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {users.length === 0 ? (
//                 <p>No users found.</p>
//               ) : (
//                 <ul className="space-y-2">
//                   {users.map((u) => (
//                     <li key={u.id} className="flex justify-between border-b pb-2">
//                       <span>{u.email}</span>
//                       <span className="text-sm text-gray-500">
//                         Joined: {new Date(u.created_at).toLocaleDateString()}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </CardContent>
//           </Card>

//           {/* Orders Section */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Orders ({orders.length})</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {orders.length === 0 ? (
//                 <p>No orders found.</p>
//               ) : (
//                 <ul className="space-y-2">
//                   {orders.map((order) => (
//                     <li key={order.id} className="border-b pb-2">
//                       <div className="flex justify-between">
//                         <div>
//                           <p>Order #{order.id}</p>
//                           <p className="text-sm text-gray-500">
//                             {new Date(order.created_at).toLocaleString()}
//                           </p>
//                         </div>
//                         <Badge>{order.status}</Badge>
//                       </div>
//                       <ul className="ml-4 text-sm">
//                         {order.order_items.map((item, idx) => (
//                           <li key={idx}>
//                             {item.product_name} × {item.quantity}
//                           </li>
//                         ))}
//                       </ul>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </CardContent>
//           </Card>
//         </>
//       )}
//     </div>
//   );
// }
