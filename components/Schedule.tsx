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
    <section id="schedule" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="text-secondary text-lg mb-3 font-medium">Schedule & Price</p>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            분양 안내
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            분양 일정 및 가격 정보를 확인하세요
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {schedule.map((item) => (
              <div
                key={item.step}
                className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="absolute -top-4 -left-4 bg-secondary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {item.step}
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-secondary font-bold text-lg mb-3">
                    {item.date}
                  </p>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Table */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
            분양가격 안내
          </h3>
          <div className="bg-luxury-gold/10 border-2 border-luxury-gold rounded-2xl p-6 mb-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <svg className="w-8 h-8 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
              </svg>
              <p className="text-2xl font-bold text-luxury-charcoal">
                투룸 가격에 쓰리룸 특가!
              </p>
            </div>
            <p className="text-lg text-gray-700">
              파격 할인으로 <span className="text-luxury-gold font-bold">안전마진 2억</span> 확보
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-6 py-4 text-left rounded-tl-lg">타입</th>
                  <th className="px-6 py-4 text-center">구조</th>
                  <th className="px-6 py-4 text-center">옵션</th>
                  <th className="px-6 py-4 text-right rounded-tr-lg">분양문의</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-primary">쓰리룸 A</td>
                  <td className="px-6 py-4 text-center">3Room / 2Bath</td>
                  <td className="px-6 py-4 text-center text-sm">비스포크+리바트</td>
                  <td className="px-6 py-4 text-right font-bold text-luxury-gold">
                    상담 시 안내
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-primary">쓰리룸 B</td>
                  <td className="px-6 py-4 text-center">3Room / 2Bath</td>
                  <td className="px-6 py-4 text-center text-sm">비스포크+리바트</td>
                  <td className="px-6 py-4 text-right font-bold text-luxury-gold">
                    상담 시 안내
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-primary">쓰리룸 C</td>
                  <td className="px-6 py-4 text-center">3Room / 2Bath</td>
                  <td className="px-6 py-4 text-center text-sm">비스포크+리바트</td>
                  <td className="px-6 py-4 text-right font-bold text-luxury-gold">
                    상담 시 안내
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-6 text-center">
            ※ 자세한 분양가 및 프로모션은 전화 또는 모델하우스 방문 상담 시 안내드립니다.
          </p>
        </div>

        {/* Contact Section */}
        <div id="contact" className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            상담 신청하기
          </h3>
          <p className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto">
            분양 상담 및 견본주택 방문 예약을 도와드립니다.
            전문 상담원이 친절하게 안내해 드리겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-luxury-gold mb-2">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </div>
              <p className="font-bold text-xl mb-1">전화 상담</p>
              <p className="text-secondary text-2xl font-bold">1588-0000</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="text-luxury-gold mb-2">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                </svg>
              </div>
              <p className="font-bold text-xl mb-1">견본주택</p>
              <p className="text-gray-100">평일 10:00 - 18:00</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-secondary hover:bg-white hover:text-primary text-white px-12 py-4 rounded-full font-bold text-xl transition-all transform hover:scale-105 shadow-lg"
          >
            온라인 상담 신청
          </button>
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
