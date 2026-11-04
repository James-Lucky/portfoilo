import type { ElementType } from "react";

// Sidebar
export interface ISidebarProps {
  activeItem?: string;
  onNavigate?: (item: string) => void;
  onLogout?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export interface ISidebarItem {
  label: string;
  icon: ElementType;
  href: string;
}

export interface ITestimonialData {
  text: string;
  name: string;
  role: string;
  avatar: string;
}

// 