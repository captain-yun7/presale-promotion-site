"use client";

import { ReactNode } from "react";
import { FacebookPixel, GoogleAnalytics, NaverAnalytics } from "@/components/Analytics";
import UTMTracker from "@/components/UTMTracker";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GoogleAnalytics />
      <FacebookPixel />
      <NaverAnalytics />
      <UTMTracker />
      {children}
    </>
  );
}
