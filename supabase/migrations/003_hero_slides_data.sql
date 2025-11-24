-- 염창역 더채움 hero 콘텐츠에 slides 데이터 추가
UPDATE project_contents
SET content = jsonb_build_object(
  'title', '염창역 더채움',
  'subtitle', '프리미엄 주거공간의 새로운 기준',
  'description', '9호선 급행 초역세권 쓰리룸 오피스텔',
  'ctaText', '무료 상담 신청하기',
  'badges', jsonb_build_array('특별분양', '무규제', '즉시입주'),
  'slides', jsonb_build_array(
    jsonb_build_object(
      'image', '/images/yeomchang-thechaeum-view.jpg',
      'tag', '투룸값에 쓰리룸 산다!',
      'title', '염창역 더채움',
      'subtitleLines', jsonb_build_array(
        '9호선 급행 초역세권 <highlight>쓰리룸</highlight> 오피스텔',
        '<highlight>투룸 가격</highlight>에 <highlight>쓰리룸</highlight>!!!',
        '회사보유분 <highlight>선착순 특별줍줍분양</highlight>'
      )
    ),
    jsonb_build_object(
      'image', '/images/yeomchang-thechaeum-unit-interior-02.jpg',
      'tag', '회사보유분 특별분양',
      'title', '초특가 분양',
      'subtitleLines', jsonb_build_array(
        '<highlight>투룸 가격</highlight>에 <highlight>쓰리룸</highlight> 실현',
        '시세 대비 <highlight>파격 가격</highlight>',
        '<highlight>선착순 마감</highlight> 임박'
      )
    ),
    jsonb_build_object(
      'image', '/images/yeomchang-thechaeum-exterior-view.jpg',
      'tag', '9호선 급행 초역세권',
      'title', '출퇴근 15분 컷',
      'subtitleLines', jsonb_build_array(
        '여의도 <highlight>2정거장</highlight>',
        '강남 <highlight>20분</highlight>'
      )
    ),
    jsonb_build_object(
      'image', '/images/yeomchang-thechaeum-unit-interior-01.jpg',
      'tag', '4無 혜택',
      'title', '대출규제 영향 無',
      'subtitleLines', jsonb_build_array(
        '주택수 · 대출 · 자금조달 · 실거주',
        '<highlight>4가지 규제 완전 FREE</highlight>'
      )
    )
  )
)
WHERE section_type = 'hero'
AND project_id = (SELECT id FROM projects WHERE slug = 'yeomchang-thechaeum');

-- 기본 템플릿에도 slides 구조 추가
UPDATE templates
SET default_settings = jsonb_set(
  default_settings,
  '{defaultHeroSlides}',
  jsonb_build_array(
    jsonb_build_object(
      'image', '/images/hero-bg.jpg',
      'tag', '프리미엄 분양',
      'title', '프로젝트명',
      'subtitleLines', jsonb_build_array('첫 번째 설명 라인', '두 번째 설명 라인')
    )
  )
)
WHERE is_default = true;
