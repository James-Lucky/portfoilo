"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  IChartDataPoint,
  IDashboardMetric,
  IRecentUpdateItem,
  TAnalyticsRange,
  TUpdateCategory,
} from "@/types/PagesTypes";

const METRICS: IDashboardMetric[] = [
  {
    id: "views",
    label: "Total Portfolio Views",
    value: "24,890",
    change: "+14.2%",
    isPositive: true,
    helperText: "Compared to last month",
  },
  {
    id: "blogs",
    label: "Published Articles",
    value: "18",
    change: "+3 new",
    isPositive: true,
    helperText: "4 drafts pending review",
  },
  {
    id: "inquiries",
    label: "Client Inquiries",
    value: "32",
    change: "+8.5%",
    isPositive: true,
    helperText: "5 unread messages",
  },
  {
    id: "bounce",
    label: "Avg. Engagement Time",
    value: "2m 45s",
    change: "-1.8%",
    isPositive: false,
    helperText: "Across all portfolio pages",
  },
];

const ANALYTICS_DATA: Record<TAnalyticsRange, IChartDataPoint[]> = {
  "7d": [
    { label: "Mon", views: 420, visitors: 290 },
    { label: "Tue", views: 580, visitors: 390 },
    { label: "Wed", views: 510, visitors: 340 },
    { label: "Thu", views: 790, visitors: 520 },
    { label: "Fri", views: 690, visitors: 460 },
    { label: "Sat", views: 880, visitors: 610 },
    { label: "Sun", views: 940, visitors: 670 },
  ],
  "30d": [
    { label: "W1", views: 3200, visitors: 2100 },
    { label: "W2", views: 4100, visitors: 2850 },
    { label: "W3", views: 3800, visitors: 2600 },
    { label: "W4", views: 5200, visitors: 3700 },
  ],
  "6m": [
    { label: "Jun", views: 12400, visitors: 8200 },
    { label: "Jul", views: 15800, visitors: 10400 },
    { label: "Aug", views: 14200, visitors: 9600 },
    { label: "Sep", views: 18900, visitors: 12800 },
    { label: "Oct", views: 21500, visitors: 14900 },
    { label: "Nov", views: 24890, visitors: 17300 },
  ],
};

const RECENT_UPDATES: IRecentUpdateItem[] = [
  {
    id: "upd-1",
    title: "Published new article",
    description: "Next.js App Router Best Practices for Production",
    category: "blog",
    timestamp: "2 hours ago",
  },
  {
    id: "upd-2",
    title: "New project inquiry received",
    description: "Rohan Sharma inquired about SaaS MVP development",
    category: "inquiry",
    timestamp: "5 hours ago",
  },
  {
    id: "upd-3",
    title: "Website hero section updated",
    description: "Modified headline copy and featured case studies",
    category: "website",
    timestamp: "Yesterday",
  },
  {
    id: "upd-4",
    title: "Saved article draft",
    description: "Integrating AI Agents in SaaS Dashboards",
    category: "blog",
    timestamp: "2 days ago",
  },
];

const CATEGORY_BADGE_STYLES: Record<TUpdateCategory, string> = {
  blog: "bg-blue-50 text-blue-700 ring-blue-600/20",
  website: "bg-purple-50 text-purple-700 ring-purple-600/20",
  inquiry: "bg-amber-50 text-amber-700 ring-amber-600/20",
};

export default function DashboardPage() {
  const [range, setRange] = useState<TAnalyticsRange>("7d");

  const chartPoints = ANALYTICS_DATA[range];

  const maxChartValue = useMemo(() => {
    return Math.max(...chartPoints.map((d) => d.views), 1);
  }, [chartPoints]);

  return (
    <main className="min-h-screen w-full bg-[#f4f4f4] px-4 py-6 sm:px-6 md:p-8">
      <div className="mx-auto w-full max-w-7xl space-y-6 md:space-y-8">
        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-xs text-gray-500 sm:text-sm">
              <span>Workspace</span>
              <span>/</span>
              <span className="font-medium text-gray-800">Overview</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              Welcome to your portfolio management dashboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/admin/pages/website"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Edit Website
            </Link>
            <Link
              href="/admin/pages/blog"
              className="rounded-lg bg-[#262626] px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
            >
              + New Article
            </Link>
          </div>
        </div>

        {/* KPI Metric Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric) => (
            <div
              key={metric.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs transition hover:border-gray-300"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-gray-500 sm:text-sm">
                  {metric.label}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    metric.isPositive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {metric.change}
                </span>
              </div>

              <p className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                {metric.value}
              </p>

              <p className="mt-1.5 text-xs text-gray-400">{metric.helperText}</p>
            </div>
          ))}
        </section>

        {/* Analytics & Recent Updates Grid */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Traffic & Engagement Analytics (2 Columns on Desktop) */}
          <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                  Portfolio Analytics
                </h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  Page views vs unique visitors across your portfolio.
                </p>
              </div>

              {/* Range Switcher */}
              <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
                {(["7d", "30d", "6m"] as TAnalyticsRange[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setRange(item)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium uppercase transition ${
                      range === item
                        ? "bg-white text-gray-900 shadow-2xs"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar Chart Body */}
            <div className="p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-5 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#262626]" />
                  <span>Total Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-xs bg-gray-300" />
                  <span>Unique Visitors</span>
                </div>
              </div>

              <div className="flex h-60 items-end justify-between gap-3 pt-6 sm:gap-6">
                {chartPoints.map((point) => {
                  const viewsHeight = Math.round(
                    (point.views / maxChartValue) * 100
                  );
                  const visitorsHeight = Math.round(
                    (point.visitors / maxChartValue) * 100
                  );

                  return (
                    <div
                      key={point.label}
                      className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
                    >
                      <div className="relative flex h-full w-full max-w-[48px] items-end justify-center gap-1 sm:gap-1.5">
                        {/* Tooltip on hover */}
                        <div className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-[10px] font-medium whitespace-nowrap text-white opacity-0 shadow-sm transition group-hover:opacity-100">
                          {point.views} views
                        </div>

                        {/* Views Bar */}
                        <div
                          style={{ height: `${viewsHeight}%` }}
                          className="w-full rounded-t-md bg-[#262626] transition-all duration-300 group-hover:bg-black"
                        />

                        {/* Visitors Bar */}
                        <div
                          style={{ height: `${visitorsHeight}%` }}
                          className="w-full rounded-t-md bg-gray-300 transition-all duration-300 group-hover:bg-gray-400"
                        />
                      </div>

                      <span className="text-xs font-medium text-gray-500">
                        {point.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart Footer Summary */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 bg-gray-50/70 px-5 py-3 text-xs text-gray-500 sm:px-6">
              <span>Top traffic source: Direct & LinkedIn (64%)</span>
              <span className="font-medium text-gray-700">
                Updated just now
              </span>
            </div>
          </div>

          {/* Recent Updates Activity Feed */}
          <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
            <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                Recent Updates
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Latest actions across website and blog.
              </p>
            </div>

            <div className="divide-y divide-gray-100 px-5 py-2 sm:px-6">
              {RECENT_UPDATES.map((item) => (
                <div key={item.id} className="py-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium capitalize ring-1 ring-inset ${
                        CATEGORY_BADGE_STYLES[item.category]
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.timestamp}
                    </span>
                  </div>

                  <p className="mt-1.5 text-sm font-medium text-gray-900">
                    {item.title}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-3 text-center sm:px-6">
              <Link
                href="/admin/pages/blog"
                className="text-xs font-medium text-gray-700 transition hover:text-black"
              >
                View all activity →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}