"use client";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Summary {
  totalEvents: number;
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
}

interface MonthlyData {
  month: string;
  orders: number;
  revenue: number;
}

interface StatusData {
  status: string;
  count: number;
}

interface TopEvent {
  title: string;
  bookings: number;
}

interface AnalyticsData {
  summary: Summary;
  monthlyData: MonthlyData[];
  ordersByStatus: StatusData[];
  topEvents: TopEvent[];
}

// ─── Config ───────────────────────────────────────────────────────────────────
const STATUS_COLORS: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#10b981",
  cancelled: "#ef4444",
};
const FALLBACK_COLORS = ["#6366f1", "#f59e0b", "#ef4444"];

const STAT_CARDS = [
  { key: "totalEvents",  label: "Total Events",  icon: "🎫", color: "from-violet-500 to-purple-600" },
  { key: "totalOrders",  label: "Total Orders",  icon: "📦", color: "from-sky-500 to-blue-600" },
  { key: "totalRevenue", label: "Total Revenue", icon: "💰", color: "from-emerald-500 to-teal-600", isCurrency: true },
  { key: "totalUsers",   label: "Total Users",   icon: "👥", color: "from-rose-500 to-pink-600" },
];

// ─── Component ────────────────────────────────────────────────────────────────
const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get("/analytics");
        if (res.data.success) setData(res.data.data);
        else setError(res.data.message || "Failed to load analytics.");
      } catch (e: any) {
        setError(e?.response?.data?.message || "Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [axiosSecure]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="bg-red-50 text-red-500 px-6 py-4 rounded-lg shadow-sm">{error}</div>
      </div>
    );

  if (!data) return null;

  const { summary, monthlyData, ordersByStatus, topEvents } = data;

  return (
    <div className="space-y-8 p-2">
      {/* ── Header ── */}
      <div>
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <p className="text-sm text-base-content/60 mt-1">Platform analytics at a glance</p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ key, label, icon, color, isCurrency }) => {
          const raw = summary[key as keyof Summary];
          const value = isCurrency
            ? `$${Number(raw).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : Number(raw).toLocaleString();
          return (
            <div
              key={key}
              className={`rounded-2xl p-5 text-white bg-linear-to-br ${color} shadow-lg flex flex-col gap-2`}
            >
              <span className="text-3xl">{icon}</span>
              <p className="text-sm font-medium opacity-90">{label}</p>
              <p className="text-2xl font-bold tracking-tight">{value}</p>
            </div>
          );
        })}
      </div>

      {/* ── Line + Bar charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue over time */}
        <div className="rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <h3 className="font-semibold mb-4 text-base-content">Revenue — Last 6 Months</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(v: any) => [`$${Number(v || 0).toFixed(2)}`, "Revenue"]} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders over time */}
        <div className="rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <h3 className="font-semibold mb-4 text-base-content">Orders — Last 6 Months</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="orders" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Pie + Top Events ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders by status */}
        <div className="rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <h3 className="font-semibold mb-4 text-base-content">Orders by Status</h3>
          {ordersByStatus.length === 0 ? (
            <p className="text-sm text-base-content/50 text-center py-10">No orders yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={ordersByStatus}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ status, percent }: any) =>
                    `${status} (${((percent || 0) * 100).toFixed(0)}%)`
                  }
                  labelLine={false}
                >
                  {ordersByStatus.map((entry, i) => (
                    <Cell
                      key={entry.status}
                      fill={STATUS_COLORS[entry.status] ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(v: any) => [v, "Orders"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top 5 events */}
        <div className="rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm">
          <h3 className="font-semibold mb-4 text-base-content">Top 5 Events by Bookings</h3>
          {topEvents.length === 0 ? (
            <p className="text-sm text-base-content/50 text-center py-10">No booking data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                layout="vertical"
                data={topEvents}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.08} />
                <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="title"
                  tick={{ fontSize: 11 }}
                  width={120}
                  tickFormatter={(t: any) => (String(t).length > 16 ? String(t).slice(0, 15) + "…" : String(t))}
                />
                <Tooltip />
                <Bar dataKey="bookings" fill="#f59e0b" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
