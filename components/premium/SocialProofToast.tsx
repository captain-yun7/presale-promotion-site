"use client";

import { useState, useEffect, useRef } from "react";
import type { ThemeConfig } from "@/lib/types/project";

interface Props {
  theme: ThemeConfig;
  projectName: string;
}

const NAMES = [
  "김**", "이**", "박**", "최**", "정**", "강**", "조**", "윤**",
  "장**", "임**", "한**", "오**", "서**", "신**", "권**", "황**",
];

const AREAS = [
  "서울", "강남", "송파", "마포", "영등포", "강서", "성동",
  "경기", "분당", "일산", "수원", "인천", "부천",
];

const ACTIONS = [
  "상담신청을 완료했습니다",
  "방문예약을 신청했습니다",
  "관심고객 등록을 했습니다",
  "전화상담을 요청했습니다",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomMinutes(): string {
  const m = Math.floor(Math.random() * 25) + 1;
  return `${m}분 전`;
}

export default function SocialProofToast({ theme, projectName }: Props) {
  const p = theme.prefix;
  const [toast, setToast] = useState<{ name: string; area: string; action: string; time: string } | null>(null);
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const showToast = () => {
      const data = {
        name: randomItem(NAMES),
        area: randomItem(AREAS),
        action: randomItem(ACTIONS),
        time: randomMinutes(),
      };
      setToast(data);
      setShow(true);

      // Hide after 4 seconds
      timeoutRef.current = setTimeout(() => {
        setShow(false);
      }, 4000);
    };

    // First toast after 8 seconds
    const initialDelay = setTimeout(() => {
      showToast();
      // Then every 15-30 seconds
      const interval = setInterval(() => {
        showToast();
      }, 15000 + Math.random() * 15000);

      return () => clearInterval(interval);
    }, 8000);

    return () => {
      clearTimeout(initialDelay);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!toast) return null;

  return (
    <div className={`${p}-social-toast ${show ? "show" : ""}`}>
      <div className={`${p}-social-toast-icon`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <div className={`${p}-social-toast-content`}>
        <div className={`${p}-social-toast-title`}>
          {toast.area} {toast.name}님이
        </div>
        <div className={`${p}-social-toast-msg`}>
          {projectName} {toast.action}
        </div>
        <div className={`${p}-social-toast-time`}>{toast.time}</div>
      </div>
      <button className={`${p}-social-toast-close`} onClick={() => setShow(false)}>&times;</button>
    </div>
  );
}
