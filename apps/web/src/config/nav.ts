import {
  Banknote,
  Bot,
  BriefcaseBusiness,
  ClipboardCheck,
  FileBarChart,
  GraduationCap,
  LayoutDashboard,
  MessageSquareText,
  type LucideIcon,
  Moon,
  Settings,
  Users,
  UtensilsCrossed,
} from "lucide-react";

export type NavItem = { label: string; href: string; icon: LucideIcon };

// Direktor sidebar tartibi — PLAN.md 5-bo'lim
export const directorNav: NavItem[] = [
  { label: "Bosh sahifa", href: "/", icon: LayoutDashboard },
  { label: "O'quvchilar", href: "/oquvchilar", icon: GraduationCap },
  { label: "O'qituvchilar", href: "/oqituvchilar", icon: Users },
  { label: "Xodimlar", href: "/xodimlar", icon: BriefcaseBusiness },
  { label: "Moliya", href: "/moliya", icon: Banknote },
  { label: "Yotoqxona", href: "/yotoqxona", icon: Moon },
  { label: "Oshxona", href: "/oshxona", icon: UtensilsCrossed },
  { label: "Testlar", href: "/testlar", icon: ClipboardCheck },
  { label: "AI Markaz", href: "/ai-markaz", icon: Bot },
  { label: "AI Xodim hisobotlari", href: "/ai-xodim", icon: FileBarChart },
  { label: "Sozlamalar", href: "/sozlamalar", icon: Settings },
];

// Faqat dizayn bosqichi uchun sahifalar (PLAN tartibiga kirmaydi, sidebar pastida alohida)
export const designNav: NavItem[] = [
  { label: "Xabar namunalari", href: "/xabar-namunalari", icon: MessageSquareText },
];
