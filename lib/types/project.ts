/* ── 프로젝트 설정 타입 ── */

export interface ProjectConfig {
  /** 프로젝트 기본 정보 */
  meta: ProjectMeta;
  /** 테마 설정 */
  theme: ThemeConfig;
  /** 네비게이션 메뉴 */
  nav: NavItem[];
  /** 히어로 섹션 */
  hero: HeroConfig;
  /** 개요 섹션 */
  overview: OverviewConfig;
  /** 프리미엄 서비스 (선택) */
  services?: ServiceItem[];
  /** 통계 카운터 (선택) */
  stats?: StatItem[];
  /** 입지 정보 (선택) */
  location?: LocationConfig;
  /** 갤러리 (선택) */
  gallery?: GalleryConfig;
  /** 세대 안내 / 평면도 (선택) */
  floorPlan?: FloorPlanConfig;
  /** CTA 섹션 (선택) */
  cta?: CTAConfig;
  /** 상담 신청 + FAQ */
  contact: ContactConfig;
  /** 푸터 */
  footer: FooterConfig;
}

export interface ProjectMeta {
  name: string;
  slug: string;
  description: string;
  phone: string;
  address: string;
  url: string;
  /** 시행사/시공사 */
  developer?: string;
  /** 가격대 (JSON-LD용) */
  priceRange?: string;
}

export interface ThemeConfig {
  /** CSS 테마 파일명 (themes/ 하위) */
  cssFile: string;
  /** CSS 클래스 접두사 */
  prefix: string;
  /** 구글 폰트 URL (선택) */
  fonts?: string[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface HeroConfig {
  label: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; targetId: string };
  secondaryCta?: { label: string; targetId: string };
  /** 히어로 배경 이미지 (오른쪽 비주얼 영역) */
  backgroundImage?: string;
}

export interface OverviewConfig {
  title: string;
  description: string;
  infoItems: { label: string; value: string }[];
  /** 개요 섹션 이미지 (선택) */
  images?: { src: string; alt: string }[];
}

export interface ServiceItem {
  icon: string;
  num: string;
  title: string;
  desc: string;
}

export interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

export interface LocationConfig {
  title: string;
  address: string;
  /** 지도 중심 좌표 */
  coords: { lat: number; lng: number };
  details: { icon: string; label: string; value: string }[];
  infra?: { label: string; value: string }[];
}

export interface GalleryConfig {
  title: string;
  description: string;
  tabs: string[];
  items: GalleryItem[];
}

export interface GalleryItem {
  category: string;
  label: string;
  caption: string;
  image?: string;
}

export interface FloorPlanUnit {
  title: string;
  typeLabel: string;
  area: string;
  supply: string;
  rooms: string;
  bay: string;
  dir: string;
  features: string[];
  image?: string;
}

export interface FloorPlanConfig {
  title: string;
  units: Record<string, FloorPlanUnit>;
}

export interface CTAConfig {
  label: string;
  title: string;
  description: string;
  primaryCta: { label: string; targetId: string };
  secondaryCta?: { label: string; targetId: string };
}

export interface ContactConfig {
  /** 폼 필드 제목 */
  formTitle: string;
  /** 세대 타입 선택지 */
  unitOptions?: { value: string; label: string }[];
  /** FAQ */
  faqItems: { q: string; a: string }[];
  /** 사이드바 카드 */
  sidebarCards: { title: string; content: string }[];
}

export interface FooterConfig {
  brand: string;
  brandSub?: string;
  info: string;
  columns: { title: string; links: { label: string; targetId: string }[] }[];
  copyright: string;
}
