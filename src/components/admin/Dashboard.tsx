"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ExternalLink,
  TrendingUp,
  Eye,
  MessageSquare,
  FolderGit2,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Search,
  Filter,
  Plus,
  Globe,
  ChartNoAxesCombined,
  BookOpen,
  Settings as SettingsIcon,
  ShieldCheck,
  Bell,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  time: string;
  status: "New" | "Replied" | "In Review";
};

const initialInquiries: Inquiry[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    email: "aarav.sharma@techstudio.in",
    subject: "Full-Stack Portfolio & Web App Redesign",
    message: "Hi Lucky, we loved your portfolio and would like to discuss a freelance web project.",
    time: "10 mins ago",
    status: "New",
  },
  {
    id: "2",
    name: "Elena Rostova",
    email: "elena@designcraft.io",
    subject: "Next.js & Design System Contract",
    message: "Looking for an experienced engineer to build out our design system components.",
    time: "2 hours ago",
    status: "New",
  },
  {
    id: "3",
    name: "Michael Chen",
    email: "m.chen@venturelabs.co",
    subject: "Frontend Architect Role Discussion",
    message: "We came across your GitHub and portfolio. Let's schedule a 15-minute quick sync.",
    time: "Yesterday",
    status: "In Review",
  },
  {
    id: "4",
    name: "Priya Patel",
    email: "priya@digitalspark.dev",
    subject: "Portfolio collaboration & consulting",
    message: "Interested in hiring you for a 2-month frontend sprint starting next month.",
    time: "3 days ago",
    status: "Replied",
  },
];

const projectsData = [
  { name: "Portfolio V3", status: "Live", views: "14.2k", tech: "Next.js 16, Tailwind, Framer" },
  { name: "SaaS Admin Dashboard", status: "Live", views: "8.9k", tech: "React 19, TypeScript" },
  { name: "AI Design Companion", status: "In Progress", views: "3.4k", tech: "Next.js, Tailwind v4" },
  { name: "E-Commerce Microservices", status: "Completed", views: "5.1k", tech: "Node.js, Postgres" },
];

export default function Dashboard() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [inquiries] = useState<Inquiry[]>(initialInquiries);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_auth");
    }
    router.push("/admin");
  };

  const filteredInquiries = inquiries.filter(
    (inq) =>
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#141316] text-white">
      {/* Sidebar */}
      <AdminSidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        onLogout={handleLogout}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />

      {/* Main Content Area */}
      <div
        className={`min-h-screen transition-[padding] duration-300 ease-in-out ${
          collapsed ? "lg:pl-[84px]" : "lg:pl-[260px]"
        }`}
      >
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-white/[0.06] bg-[#141316]/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-white">
              {activeItem}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live System
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <Globe size={14} />
              <span>View Portfolio</span>
              <ExternalLink size={12} className="text-white/40" />
            </a>

            <div className="flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-xs font-semibold text-white">
              L
            </div>
          </div>
        </header>

        {/* Dynamic Page Views */}
        <main className="p-6 md:p-8 space-y-8">
          {activeItem === "Dashboard" && (
            <>
              {/* Welcome Banner */}
              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-r from-white/[0.06] via-white/[0.02] to-transparent p-6 sm:p-8">
                <div className="relative z-10 max-w-2xl space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
                    <Sparkles size={13} className="text-amber-400" />
                    <span>Admin Control Center</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    Welcome back, Lucky 👋
                  </h2>
                  <p className="text-sm text-white/60 leading-relaxed">
                    Your portfolio is currently live and performing smoothly. You have{" "}
                    <span className="text-white font-medium">2 unread contact messages</span> and{" "}
                    <span className="text-white font-medium">14.2k active views</span> this month.
                  </p>
                </div>

                {/* Subtle gradient background glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/[0.03] blur-3xl" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:border-white/15">
                  <div className="flex items-center justify-between text-white/50">
                    <span className="text-xs font-medium uppercase tracking-wider">Total Views</span>
                    <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <Eye size={18} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold tracking-tight">24,580</span>
                    <span className="flex items-center text-xs font-medium text-emerald-400">
                      <TrendingUp size={12} className="mr-0.5" /> +14.2%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/40">Across all portfolio versions</p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:border-white/15">
                  <div className="flex items-center justify-between text-white/50">
                    <span className="text-xs font-medium uppercase tracking-wider">Inquiries</span>
                    <div className="flex size-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                      <MessageSquare size={18} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold tracking-tight">32</span>
                    <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
                      2 New
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/40">From contact form</p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:border-white/15">
                  <div className="flex items-center justify-between text-white/50">
                    <span className="text-xs font-medium uppercase tracking-wider">Projects</span>
                    <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                      <FolderGit2 size={18} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold tracking-tight">6</span>
                    <span className="text-xs text-emerald-400 font-medium">All Live</span>
                  </div>
                  <p className="mt-1 text-xs text-white/40">Showcased on main page</p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:border-white/15">
                  <div className="flex items-center justify-between text-white/50">
                    <span className="text-xs font-medium uppercase tracking-wider">Avg. Time</span>
                    <div className="flex size-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                      <Clock size={18} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-2xl font-bold tracking-tight">3m 24s</span>
                    <span className="flex items-center text-xs font-medium text-emerald-400">
                      <TrendingUp size={12} className="mr-0.5" /> +28s
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/40">High engagement rate</p>
                </div>
              </div>

              {/* Two Column Grid: Inquiries & Projects */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Recent Inquiries List */}
                <div className="lg:col-span-2 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold">Recent Inquiries</h3>
                      <p className="text-xs text-white/40">Messages received from your portfolio</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveItem("Contact Inquiries")}
                      className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition"
                    >
                      View all <ArrowUpRight size={13} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {inquiries.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-4 transition hover:bg-white/[0.04]"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white">{item.name}</span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                item.status === "New"
                                  ? "bg-amber-400/10 text-amber-300 border border-amber-400/20"
                                  : item.status === "In Review"
                                  ? "bg-blue-400/10 text-blue-300 border border-blue-400/20"
                                  : "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <p className="text-xs font-normal text-white/70">{item.subject}</p>
                          <p className="text-xs text-white/40 line-clamp-1">{item.message}</p>
                        </div>
                        <div className="text-right sm:shrink-0">
                          <span className="text-[11px] text-white/40">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects Overview */}
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 space-y-5">
                  <div>
                    <h3 className="text-base font-semibold">Featured Projects</h3>
                    <p className="text-xs text-white/40">Live status & views</p>
                  </div>

                  <div className="space-y-3">
                    {projectsData.map((project) => (
                      <div
                        key={project.name}
                        className="rounded-xl border border-white/[0.05] bg-white/[0.015] p-3.5 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">{project.name}</span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                            <CheckCircle2 size={12} /> {project.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-white/40">
                          <span>{project.tech}</span>
                          <span className="font-semibold text-white/70">{project.views} views</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* System Health */}
                  <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-3 text-xs flex items-center gap-3">
                    <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
                    <span className="text-white/80">Next.js App Router active and secured.</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Analytics View */}
          {activeItem === "Analytics" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                <h3 className="text-lg font-semibold">Visitor & Traffic Analytics</h3>
                <p className="text-xs text-white/40 mt-1">Detailed visitor telemetry across all sections</p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <span className="text-xs text-white/40">Top Source</span>
                    <p className="text-lg font-semibold mt-1">GitHub (48%)</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <span className="text-xs text-white/40">Top Device</span>
                    <p className="text-lg font-semibold mt-1">Desktop (64%)</p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <span className="text-xs text-white/40">Primary Geography</span>
                    <p className="text-lg font-semibold mt-1">India & US (72%)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Website View */}
          {activeItem === "Website" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                <h3 className="text-lg font-semibold">Portfolio Configuration</h3>
                <p className="text-xs text-white/40 mt-1">Manage public visibility and sections</p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <div>
                      <p className="text-sm font-medium">Public Portfolio Version</p>
                      <p className="text-xs text-white/40">Default view routed at /</p>
                    </div>
                    <span className="rounded-lg bg-white/10 px-3 py-1 text-xs font-semibold">Version 1 (V1)</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <div>
                      <p className="text-sm font-medium">Hero & Background Glow</p>
                      <p className="text-xs text-white/40">Animated dark theme effects</p>
                    </div>
                    <span className="text-xs text-emerald-400 font-semibold">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Inquiries View */}
          {activeItem === "Contact Inquiries" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">All Inquiries ({inquiries.length})</h3>
                    <p className="text-xs text-white/40">Manage and reply to clients</p>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      placeholder="Search inquiries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-9 pr-3 py-2 text-xs text-white outline-none placeholder:text-white/30 focus:border-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{inq.name}</span>
                          <span className="text-xs text-white/40 font-mono">({inq.email})</span>
                        </div>
                        <span className="text-[11px] text-white/40">{inq.time}</span>
                      </div>
                      <p className="text-xs font-medium text-white/80">{inq.subject}</p>
                      <p className="text-xs text-white/60 leading-relaxed">{inq.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Blog Management View */}
          {activeItem === "Blog Management" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Articles & Case Studies</h3>
                    <p className="text-xs text-white/40 mt-1">Manage technical writings and guides</p>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
                  >
                    <Plus size={14} /> New Post
                  </button>
                </div>

                <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.015] p-8 text-center text-white/50 text-xs">
                  No published blog posts yet. Click &quot;New Post&quot; to publish your first article.
                </div>
              </div>
            </div>
          )}

          {/* Settings View */}
          {activeItem === "Settings" && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Admin Settings</h3>
                  <p className="text-xs text-white/40 mt-1">Authentication & admin credentials</p>
                </div>

                <div className="space-y-4 max-w-xl">
                  <div>
                    <label className="text-xs font-medium text-white/60">Admin Phone Number</label>
                    <input
                      type="text"
                      disabled
                      value="+91 (Verified Admin)"
                      className="mt-1.5 h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-xs text-white/60"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-white/60">Session Status</label>
                    <div className="mt-1.5 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
                      <span className="text-white">Active Authenticated Admin</span>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/20"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
