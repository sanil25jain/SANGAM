"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { AppSidebar } from "../components/layout/app-sidebar";
import { Topbar } from "../components/layout/topbar";
import { getCurrentUser } from "../lib/auth/auth-utils";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      router.replace("/login");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">
          Loading SANGAM...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AppSidebar />

      <div className="lg:pl-64">
        <Topbar />

        <main className="min-h-[calc(100vh-4rem)] p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}