"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { TOrders } from "@/types/Orders";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

const Orders = () => {
  const axiosSecure = useAxiosSecure();
  const [myOrders, setMyOrders] = useState<TOrders[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const ordersFunc = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/orders/my-orders");
        setMyOrders(res.data.data);
      } catch (err: any) {
        setError("My Orders Cannot Fetch.");
        console.log("Error on fetching my orders", err.message);
      } finally {
        setLoading(false);
      }
    };
    ordersFunc();
  }, [refresh, axiosSecure]);

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await axiosSecure.delete(`/orders/${orderId}`);
      setRefresh((prev) => !prev); // Trigger a refresh to re-fetch orders
      // Remove the deleted order from the state
      setMyOrders(myOrders.filter((order) => order._id !== orderId));
    } catch (err: any) {
      setError("Failed to delete order.");
      console.log("Error on deleting order", err.message);
    }
  };


  if (error)
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="bg-red-50 text-red-500 px-6 py-4 rounded-lg shadow-sm">
          {error}
        </div>
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );

  return <div>
    <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
    {myOrders.length === 0 ? (
      <p className="text-gray-500">You have no orders yet.</p>  
    ) : (
      <div className="space-y-4">
        {myOrders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-500">Event Name: {order.event.title}</h3>
              <p className="text-gray-500">Order ID: {order._id}</p>
              <p className="text-gray-500">Quantity: {order.quantity}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-500">Total: ${order.totalPrice.toFixed(2)}</p>
              <button
                onClick={() => handleDeleteOrder(order._id)}
                className="btn btn-primary">Delete</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>;
};

export default Orders;
