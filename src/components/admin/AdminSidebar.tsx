
"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  Globe,
  FolderKanban,
  UserRound,
  BriefcaseBusiness,
  MessageSquare,
  BookOpen,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Upload,
} from "lucide-react";

type SidebarProps = {
  activeItem?: string;
  onNavigate?: (item: string) => void;
  onLogout?: () => void;
};

const workspaceItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Analytics", icon: ChartNoAxesCombined },
];

const contentItems = [
  { label: "Website", icon: Globe },
];

const managementItems = [
  { label: "Contact Inquiries", icon: MessageSquare },
  { label: "Blog Management", icon: BookOpen },
  { label: "Settings", icon: Settings },
];

export default function AdminSidebar({
  activeItem,
  onNavigate,
  onLogout,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState(
    activeItem ?? "Dashboard",
  );
  const [avatar, setAvatar] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedItem = activeItem ?? internalSelected;
  const expanded = mobileOpen || !collapsed;

  useEffect(() => {
    return () => {
      if (avatar.startsWith("blob:")) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  const selectItem = (label: string) => {
    setInternalSelected(label);
    setMobileOpen(false);
    onNavigate?.(label);
  };

  const handleAvatarUpload = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const input = event.currentTarget;
    const file = input.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      window.alert("Please select a valid image.");
      input.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      window.alert("Please select an image smaller than 5 MB.");
      input.value = "";
      return;
    }

    setAvatar(URL.createObjectURL(file));
    input.value = "";
  };

  const renderSection = (
    title: string,
    items: typeof workspaceItems,
  ) => (
    <section key={title}>
      {expanded && (
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
          {title}
        </p>
      )}

      <div className="space-y-1">
        {items.map(({ label, icon: Icon }) => {
          const active = selectedItem === label;

          return (
            <button
              key={label}
              type="button"
              title={!expanded ? label : undefined}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              onClick={() => selectItem(label)}
              className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:bg-white/[0.06] hover:text-white"
              } ${!expanded ? "justify-center px-0" : ""}`}
            >
              <Icon
                size={20}
                strokeWidth={1.8}
                className="shrink-0"
              />

              {expanded && (
                <span className="truncate text-[13px] font-medium">
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
      {/* Mobile menu */}
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={mobileOpen}
        className="fixed left-4 top-4 z-[70] flex h-10 w-10 items-center justify-center rounded-xl bg-[#303030] text-white shadow-lg lg:hidden"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[50] bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex flex-col border-r border-white/[0.04] bg-[#292929] text-white transition-[width,transform] duration-300 ease-in-out ${
          collapsed ? "lg:w-[84px]" : "lg:w-[260px]"
        } ${
          mobileOpen
            ? "w-[260px] translate-x-0"
            : "w-[260px] -translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand and collapse control */}
        <div
          className={`relative flex h-[76px] shrink-0 items-center border-b border-white/[0.06] px-4 ${
            expanded ? "justify-between" : "justify-center"
          }`}
        >
          {expanded && (
            <div className="min-w-0">
              <p className="truncate text-lg font-semibold tracking-tight">
                Portfolio Management
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white lg:flex ${
              expanded
                ? ""
                : "absolute inset-0 m-auto"
            }`}
          >
            {collapsed ? (
              <ChevronRight size={19} />
            ) : (
              <ChevronLeft size={19} />
            )}
          </button>
        </div>

        {/* Profile image input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          className="hidden"
          aria-label="Choose profile photo"
        />

        {/* Navigation */}
        <nav
  aria-label="Admin navigation"
  className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-3 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
>
  {[
    ...workspaceItems,
    ...contentItems,
    ...managementItems,
  ].map(({ label, icon: Icon }) => {
    const active = selectedItem === label;

    return (
      <button
        key={label}
        type="button"
        title={!expanded ? label : undefined}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        onClick={() => selectItem(label)}
        className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left transition-colors ${
          active
            ? "bg-white/10 text-white"
            : "text-white/50 hover:bg-white/[0.06] hover:text-white"
        } ${!expanded ? "justify-center px-0" : ""}`}
      >
        <Icon
          size={20}
          strokeWidth={1.8}
          className="shrink-0"
        />

        {expanded && (
          <span className="truncate text-[13px] font-medium">
            {label}
          </span>
        )}
      </button>
    );
  })}
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
                  "Connect your authentication logout function.",
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
