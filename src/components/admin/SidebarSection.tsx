"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Globe,
  MessageSquare,
  BookOpen,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import type { ISidebarProps, ISidebarItem } from "@/types/AdminTypes";

// Workspace
const workspaceItems: ISidebarItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
];

// Content
const contentItems: ISidebarItem[] = [
  {
    label: "Website",
    icon: Globe,
    href: "/admin/pages/website",
  },
];

// Management
const managementItems: ISidebarItem[] = [
  {
    label: "Blog Management",
    icon: BookOpen,
    href: "/admin/pages/blog",
  },
];

export default function AdminSidebar({
  activeItem,
  onNavigate,
  onLogout,
  collapsed: externalCollapsed,
  onToggleCollapse,
}: ISidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  // States
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Collapse state
  const isCollapsed =
    externalCollapsed !== undefined
      ? externalCollapsed
      : internalCollapsed;

  const toggleCollapse =
    onToggleCollapse ??
    (() => setInternalCollapsed((value) => !value));

  const expanded = mobileOpen || !isCollapsed;

  // Close mobile sidebar after navigation
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMobileOpen(false);
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  // Navigation
  const selectItem = (item: ISidebarItem) => {
    onNavigate?.(item.label);

    if (pathname !== item.href) {
      router.push(item.href);
    }

    setMobileOpen(false);
  };

  // Active route
  const isActive = (item: ISidebarItem) => {
    return (
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`) ||
      (activeItem === item.label && pathname === item.href)
    );
  };

  // Render navigation sections
  const renderSection = (
    title: string,
    items: ISidebarItem[]
  ) => (
    <section key={title} className="space-y-1">
      {expanded && (
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
          {title}
        </p>
      )}

      <div className="space-y-1">
        {items.map(({ label, icon: Icon, href }) => {
          const active = isActive({ label, icon: Icon, href });

          return (
            <button
              key={label}
              type="button"
              title={!expanded ? label : undefined}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              onClick={() =>
                selectItem({ label, icon: Icon, href })
              }
              className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left transition-colors ${
                active
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/50 hover:bg-white/[0.06] hover:text-white"
              } ${!expanded ? "justify-center px-0" : ""}`}
            >
              <Icon
                size={20}
                strokeWidth={1.8}
                className="shrink-0"
              />

              {expanded && (
                <span className="truncate text-[13px]">
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-label={
          mobileOpen ? "Close sidebar" : "Open sidebar"
        }
        aria-expanded={mobileOpen}
        className="fixed left-4 top-4 z-[70] flex h-10 w-10 items-center justify-center rounded-xl bg-[#303030] text-white shadow-lg lg:hidden"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[50] bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex shrink-0 flex-col border-r border-white/[0.04] bg-[#292929] text-white transition-[width,transform] duration-300 ease-in-out
          ${
            isCollapsed
              ? "lg:w-[84px]"
              : "lg:w-[260px]"
          }
          ${
            mobileOpen
              ? "w-[260px] translate-x-0"
              : "w-[260px] -translate-x-full lg:translate-x-0"
          }
          lg:sticky lg:top-0 lg:left-auto lg:inset-y-auto lg:h-screen
        `}
      >
        {/* Brand and Collapse */}
        <div
          className={`relative flex h-[76px] shrink-0 items-center border-b border-white/[0.06] px-4 ${
            expanded ? "justify-between" : "justify-center"
          }`}
        >
          {expanded && (
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold tracking-tight">
                Admin Panel
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={toggleCollapse}
            aria-label={
              isCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            title={
              isCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
            className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white lg:flex ${
              expanded ? "" : "absolute inset-0 m-auto"
            }`}
          >
            {isCollapsed ? (
              <ChevronRight size={19} />
            ) : (
              <ChevronLeft size={19} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Admin navigation"
          className="flex-1 space-y-6 overflow-y-auto overflow-x-hidden px-3 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {renderSection("Workspace", workspaceItems)}

          {renderSection("Content", contentItems)}

          {renderSection("Management", managementItems)}
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t border-white/[0.06] p-3">
          <button
            type="button"
            onClick={() => {
              if (onLogout) {
                onLogout();
              } else {
                window.alert(
                  "Connect your authentication logout function."
                );
              }
            }}
            title={!expanded ? "Log out" : undefined}
            aria-label="Log out"
            className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-white/50 transition-colors hover:bg-red-500/10 hover:text-red-300 ${
              !expanded ? "justify-center px-0" : ""
            }`}
          >
            <LogOut size={19} strokeWidth={1.8} />

            {expanded && (
              <span className="text-[13px] font-medium">
                Log out
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}