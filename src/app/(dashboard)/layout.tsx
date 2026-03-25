import React from "react";
import Logo from "@/components/shared/Logo";
import NavLink from "@/components/shared/NavLink";

const dashboardLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/create-event", label: "Create Event" },
  { href: "/dashboard/my-orders", label: "My Orders" },
  { href: "/dashboard/my-events", label: "My Events" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex min-h-screen flex-col">
          <div className="navbar border-b border-base-300 bg-base-100 px-3 shadow-sm sm:px-4 lg:px-6">
            <div className="flex items-center gap-2 lg:hidden">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-ghost btn-square drawer-button"
                aria-label="Open dashboard navigation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1">
              <Logo />
            </div>
            <div className="badge badge-primary badge-outline badge-sm sm:badge-md">
              Dashboard
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-2 lg:px-4 py-3 lg:py-6">
            <main className="rounded-box border border-base-300 bg-base-100 p-3 shadow-sm lg:p-6">
              {children}
            </main>
          </div>
        </div>

        <div className="drawer-side z-40">
          <label
            htmlFor="dashboard-drawer"
            aria-label="Close dashboard navigation"
            className="drawer-overlay"
          ></label>
          <aside className="min-h-full w-72 border-r border-base-300 bg-base-100 p-4 shadow-xl lg:w-64 lg:shadow-none">
            <div className="mb-6">
              <Logo />
              <p className="mt-1 text-sm text-base-content/60">
                Manage your dashboard from any screen size.
              </p>
            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/50">
              Navigation
            </p>
            <ul className="menu w-full gap-1 rounded-box bg-base-100 p-0">
              {dashboardLinks.map((link) => (
                <li key={link.href}>
                  <NavLink href={link.href}>{link.label}</NavLink>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
