export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        {/* Company Info */}
        <div className="border-t border-gray-800 pt-8">
          <div className="text-sm text-gray-500 space-y-2">
            <p className="font-semibold text-gray-400">
              제이펙스 스튜디오(Jpex Studio)
            </p>
            <p>
              문의: 010-2174-5072
            </p>
            <p>
              대표: 윤지수 | 사업자등록번호: 560-45-01327
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
        <div className="border-t border-gray-800 mt-8 pb-8 pt-8 text-center text-sm text-gray-500">
          <p>COPYRIGHT 제이펙스 스튜디오(Jpex Studio). ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
