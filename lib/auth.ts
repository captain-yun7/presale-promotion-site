// 간단한 관리자 인증 (개발용)
// 프로덕션에서는 더 안전한 인증 시스템 사용 권장

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123!@#';

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function hashPassword(password: string): string {
  // 간단한 해시 (프로덕션에서는 bcrypt 사용)
  return Buffer.from(password).toString('base64');
}

export function isAuthenticated(token: string | null): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    return decoded === ADMIN_PASSWORD;
  } catch {
    return false;
  }
}
