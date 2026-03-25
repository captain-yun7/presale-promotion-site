"use client";

import { useState, useEffect, useCallback } from "react";
import type { ThemeConfig } from "@/lib/types/project";

interface Props {
  phone: string;
  ctaTargetId: string;
  theme: ThemeConfig;
  kakaoChannel?: string;
}

export default function FloatingActions({ phone, ctaTargetId, theme, kakaoChannel }: Props) {
  const p = theme.prefix;
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(`--${p}-nav-h`) || "80"
      );
      window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
    }
  }, [p]);

  return (
    <>
      {/* Mobile Bottom Bar */}
      <div className={`${p}-floating-bar ${visible ? "visible" : ""}`}>
        <a href={`tel:${phone}`} className={`${p}-floating-bar-btn ${p}-floating-bar-call`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </svg>
          전화상담
        </a>
        <button
          onClick={() => scrollToSection(ctaTargetId)}
          className={`${p}-floating-bar-btn ${p}-floating-bar-consult`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          상담신청
        </button>
      </div>

      {/* Desktop Floating Buttons (Right Side) */}
      <div className={`${p}-floating-side ${visible ? "visible" : ""}`}>
        {kakaoChannel && (
          <a
            href={`https://pf.kakao.com/${kakaoChannel}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${p}-floating-side-btn ${p}-floating-kakao`}
            title="카카오톡 상담"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.53-.96 3.4-.99 3.62 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.44 4.28-2.86.56.08 1.14.12 1.72.12 5.52 0 10-3.58 10-7.94S17.52 3 12 3z" />
            </svg>
          </a>
        )}
        <a
          href={`tel:${phone}`}
          className={`${p}-floating-side-btn ${p}-floating-phone`}
          title="전화 상담"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
          </svg>
        </a>
        <button
          onClick={() => setExpanded(!expanded)}
          className={`${p}-floating-side-btn ${p}-floating-consult-btn`}
          title="빠른 상담신청"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        </button>
      </div>

      {/* Quick Consultation Popup */}
      {expanded && (
        <div className={`${p}-quick-consult`}>
          <div className={`${p}-quick-consult-header`}>
            <span>빠른 상담신청</span>
            <button onClick={() => setExpanded(false)}>&times;</button>
          </div>
          <div className={`${p}-quick-consult-body`}>
            <p>지금 바로 전문 상담사와 연결하세요</p>
            <a href={`tel:${phone}`} className={`${p}-btn ${p}-btn-primary`} style={{ width: "100%", justifyContent: "center" }}>
              {phone} 전화하기
            </a>
            <button
              onClick={() => { scrollToSection(ctaTargetId); setExpanded(false); }}
              className={`${p}-btn ${p}-btn-outline`}
              style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
            >
              온라인 상담신청
            </button>
          </div>
        </div>
      )}
    </>
  );
}
