"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { TOrders } from "@/types/Orders";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageOrders = () => {
  const [orders, setOrders] = useState<TOrders[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const axiosSecure = useAxiosSecure();

  const fetchOrders = useCallback(
    async (signal?: AbortSignal) => {
      try {
        setLoading(true);
        const response = await axiosSecure.get(
          `/orders?page=${currentPage}&limit=${limit}`,
          {
            signal,
          },
        );
        setOrders(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalOrders(response.data.totalOrders);
        setError("");
      } catch (error: any) {
        if (error.name === "CanceledError" || error.name === "AbortError") {
          return;
        }
        console.log("Error fetching orders:", error);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    },
    [axiosSecure, currentPage, limit],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchOrders(controller.signal);
    return () => {
      controller.abort();
    };
  }, [fetchOrders]);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      setIsStatusUpdating(true);
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
        fetchOrders(); // Now successfully calls the stable fetchOrders
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      setIsStatusUpdating(false);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="bg-red-50 text-red-500 px-6 py-4 rounded-lg shadow-sm">
          {error}
        </div>
      </div>
    );
  }

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

      <div className="overflow-x-auto rounded-xl shadow-sm border border-gray-100">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="text-gray-300 uppercase text-xs font-semibold">
            <tr>
              <th>#</th>
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
              orders.map((order, index) => (
                <tr key={order._id} className="">
                  <td>{(currentPage - 1) * limit + index + 1}</td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-400">
                        {(order.user as any)?.name || "N/A"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {(order.user as any)?.email || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="font-medium text-gray-400">
                      {order.event?.title || "N/A"}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-ghost font-medium">
                      {order.quantity}
                    </span>
                  </td>
                  <td className="font-bold text-gray-300">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td>
                    <div
                      className={`badge badge-sm font-semibold capitalize ${
                        order.orderStatus === "confirmed"
                          ? "badge-success"
                          : order.orderStatus === "cancelled"
                            ? "badge-error"
                            : "badge-warning"
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
                            onClick={() =>
                              handleStatusUpdate(order._id, "confirmed")
                            }
                            disabled={isStatusUpdating}
                            className="btn btn-xs btn-success"
                          >
                            {isStatusUpdating ? "..." : "Approve"}
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(order._id, "cancelled")
                            }
                            disabled={isStatusUpdating}
                            className="btn btn-xs btn-error text-white"
                          >
                            {isStatusUpdating ? "..." : "Cancel"}
                          </button>
                        </>
                      )}
                      {order.orderStatus !== "pending" && (
                        <span className="text-xs text-gray-300 italic">
                          No Actions
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-gray-300">
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
