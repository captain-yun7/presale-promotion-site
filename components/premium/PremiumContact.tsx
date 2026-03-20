"use client";

import { useState } from "react";
import type { ContactConfig, ThemeConfig, ProjectMeta } from "@/lib/types/project";

interface Props {
  config: ContactConfig;
  meta: ProjectMeta;
  theme: ThemeConfig;
}

export default function PremiumContact({ config, meta, theme }: Props) {
  const p = theme.prefix;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      unit_type: formData.get("unit_type") as string,
      message: formData.get("message") as string,
      project_name: meta.name,
      project_slug: meta.slug,
    };

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormSubmitted(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setFormSubmitted(false), 3000);
      } else {
        alert("접수 중 오류가 발생했습니다. 전화로 문의해주세요: " + meta.phone);
      }
    } catch {
      alert("네트워크 오류가 발생했습니다. 전화로 문의해주세요: " + meta.phone);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={`${p}-contact-section`} id={`${p}-contact`}>
      <div className={`${p}-contact-grid`}>
        <div>
          <div className={`${p}-section-label`}>Contact</div>
          <h2 className={`${p}-section-title`} style={{ marginBottom: 48 }}
            dangerouslySetInnerHTML={{ __html: config.formTitle }}
          />

          <form onSubmit={handleFormSubmit}>
            <div className={`${p}-form-row`}>
              <div className={`${p}-form-group`}>
                <label className={`${p}-form-label`}>Name<span className="required">*</span></label>
                <input type="text" name="name" className={`${p}-form-input`} placeholder="이름을 입력해주세요" required />
              </div>
              <div className={`${p}-form-group`}>
                <label className={`${p}-form-label`}>Phone<span className="required">*</span></label>
                <input type="tel" name="phone" className={`${p}-form-input`} placeholder="연락처를 입력해주세요" required />
              </div>
            </div>

            <div className={`${p}-form-row`}>
              <div className={`${p}-form-group`}>
                <label className={`${p}-form-label`}>Email</label>
                <input type="email" name="email" className={`${p}-form-input`} placeholder="이메일 (선택)" />
              </div>
              {config.unitOptions && (
                <div className={`${p}-form-group`}>
                  <label className={`${p}-form-label`}>Unit Type</label>
                  <select name="unit_type" className={`${p}-form-select`}>
                    <option value="">관심 타입 선택</option>
                    {config.unitOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className={`${p}-form-group`}>
              <label className={`${p}-form-label`}>Message</label>
              <textarea name="message" className={`${p}-form-textarea`} placeholder="문의 사항을 입력해주세요 (선택)" />
            </div>

            <div className={`${p}-form-checkbox`}>
              <input type="checkbox" id="privacy" required />
              <label htmlFor="privacy">
                개인정보 수집 및 이용에 동의합니다. 수집된 정보는 상담 목적으로만 사용됩니다.
              </label>
            </div>

            <div className={`${p}-form-submit`}>
              <button
                type="submit"
                disabled={submitting}
                className={`${p}-btn ${p}-btn-primary ${p}-btn-arrow`}
                style={
                  formSubmitted
                    ? { background: `var(--${p}-sage, #7A8B6F)`, width: "100%", justifyContent: "center" }
                    : { width: "100%", justifyContent: "center" }
                }
              >
                {formSubmitted ? "접수 완료되었습니다" : submitting ? "접수 중..." : "관심고객 등록하기"}
              </button>
            </div>

            <div className={`${p}-form-phone-guide`}>
              전화 상담 <a href={`tel:${meta.phone}`}>{meta.phone}</a>
            </div>
          </form>

          {/* FAQ */}
          {config.faqItems.length > 0 && (
            <div className={`${p}-faq`}>
              <h3>자주 묻는 질문</h3>
              {config.faqItems.map((item, i) => (
                <div key={i} className={`${p}-faq-item ${openFaq === i ? "open" : ""}`}>
                  <button className={`${p}-faq-q`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {item.q}
                    <span className="icon">+</span>
                  </button>
                  <div className={`${p}-faq-a`}>
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
