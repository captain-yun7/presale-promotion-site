import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 빌드 시 ESLint 경고를 무시합니다
    ignoreDuringBuilds: true,
  },
  // 타입 체크 오류도 무시 (선택사항)
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
