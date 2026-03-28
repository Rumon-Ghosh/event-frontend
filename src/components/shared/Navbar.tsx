"use client";
import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import NavLink from "./NavLink";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink href="/">Home</NavLink>
              </li>
              <li>
                <NavLink href="/explore">Explore</NavLink>
              </li>
              <li>
                <NavLink href="/about">About</NavLink>
              </li>
              <li>
                <NavLink href="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink href="/contact">Contact</NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <a>Dashboard</a>
                    <ul className="p-2">
                      <li>
                        <NavLink href="/dashboard">Dashboard</NavLink>
                      </li>
                      <li>
                        <NavLink href="/dashboard/profile">Profile</NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Logo></Logo>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink href="/explore">Explore</NavLink>
            </li>
            <li>
              <NavLink href="/about">About</NavLink>
            </li>
            <li>
              <NavLink href="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink href="/contact">Contact</NavLink>
            </li>
            {user && (
              <>
                <li>
                  <details>
                    <summary>Dashboard</summary>
                    <ul className="p-2 bg-base-100 w-40 z-1">
                      <li>
                        <NavLink href="/dashboard">Dashboard</NavLink>
                      </li>
                      <li>
                        <NavLink href="/dashboard/profile">Profile</NavLink>
                      </li>
                    </ul>
                  </details>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {user ? (
            <>
              <span className="text-sm hidden sm:inline font-bold">
                {user?.name}
              </span>
              <button onClick={logout} className="btn btn-primary">
                Logout
              </button>
            </>
          ) : (
            <Link href={`/login`}>
              <button className="btn btn-primary">Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
