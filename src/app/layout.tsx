import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SANGAM | Government Approvals & Compliance",
    template: "%s | SANGAM",
  },
  description:
    "SANGAM is an intelligent single-window platform for industrial approvals, compliance, inspections, renewals, and government schemes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}