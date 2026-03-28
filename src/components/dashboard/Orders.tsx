"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { TOrders } from "@/types/Orders";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const Orders = () => {
  const axiosSecure = useAxiosSecure();
  const [myOrders, setMyOrders] = useState<TOrders[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false);
  const updateQuantityRef = useRef<HTMLDialogElement | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<TOrders | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      return error.message;
    }

    return "Unknown error";
  };

  useEffect(() => {
    const ordersFunc = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/orders/my-orders");
        setMyOrders(res.data.data);
      } catch (error: unknown) {
        setError("My Orders Cannot Fetch.");
        console.log("Error on fetching my orders", getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };
    ordersFunc();
  }, [refresh, axiosSecure]);

  const handleDeleteOrder = async (orderId: string) => {
    const result = await Swal.fire({
      title: "Delete this order?",
      text: "This order record will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await axiosSecure.delete(`/orders/${orderId}`);
      setRefresh((prev) => !prev);
    } catch (error: unknown) {
      setError("Failed to delete order.");
      console.log("Error on deleting order", getErrorMessage(error));
    }
  };

  const openUpdateModal = (order: TOrders) => {
    setSelectedOrder(order);
    setQuantity(order.quantity); // Set the current quantity in the state
    updateQuantityRef.current?.showModal();
  }

  const handleUpdateQuantity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/orders/${selectedOrder?._id}/quantity`, { quantity });
      
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Quantity has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      setRefresh((prev) => !prev);
      updateQuantityRef.current?.close();
    } catch (error: unknown) {
      setError("Failed to update order.");
      console.log("Error on updating order", getErrorMessage(error));
    }
  }


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
              <div className="flex gap-2">
                <button
                  onClick={() => openUpdateModal(order)}
                  className="btn btn-secondary">Update Quantity</button>
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="btn btn-primary">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
    {/* Open the modal using document.getElementById('ID').showModal() method */}
    {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
    <dialog id="my_modal_5" ref={updateQuantityRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form onSubmit={handleUpdateQuantity}>
          <label className="label" htmlFor="quantity">Quantity</label>
          <br />
          <input 
            className="input mt-2"
            type="number"
            value={quantity} 
            onChange={(e) => setQuantity(Number(e.target.value))} 
            id="quantity" 
          />
          <br />
          <button className="btn mt-2" type="submit">Update</button>
        </form>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>;
};

export default Orders;
