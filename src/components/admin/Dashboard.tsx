
"use client";

import { useState } from "react";
import {
  LayoutGrid,
  CalendarDays,
  CreditCard,
  ChartNoAxesColumn,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

const navItems = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Calendar", icon: CalendarDays },
  { label: "Payments", icon: CreditCard },
  { label: "Analytics", icon: ChartNoAxesColumn },
  { label: "Messages", icon: MessageCircle },
  { label: "Notifications", icon: Bell },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
    <AdminSidebar />
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-label={mobileOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={mobileOpen}
        className="fixed left-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-xl bg-[#303030] text-white shadow-lg lg:hidden"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#303030] px-5 py-6 text-white transition-transform duration-300 lg:w-[88px] lg:items-center lg:px-0 ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="mb-12 flex h-10 items-center gap-3 lg:mb-14">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-2xl font-bold">
            N
          </div>

          <span className="text-lg font-semibold lg:hidden">
            Nikitin
          </span>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Admin navigation"
          className="flex flex-1 flex-col gap-3"
        >
          {navItems.map(({ label, icon: Icon }) => {
            const active = activeItem === label;

            return (
              <button
                key={label}
                type="button"
                title={label}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                onClick={() => {
                  setActiveItem(label);
                  setMobileOpen(false);
                }}
                className={`flex h-12 items-center gap-4 rounded-xl px-3 transition-colors lg:w-12 lg:justify-center lg:px-0 ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/45 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={21} strokeWidth={1.8} />
                <span className="text-sm lg:hidden">{label}</span>
              </button>
            );
          })}

          <div className="my-3 border-t border-white/10" />

          <button
            type="button"
            title="Settings"
            aria-label="Settings"
            onClick={() => {
              setActiveItem("Settings");
              setMobileOpen(false);
            }}
            className={`flex h-12 items-center gap-4 rounded-xl px-3 transition-colors lg:w-12 lg:justify-center lg:px-0 ${
              activeItem === "Settings"
                ? "bg-white/10 text-white"
                : "text-white/45 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Settings size={21} strokeWidth={1.8} />
            <span className="text-sm lg:hidden">Settings</span>
          </button>
        </nav>

        {/* Logout */}
        <button
          type="button"
          title="Log out"
          aria-label="Log out"
          className="mt-8 flex h-12 items-center gap-4 rounded-xl px-3 text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:w-12 lg:justify-center lg:px-0"
        >
          <LogOut size={21} strokeWidth={1.8} />
          <span className="text-sm lg:hidden">Log out</span>
        </button>
      </aside>
    </>
  );
}
