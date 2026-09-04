"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Landmark,
} from "lucide-react";

import { navigation } from "../../../lib/navigation";
import { cn } from "../../../lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)] shadow-sm">
            <Landmark
              className="h-5 w-5 text-white"
              strokeWidth={2}
            />
          </div>

          <div>
            <div className="text-lg font-bold tracking-tight text-slate-950">
              SANGAM
            </div>

            <div className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              GovTech Platform
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <div className="space-y-6">
          {navigation.map((section) => (
            <div key={section.label}>
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                {section.label}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-slate-100 text-[var(--primary)]"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" />

                      <span>{item.title}</span>

                      {item.title === "AI Assistant" && (
                        <span className="ml-auto rounded-full bg-[var(--primary)] px-1.5 py-0.5 text-[9px] font-bold text-white">
                          AI
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Organization */}
      <div className="border-t border-slate-200 p-3">
        <button className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-slate-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
            SJ
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">
              Sanil Jain
            </p>

            <p className="truncate text-xs text-slate-500">
              ABC Foods Pvt. Ltd.
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </aside>
  );
}