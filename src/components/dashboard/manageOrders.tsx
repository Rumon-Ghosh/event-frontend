"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { TOrders } from "@/types/Orders";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageOrders = () => {
  const [orders, setOrders] = useState<TOrders[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const axiosSecure = useAxiosSecure();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(`/orders?page=${currentPage}&limit=${limit}`);
      setOrders(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalOrders(response.data.totalOrders);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, limit]);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const response = await axiosSecure.put(`/orders/${id}/status`, {
        orderStatus: status,
      });
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: `Order ${status}!`,
          showConfirmButton: false,
          timer: 1500,
        });
        fetchOrders(); // Refresh the list
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-300">Manage Orders</h1>
          <p className="text-sm text-gray-400 mt-1">
            Review and manage all customer event bookings
          </p>
        </div>
        <div className="badge badge-primary font-semibold py-3 px-4">
          Total Orders: {totalOrders}
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th>User</th>
              <th>Event</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-700">
                        {(order.user as any)?.name || "N/A"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {(order.user as any)?.email || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="font-medium text-gray-700">
                      {order.event?.title || "N/A"}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-ghost font-medium">
                      {order.quantity}
                    </span>
                  </td>
                  <td className="font-bold text-gray-800">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td>
                    <div
                      className={`badge badge-sm font-semibold capitalize ${order.orderStatus === "confirmed"
                          ? "badge-success text-white"
                          : order.orderStatus === "cancelled"
                            ? "badge-error text-white"
                            : "badge-warning text-white"
                        }`}
                    >
                      {order.orderStatus}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {order.orderStatus === "pending" && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(order._id, "confirmed")}
                            className="btn btn-xs btn-success text-white"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(order._id, "cancelled")}
                            className="btn btn-xs btn-error text-white"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {order.orderStatus !== "pending" && (
                        <span className="text-xs text-gray-400 italic">No Actions</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-500">
                  No orders found in the database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="join shadow-sm">
            <button
              className="join-item btn btn-outline btn-sm md:btn-md"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              « Prev
            </button>
            <button className="join-item btn btn-outline btn-sm md:btn-md no-animation cursor-default">
              Page {currentPage} of {totalPages}
            </button>
            <button
              className="join-item btn btn-outline btn-sm md:btn-md"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
