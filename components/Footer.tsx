export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        {/* Company Info */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-sm text-gray-500 space-y-2">
            <p>
              시행사: 더채움 | 대행사: 태성계발
            </p>
            <p>
              홍보관 위치: 서울 강서구 염창동 254-6 (영천시장 옆)
            </p>
            <p className="text-xs pt-4">
              ※ 본 홍보물은 소비자의 이해를 돕기 위한 것으로 실제와 다를 수 있으며,
              사업계획승인 변경 및 신고 등에 따라 변경될 수 있습니다.
            </p>
            <p className="text-xs">
              ※ 자세한 내용은 분양 카탈로그 및 분양계약서를 참조하시기 바랍니다.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 PREMIUM RESIDENCE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
