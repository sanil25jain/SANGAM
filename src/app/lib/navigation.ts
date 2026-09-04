import {
  LayoutDashboard,
  FolderKanban,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  CalendarCheck,
  Landmark,
  MessageSquareWarning,
  Bot,
  Settings,
  HelpCircle,
} from "lucide-react";

export const navigation = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Project Management",
    items: [
      {
        title: "Projects",
        href: "/projects",
        icon: FolderKanban,
      },
      {
        title: "Approvals",
        href: "/approvals",
        icon: ClipboardCheck,
      },
      {
        title: "Documents",
        href: "/documents",
        icon: FileText,
      },
    ],
  },
  {
    label: "Compliance",
    items: [
      {
        title: "Compliance",
        href: "/compliance",
        icon: ShieldCheck,
      },
      {
        title: "Inspections",
        href: "/inspections",
        icon: CalendarCheck,
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        title: "Government Schemes",
        href: "/schemes",
        icon: Landmark,
      },
      {
        title: "Grievances",
        href: "/grievances",
        icon: MessageSquareWarning,
      },
      {
        title: "AI Assistant",
        href: "/assistant",
        icon: Bot,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
      {
        title: "Help & Support",
        href: "/help",
        icon: HelpCircle,
      },
    ],
  },
] as const;