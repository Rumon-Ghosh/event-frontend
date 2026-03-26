"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { TUser } from "@/types/User";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UsersManage = () => {
  const axiosSecure = useAxiosSecure();
  const [allUsers, setAllUsers] = useState<TUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [refetch, setRefetch] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/users");
        if (res.data.success) {
          setAllUsers(res.data.data);
        }
      } catch (error: any) {
        setError("Error on fetching users.");
        console.log("Error fetch user:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure, refetch]);

  const handleToggleUserStatus = async (user: TUser) => {
    setIsStatusUpdating(true);
    try {
      const res = await axiosSecure.patch(`/users/${user._id}`, { isActive: !user?.isActive });
      if (res.data.success) {
        setRefetch(!refetch);
        toast.success(res.data.message);
      }
    } catch (err: any) {
      setError("Error on changing user status.");
      console.log(err.message)
    } finally {
      setIsStatusUpdating(false);
    }
  }

  const handleDeleteUser = async (user: TUser) => {
    setIsDeleting(true);
    try {
      const res = await axiosSecure.delete(`/users/${user._id}`);
      if (res.data.success) {
        setRefetch(!refetch);
        toast.success(res.data.message);
      }
    } catch (err: any) {
      setError("Error on deleting user.");
      console.log(err.message)
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
          Total users: {allUsers.length}
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
                    <th>{index + 1}</th>
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
    </div>
  );
};

export default UsersManage;
