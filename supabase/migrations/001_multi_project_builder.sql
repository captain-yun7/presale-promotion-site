-- Multi-Project Builder Schema
-- 멀티 프로젝트 빌더를 위한 데이터베이스 스키마

-- ============================================
-- 1. 템플릿 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail VARCHAR(500),
  default_settings JSONB DEFAULT '{}',
  default_theme JSONB DEFAULT '{
    "primaryColor": "#C9A961",
    "secondaryColor": "#1A1A1A",
    "fontFamily": "Pretendard"
  }',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. 프로젝트 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  template_id UUID REFERENCES templates(id) ON DELETE SET NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),

  -- 기본 정보
  address VARCHAR(500),
  phone VARCHAR(50),
  email VARCHAR(255),

  -- 분양 정보
  total_units INTEGER,
  sale_start_date DATE,
  sale_end_date DATE,
  move_in_date DATE,

  -- 설정
  settings JSONB DEFAULT '{
    "showFloatingCTA": true,
    "showSocialProof": true,
    "showUrgencyBanner": true
  }',

  -- 테마
  theme JSONB DEFAULT '{
    "primaryColor": "#C9A961",
    "secondaryColor": "#1A1A1A",
    "fontFamily": "Pretendard"
  }',

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  og_image VARCHAR(500),

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. 프로젝트 콘텐츠 테이블 (섹션별)
-- ============================================
CREATE TABLE IF NOT EXISTS project_contents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  section_type VARCHAR(50) NOT NULL CHECK (section_type IN (
    'hero', 'location', 'units', 'gallery', 'schedule',
    'qna', 'contact', 'showroom', 'features', 'floor_info'
  )),
  content JSONB NOT NULL DEFAULT '{}',
  is_enabled BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(project_id, section_type)
);

-- ============================================
-- 4. 세대 타입 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS project_units (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  area_exclusive DECIMAL(10, 2), -- 전용면적
  area_supply DECIMAL(10, 2),    -- 공급면적
  rooms INTEGER,
  bathrooms INTEGER,
  price_min BIGINT,              -- 최소 분양가
  price_max BIGINT,              -- 최대 분양가
  floor_plan_image VARCHAR(500),
  features JSONB DEFAULT '[]',   -- 특징 배열
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. 이미지 관리 테이블
-- ============================================
CREATE TABLE IF NOT EXISTS project_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL CHECK (category IN (
    'hero', 'gallery', 'exterior', 'interior', 'amenity',
    'floor_plan', 'location', 'logo', 'og'
  )),
  url VARCHAR(500) NOT NULL,
  alt VARCHAR(255),
  title VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. 블로그 포스트 테이블 (프로젝트별)
-- ============================================
CREATE TABLE IF NOT EXISTS project_blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  slug VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT,
  content TEXT,
  thumbnail VARCHAR(500),
  author VARCHAR(100),
  tags JSONB DEFAULT '[]',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(project_id, slug)
);

-- ============================================
-- 인덱스 생성
-- ============================================
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_project_contents_project_id ON project_contents(project_id);
CREATE INDEX IF NOT EXISTS idx_project_units_project_id ON project_units(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_category ON project_images(category);
CREATE INDEX IF NOT EXISTS idx_project_blogs_project_id ON project_blogs(project_id);
CREATE INDEX IF NOT EXISTS idx_project_blogs_slug ON project_blogs(slug);

-- ============================================
-- consultations 테이블에 project_id 추가 (기존 테이블 수정)
-- ============================================
ALTER TABLE consultations
ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES projects(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_consultations_project_id ON consultations(project_id);

-- ============================================
-- updated_at 자동 업데이트 트리거
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 각 테이블에 트리거 적용
DROP TRIGGER IF EXISTS update_templates_updated_at ON templates;
CREATE TRIGGER update_templates_updated_at
  BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_project_contents_updated_at ON project_contents;
CREATE TRIGGER update_project_contents_updated_at
  BEFORE UPDATE ON project_contents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_project_units_updated_at ON project_units;
CREATE TRIGGER update_project_units_updated_at
  BEFORE UPDATE ON project_units
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_project_blogs_updated_at ON project_blogs;
CREATE TRIGGER update_project_blogs_updated_at
  BEFORE UPDATE ON project_blogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- RLS (Row Level Security) 정책
-- ============================================
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_blogs ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 정책 (published 프로젝트만)
CREATE POLICY "Public can view published projects" ON projects
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view contents of published projects" ON project_contents
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM projects WHERE id = project_id AND status = 'published')
  );

CREATE POLICY "Public can view units of published projects" ON project_units
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM projects WHERE id = project_id AND status = 'published')
  );

CREATE POLICY "Public can view images of published projects" ON project_images
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM projects WHERE id = project_id AND status = 'published')
  );

CREATE POLICY "Public can view published blogs" ON project_blogs
  FOR SELECT USING (
    is_published = true AND
    EXISTS (SELECT 1 FROM projects WHERE id = project_id AND status = 'published')
  );

CREATE POLICY "Public can view templates" ON templates
  FOR SELECT USING (true);

-- 서비스 역할은 모든 작업 허용 (API에서 사용)
-- Supabase의 service_role key를 사용하면 RLS를 우회합니다
