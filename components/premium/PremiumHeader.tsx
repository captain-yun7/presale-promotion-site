"use client";

import { useState, useEffect, useCallback } from "react";
import type { NavItem, ThemeConfig } from "@/lib/types/project";

interface Props {
  brand: string;
  brandSub?: string;
  phone: string;
  nav: NavItem[];
  ctaLabel: string;
  ctaTargetId: string;
  theme: ThemeConfig;
}

export default function PremiumHeader({ brand, brandSub, phone, nav, ctaLabel, ctaTargetId, theme }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const p = theme.prefix;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setMobileNavOpen(false);
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
      <header className={`${p}-header ${scrolled ? "scrolled" : ""}`}>
        <button
          onClick={() => scrollToSection(nav[0]?.id || "")}
          className={`${p}-logo`}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          {brand} {brandSub && <em>{brandSub}</em>}
        </button>

        <nav className={`${p}-nav`}>
          {nav.map((item) => (
            <button
              key={item.id}
              className={`${p}-nav-link`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className={`${p}-header-right`}>
          <span className={`${p}-header-tel`}>{phone}</span>
          <button
            className={`${p}-header-cta`}
            onClick={() => scrollToSection(ctaTargetId)}
          >
            {ctaLabel}
          </button>
          <button
            className={`${p}-hamburger`}
            onClick={() => setMobileNavOpen(true)}
            aria-label="메뉴"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className={`${p}-mobile-nav ${mobileNavOpen ? "open" : ""}`}>
        <button
          className={`${p}-mobile-close`}
          onClick={() => setMobileNavOpen(false)}
          aria-label="닫기"
        >
          &times;
        </button>
        {nav.map((item) => (
          <button
            key={item.id}
            className={`${p}-nav-link`}
            onClick={() => scrollToSection(item.id)}
          >
            {item.label}
          </button>
        ))}
        <button
          className={`${p}-btn ${p}-btn-gold-outline`}
          style={{ marginTop: 16 }}
          onClick={() => scrollToSection(ctaTargetId)}
        >
          {ctaLabel}
        </button>
      </div>
    </>
  );
}
