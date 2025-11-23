-- Seed Data: 기본 템플릿 및 염창역 더채움 프로젝트
-- 이 파일은 초기 데이터를 생성합니다

-- ============================================
-- 1. 기본 템플릿 생성
-- ============================================
INSERT INTO templates (id, name, description, is_default, default_settings, default_theme)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  '프리미엄 분양 템플릿',
  '고급 아파트 분양을 위한 기본 템플릿. 히어로, 세대안내, 위치, 갤러리, 일정, QnA 섹션 포함.',
  true,
  '{
    "showFloatingCTA": true,
    "showSocialProof": true,
    "showUrgencyBanner": true,
    "sections": ["hero", "units", "location", "gallery", "schedule", "qna", "contact"]
  }',
  '{
    "primaryColor": "#C9A961",
    "secondaryColor": "#1A1A1A",
    "fontFamily": "Pretendard"
  }'
) ON CONFLICT DO NOTHING;

-- ============================================
-- 2. 염창역 더채움 프로젝트 생성
-- ============================================
INSERT INTO projects (
  id, slug, name, template_id, status,
  address, phone, email,
  total_units, sale_start_date, move_in_date,
  settings, theme,
  meta_title, meta_description
)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'yeomchang-thechaeum',
  '염창역 더채움',
  'a0000000-0000-0000-0000-000000000001',
  'published',
  '서울시 양천구 신정동 일대',
  '1533-8848',
  'info@thechaeum.com',
  158,
  '2024-12-01',
  '2027-06-01',
  '{
    "showFloatingCTA": true,
    "showSocialProof": true,
    "showUrgencyBanner": true
  }',
  '{
    "primaryColor": "#C9A961",
    "secondaryColor": "#1A1A1A",
    "fontFamily": "Pretendard"
  }',
  '염창역 더채움 | 프리미엄 주거공간',
  '염창역 도보 5분, 프리미엄 주거공간 더채움. 합리적인 분양가와 최고의 입지조건.'
) ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 3. 프로젝트 콘텐츠 - Hero 섹션
-- ============================================
INSERT INTO project_contents (project_id, section_type, content, display_order)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'hero',
  '{
    "title": "염창역 더채움",
    "subtitle": "프리미엄 주거공간의 새로운 기준",
    "description": "염창역 도보 5분, 합리적인 분양가",
    "ctaText": "무료 상담 신청",
    "ctaLink": "#contact",
    "backgroundImage": "/images/hero-bg.jpg",
    "badges": [
      "염창역 도보 5분",
      "전세대 남향",
      "즉시 입주 가능"
    ]
  }',
  1
) ON CONFLICT (project_id, section_type) DO NOTHING;

-- ============================================
-- 4. 프로젝트 콘텐츠 - Location 섹션
-- ============================================
INSERT INTO project_contents (project_id, section_type, content, display_order)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'location',
  '{
    "title": "프리미엄 입지",
    "address": "서울시 양천구 신정동 일대",
    "coordinates": {
      "lat": 37.5466,
      "lng": 126.8755
    },
    "transportation": [
      {"type": "subway", "name": "9호선 염창역", "distance": "도보 5분"},
      {"type": "bus", "name": "간선버스 정류장", "distance": "도보 2분"}
    ],
    "nearby": [
      {"category": "education", "name": "염창초등학교", "distance": "도보 7분"},
      {"category": "shopping", "name": "이마트", "distance": "차량 5분"},
      {"category": "medical", "name": "이대목동병원", "distance": "차량 10분"},
      {"category": "park", "name": "안양천 공원", "distance": "도보 10분"}
    ]
  }',
  3
) ON CONFLICT (project_id, section_type) DO NOTHING;

-- ============================================
-- 5. 프로젝트 콘텐츠 - Schedule 섹션
-- ============================================
INSERT INTO project_contents (project_id, section_type, content, display_order)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'schedule',
  '{
    "title": "분양 일정",
    "items": [
      {"date": "2024.12", "title": "모델하우스 오픈", "status": "completed"},
      {"date": "2025.01", "title": "청약 접수", "status": "current"},
      {"date": "2025.02", "title": "당첨자 발표", "status": "upcoming"},
      {"date": "2025.03", "title": "계약", "status": "upcoming"},
      {"date": "2027.06", "title": "입주 예정", "status": "upcoming"}
    ]
  }',
  5
) ON CONFLICT (project_id, section_type) DO NOTHING;

-- ============================================
-- 6. 프로젝트 콘텐츠 - QnA 섹션
-- ============================================
INSERT INTO project_contents (project_id, section_type, content, display_order)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'qna',
  '{
    "title": "자주 묻는 질문",
    "items": [
      {
        "question": "분양가는 얼마인가요?",
        "answer": "타입별로 상이하며, 상담을 통해 자세한 분양가를 안내받으실 수 있습니다."
      },
      {
        "question": "입주 예정일은 언제인가요?",
        "answer": "2027년 6월 입주 예정입니다."
      },
      {
        "question": "모델하우스 방문은 어떻게 하나요?",
        "answer": "상담 신청 후 방문 예약이 가능합니다. 전화 또는 온라인으로 예약해주세요."
      },
      {
        "question": "주차는 몇 대까지 가능한가요?",
        "answer": "세대당 1.3대의 주차 공간이 제공됩니다."
      }
    ]
  }',
  6
) ON CONFLICT (project_id, section_type) DO NOTHING;

-- ============================================
-- 7. 프로젝트 콘텐츠 - Contact 섹션
-- ============================================
INSERT INTO project_contents (project_id, section_type, content, display_order)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'contact',
  '{
    "title": "무료 상담 신청",
    "description": "전문 상담사가 친절하게 안내해 드립니다",
    "phone": "1533-8848",
    "fields": [
      {"name": "name", "label": "이름", "type": "text", "required": true},
      {"name": "phone", "label": "연락처", "type": "tel", "required": true},
      {"name": "message", "label": "문의사항", "type": "textarea", "required": false}
    ],
    "privacyText": "개인정보 수집 및 이용에 동의합니다"
  }',
  7
) ON CONFLICT (project_id, section_type) DO NOTHING;

-- ============================================
-- 8. 세대 타입 데이터
-- ============================================
INSERT INTO project_units (project_id, name, area_exclusive, area_supply, rooms, bathrooms, price_min, price_max, display_order)
VALUES
  ('b0000000-0000-0000-0000-000000000001', '59A', 59.99, 84.95, 3, 2, 650000000, 720000000, 1),
  ('b0000000-0000-0000-0000-000000000001', '59B', 59.87, 84.23, 3, 2, 640000000, 710000000, 2),
  ('b0000000-0000-0000-0000-000000000001', '74', 74.92, 99.17, 3, 2, 780000000, 850000000, 3),
  ('b0000000-0000-0000-0000-000000000001', '84A', 84.97, 114.82, 4, 2, 890000000, 980000000, 4),
  ('b0000000-0000-0000-0000-000000000001', '84B', 84.85, 114.56, 4, 2, 880000000, 970000000, 5)
ON CONFLICT DO NOTHING;

-- ============================================
-- 9. 기존 consultations에 project_id 연결
-- ============================================
UPDATE consultations
SET project_id = 'b0000000-0000-0000-0000-000000000001'
WHERE project = '염창역더채움' AND project_id IS NULL;
