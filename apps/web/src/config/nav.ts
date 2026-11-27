import {
  Backpack,
  CalendarDays,
  ClipboardList,
  Presentation,
  Banknote,
  Bot,
  BriefcaseBusiness,
  ClipboardCheck,
  FileBarChart,
  GraduationCap,
  LayoutDashboard,
  MessageSquareText,
  MessagesSquare,
  UsersRound,
  type LucideIcon,
  Moon,
  Settings,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { t } from "@/i18n";

export type NavItem = { label: string; href: string; icon: LucideIcon };

// Direktor sidebar tartibi — PLAN.md 5-bo'lim
export const directorNav: NavItem[] = [
  { label: t.nav.items.home, href: "/", icon: LayoutDashboard },
  { label: t.nav.items.students, href: "/oquvchilar", icon: GraduationCap },
  { label: t.nav.items.teachers, href: "/oqituvchilar", icon: Users },
  { label: t.nav.items.schedule, href: "/dars-jadvali", icon: CalendarDays },
  { label: t.nav.items.staff, href: "/xodimlar", icon: BriefcaseBusiness },
  { label: t.nav.items.finance, href: "/moliya", icon: Banknote },
  { label: t.nav.items.dorm, href: "/yotoqxona", icon: Moon },
  { label: t.nav.items.kitchen, href: "/oshxona", icon: UtensilsCrossed },
  { label: t.nav.items.tests, href: "/testlar", icon: ClipboardCheck },
  { label: t.nav.items.aiCenter, href: "/ai-markaz", icon: Bot },
  { label: t.nav.items.aiStaff, href: "/ai-xodim", icon: FileBarChart },
  { label: t.nav.items.settings, href: "/sozlamalar", icon: Settings },
];

// Maket: boshqa rollar ko'rinishi va dizayn sahifalari (PLAN tartibiga kirmaydi, sidebar pastida alohida).
// 2-bosqichda dev "rolni almashtirish" bilan almashtiriladi.
export const designNav: NavItem[] = [
  { label: t.nav.items.messageSamples, href: "/xabar-namunalari", icon: MessageSquareText },
  { label: t.nav.items.parentCabinet, href: "/ota-ona", icon: UsersRound },
  { label: t.nav.items.studentMentor, href: "/mentor", icon: MessagesSquare },
  { label: t.nav.items.teacherCabinet, href: "/oqituvchi", icon: Presentation },
  { label: t.nav.items.studentCabinet, href: "/oquvchi", icon: Backpack },
  { label: t.nav.items.zavuchCabinet, href: "/zavuch", icon: ClipboardList },
];
