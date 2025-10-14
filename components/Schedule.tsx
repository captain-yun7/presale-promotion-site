"use client";

import { useState } from "react";

export default function Schedule() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    unitType: "",
    agreement: false,
  });

  const schedule = [
    {
      step: "1",
      title: "모집공고",
      date: "2025.11.01",
      description: "분양 모집 공고",
    },
    {
      step: "2",
      title: "견본주택 오픈",
      date: "2025.11.15",
      description: "모델하우스 관람 시작",
    },
    {
      step: "3",
      title: "청약접수",
      date: "2025.12.01 ~ 12.03",
      description: "1순위/2순위 청약 접수",
    },
    {
      step: "4",
      title: "당첨자 발표",
      date: "2025.12.10",
      description: "당첨자 및 예비입주자 발표",
    },
    {
      step: "5",
      title: "계약체결",
      date: "2025.12.20 ~ 12.22",
      description: "정당 계약 및 계약금 납부",
    },
    {
      step: "6",
      title: "입주예정",
      date: "2026.12",
      description: "입주 시작 예정",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Supabase 연동 로직 추가 예정
    console.log("Form submitted:", formData);
    alert("상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.");
    setShowModal(false);
    setFormData({ name: "", phone: "", unitType: "", agreement: false });
  };

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Contact Section */}
        <div className="bg-white rounded-3xl p-12 shadow-xl max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-luxury-gold text-lg mb-3 font-medium tracking-wide">
              CONTACT US
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-luxury-charcoal mb-6">
              상담 신청하기
            </h2>
            <p className="text-xl text-gray-600">
              분양 상담 및 전문 상담원이 친절하게 안내해 드리겠습니다.
              <br />
              편하신 방법으로 문의주세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <a
              href="tel:1666-0952"
              className="border-2 border-luxury-gold rounded-2xl p-8 hover:bg-luxury-cream transition-all transform hover:scale-105"
            >
              <div className="text-luxury-gold mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <p className="font-bold text-xl text-luxury-charcoal mb-2">전화 상담</p>
              <p className="text-luxury-gold text-3xl font-bold">1666-0952</p>
            </a>

            <a
              href="https://open.kakao.com/o/s1Cc83Wh"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-gray-200 rounded-2xl p-8 hover:bg-luxury-cream transition-all transform hover:scale-105"
            >
              <div className="text-luxury-gold mb-4">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.59 1.765 4.853 4.36 6.085l-.935 3.36c-.06.21.15.39.345.285l4.31-2.33c.48.06.975.1 1.48.1 5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
                </svg>
              </div>
              <p className="font-bold text-xl text-luxury-charcoal mb-2">카카오톡 상담</p>
              <p className="text-gray-600 text-lg">1:1 채팅 상담</p>
            </a>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowModal(true)}
              className="bg-luxury-gold hover:bg-luxury-charcoal hover:text-white text-luxury-charcoal px-16 py-5 rounded-full font-bold text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              온라인 상담 신청
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-primary mb-6">상담 신청</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="이름을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                      placeholder="010-0000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      관심 평형
                    </label>
                    <select
                      value={formData.unitType}
                      onChange={(e) =>
                        setFormData({ ...formData, unitType: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                    >
                      <option value="">선택하세요</option>
                      <option value="59A">59A (17평형)</option>
                      <option value="84A">84A (25평형)</option>
                      <option value="114A">114A (34평형)</option>
                    </select>
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreement}
                      onChange={(e) =>
                        setFormData({ ...formData, agreement: e.target.checked })
                      }
                      className="mt-1 mr-2"
                    />
                    <label className="text-sm text-gray-600">
                      개인정보 수집 및 이용에 동의합니다. *
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-secondary text-white rounded-lg font-bold hover:bg-accent"
                  >
                    신청하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
