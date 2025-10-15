"use client";

import { useEffect } from "react";
import { trackUTMParams } from "@/lib/utm-tracking";

export default function UTMTracker() {
  useEffect(() => {
    // 마운트 시 한 번만 UTM 파라미터 추적
    trackUTMParams();
  }, []);

  return null;
}
