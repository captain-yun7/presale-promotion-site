"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

// Facebook Pixel Inner Component (uses useSearchParams)
function FacebookPixelInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

  useEffect(() => {
    if (!pixelId) return;

    // @ts-ignore
    if (typeof window.fbq === "function") {
      // @ts-ignore
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams, pixelId]);

  if (!pixelId) return null;

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Facebook Pixel (wrapped in Suspense)
export function FacebookPixel() {
  return (
    <Suspense fallback={null}>
      <FacebookPixelInner />
    </Suspense>
  );
}

// Google Analytics
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        }}
      />
    </>
  );
}

// Naver Analytics
export function NaverAnalytics() {
  const naverId = process.env.NEXT_PUBLIC_NAVER_ANALYTICS_ID;

  if (!naverId) return null;

  return (
    <Script
      id="naver-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          if(!wcs_add) var wcs_add = {};
          wcs_add["wa"] = "${naverId}";
          if(window.wcs) {
            wcs_do();
          }
        `,
      }}
    />
  );
}

// Event tracking helpers
export const trackEvent = {
  // 상담 신청
  consultation: (method: string) => {
    // Google Analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", {
        event_category: "engagement",
        event_label: method,
      });
    }

    // Facebook Pixel
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "상담신청",
        content_category: method,
      });
    }
  },

  // 전화 클릭
  phoneClick: () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "phone_click", {
        event_category: "engagement",
        event_label: "전화상담",
      });
    }

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("trackCustom", "PhoneClick");
    }
  },

  // 블로그 조회
  blogView: (slug: string, title: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "view_item", {
        event_category: "blog",
        event_label: title,
        value: slug,
      });
    }

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("trackCustom", "BlogView", {
        content_name: title,
        content_ids: [slug],
      });
    }
  },
};
