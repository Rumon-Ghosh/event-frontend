"use client";
import { useAuth } from "@/providers/AuthProvider";
import React from "react";
import NavLink from "../shared/NavLink";

const DashBoardLinks = () => {
  const { user } = useAuth();
  return (
    <>
      <li>
        <NavLink href="/dashboard">Overview</NavLink>
      </li>
      {user?.role === "user" && (
        <>
          <li>
            <NavLink href="/dashboard/my-orders">My Orders</NavLink>
          </li>
        </>
      )}
      {user?.role === "organizer" && (
        <>
          <li>
            <NavLink href="/dashboard/create-event">Create Event</NavLink>
          </li>
          <li>
            <NavLink href="/dashboard/my-events">My Events</NavLink>
          </li>
        </>
      )}
      {user?.role === "admin" && (
        <>
          <li>
            <NavLink href="/dashboard/manage-users">Manage Users</NavLink>
          </li>
          <li>
            <NavLink href="/dashboard/manage-orders">Manage Orders</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink href="/dashboard/profile">Profile</NavLink>
      </li>
    </>
  );
};

export default DashBoardLinks;
