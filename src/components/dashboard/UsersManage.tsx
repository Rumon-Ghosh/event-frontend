"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { TUser } from "@/types/User";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UsersManage = () => {
  const axiosSecure = useAxiosSecure();
  const [allUsers, setAllUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [refetch, setRefetch] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) {
      return error.message;
    }

    return "Unknown error";
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/users?page=${currentPage}&limit=${limit}`, {
          signal: controller.signal,
        });
        if (res.data.success) {
          setAllUsers(res.data.data);
          setTotalPages(res.data.totalPages);
          setTotalUsers(res.data.totalUsers);
        }
      } catch (error: any) {
        if (error.name === "AbortError" || error.name === "CanceledError") {
          return;
        }
        setError("Error on fetching users.");
        console.log("Error fetch user:", getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();

    return () => {
      controller.abort();
    };
  }, [axiosSecure, refetch, currentPage, limit]);

  const handleToggleUserStatus = async (user: TUser) => {
    const result = await Swal.fire({
      title: `${user.isActive ? "Deactivate" : "Activate"} this user?`,
      text: `${user.name}'s access will be ${user.isActive ? "disabled" : "enabled"}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${user.isActive ? "deactivate" : "activate"}`,
      cancelButtonText: "Cancel",
      confirmButtonColor: user.isActive ? "#f59e0b" : "#16a34a",
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsStatusUpdating(true);
    try {
      const res = await axiosSecure.patch(`/users/${user._id}`, { isActive: !user?.isActive });
      if (res.data.success) {
        setRefetch((prev) => !prev);
        toast.success(res.data.message);
      }
    } catch (error: unknown) {
      setError("Error on changing user status.");
      console.log(getErrorMessage(error))
    } finally {
      setIsStatusUpdating(false);
    }
  }

  const handleDeleteUser = async (user: TUser) => {
    const result = await Swal.fire({
      title: "Delete this user?",
      text: `${user.name} will be permanently removed.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await axiosSecure.delete(`/users/${user._id}`);
      if (res.data.success) {
        setRefetch((prev) => !prev);
        toast.success(res.data.message);
      }
    } catch (error: unknown) {
      setError("Error on deleting user.");
      console.log(getErrorMessage(error))
    } finally {
      setIsDeleting(false);
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

  return (
    <div className="rounded-2xl border border-base-200 bg-base-100 p-4 shadow-sm md:p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Manage Users</h2>
        <p className="text-sm text-base-content/70">
          Total users: {totalUsers}
        </p>
      </div>

      {allUsers.length === 0 ? (
        <div className="rounded-xl border border-dashed border-base-300 px-6 py-10 text-center text-base-content/70">
          No users found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, index) => {

                return (
                  <tr key={user._id}>
                    <th>{(currentPage - 1) * limit + index + 1}</th>
                    <td>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-base-content/60">
                          {user._id}
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td className="capitalize">{user.role}</td>
                    <td>
                      <span
                        className={`badge ${user.isActive ? "badge-success" : "badge-warning"
                          }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleUserStatus(user)}
                          type="button"
                          disabled={isStatusUpdating}
                          className={`btn btn-sm ${user.isActive ? "btn-warning" : "btn-success"
                            }`}
                        >
                          {isStatusUpdating
                            ? "Updating..."
                            : user.isActive
                              ? "Deactivate"
                              : "Activate"}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          type="button"
                          disabled={isDeleting}
                          className="btn btn-sm btn-error"
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
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

export default UsersManage;
